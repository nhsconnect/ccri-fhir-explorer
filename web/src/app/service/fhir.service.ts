import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Oauth2Service} from './oauth2.service';
import {AppConfigService} from "./app-config.service";


export enum Formats {
    JsonFormatted = 'jsonf',
    Json = 'json',
    Xml = 'xml',
    EprView = 'epr'
}

@Injectable({
    providedIn: 'root'
})
export class FhirService {


    // private baseUrl: string = 'https://data.developer-test.nhs.uk/ccri-fhir/STU3';
    private baseUrl;

    private GPCbaseUrl = 'http://127.0.0.1:8187/ccri/camel/fhir/gpc';

    private NRLSbaseUrl = 'https://data.developer.nhs.uk/nrls-ri';

    private R4baseUrl = 'https://dwp.hippodigital.cloud/ccri-fhir/R4';

    private registerUri: string;

    private format: Formats = Formats.JsonFormatted;

    // public smart: SMARTClient;

    public conformance: fhir.CapabilityStatement;

    conformanceChange: EventEmitter<fhir.CapabilityStatement> = new EventEmitter();

    rootUrlChange: EventEmitter<any> = new EventEmitter();

    formatChange: EventEmitter<any> = new EventEmitter();

    private rootUrl: string = undefined;


    constructor(private http: HttpClient,
                private oauth2: Oauth2Service,
                private appConfig: AppConfigService) {

        localStorage.removeItem('baseUrl');
        this.appConfig.getInitEventEmitter().subscribe(result => {
            console.log('FHIR Service config change detected');
            if (this.getBaseUrl() !== this.baseUrl) {
                this.conformance = undefined;
                this.getConformance();
            }
        });

    }

    public oauth2Required(): boolean {


        if (this.conformance !== undefined) {
            for (const rest of this.conformance.rest) {
                if (rest.security !== undefined && rest.security.service !== undefined) {
                    for (const service of rest.security.service) {
                        if (service.coding !== undefined && service.coding.length > 0) {
                            if (service.coding[0].system === 'SMART-on-FHIR') {

                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }


    storeBaseUrl(baseUrl: string) {
        localStorage.setItem('baseUrl', baseUrl);

        if (this.baseUrl !== baseUrl) {
            this.baseUrl = baseUrl;
            this.conformance = undefined;
            this.getConformance();
        }
    }

    getStoredBaseUrl(): string {
        return localStorage.getItem('baseUrl');
    }

    public getBaseUrl(): string {

        if (this.getStoredBaseUrl() !== undefined && this.getStoredBaseUrl() !== null) {
            this.baseUrl = this.getStoredBaseUrl();
            return this.baseUrl;
        }
        let retStr = this.baseUrl;

        // this should be resolved by app-config.ts but to stop start up errors

        if (retStr === undefined) {
            console.log(this.appConfig);
            if (this.appConfig.getConfig() !== undefined) {
                retStr = this.appConfig.getConfig().fhirServer;
                this.storeBaseUrl(retStr);
            }
        }
        if (retStr === undefined) {
            if (location.href.includes('data.developer.nhs.uk')) {
                return 'https://data.developer.nhs.uk/ccri-fhir/STU3';
            }
            if (location.href.includes('data.developer-test.nhs.uk')) {
                return 'https://data.developer-test.nhs.uk/ccri-fhir/STU3';
            }
            // Changes to guesstimate baseUrl
            if (location.href.includes('35.176.40.215.xip.io')) {
                return 'https://35.176.40.215.xip.io/ccri-fhir/STU3';
            }
            if (!location.origin.includes('localhost') && !location.origin.includes('127.0.0.1')) {
                return location.origin + '/ccri-fhir/STU3';
            }
            if (retStr === undefined) return 'http://localhost:8186/ccri-fhir/STU3';

        }
        return retStr;
    }

    public setRootUrl(rootUrl: string) {
        this.storeBaseUrl(rootUrl);
        this.rootUrl = rootUrl;
        this.baseUrl = rootUrl;
        this.rootUrlChange.emit(rootUrl);
    }

    setGPCNRLSUrl(baseUrl: string) {
        if (baseUrl.includes('4203')) {
            this.GPCbaseUrl = 'http://127.0.0.1:8187/ccri/camel/fhir/gpc';
        } else {

            this.GPCbaseUrl = baseUrl + 'camel/fhir/gpc';
        }
        // GP Connect only at present
    }

    public getRootUrlChange() {
        return this.rootUrlChange;
    }

    public getConformanceChange() {
        return this.conformanceChange;
    }

    public getFormatChange() {
        return this.formatChange;
    }

    public getFormat() {
        return this.format;
    }

    public getFHIRServerBase() {
        return this.getBaseUrl();
    }

    public getFHIRGPCServerBase() {
        return this.GPCbaseUrl;
    }

    public getR4ServerBase() {
        return this.R4baseUrl;
    }

    public getFHIRNRLSServerBase() {
        return this.NRLSbaseUrl;
    }

    public setFHIRServerBase(server: string) {
        this.baseUrl = server;
        this.storeBaseUrl(server);

    }


    getHeaders(contentType: boolean = true): HttpHeaders {

        let headers = new HttpHeaders(
        );
        if (contentType) {
            headers = headers.append('Content-Type', 'application/fhir+json');
            headers = headers.append('Accept', 'application/fhir+json');
        }
        return headers;
    }


    getEPRHeaders(contentType: boolean = true): HttpHeaders {

        const headers = this.getHeaders(contentType);

        return headers;
    }

    public setOutputFormat(outputFormat: Formats) {
        this.format = outputFormat;
        this.formatChange.emit(outputFormat);
    }

    public getConformance() {
        if (this.conformance !== undefined) {
            return this.conformance;
        }

        if (this.baseUrl !== undefined) {
            this.http.get<any>(this.getBaseUrl() + '/metadata', {'headers': this.getHeaders(true)}).subscribe(capabilityStatement => {
                this.conformance = capabilityStatement;

                this.conformanceChange.emit(capabilityStatement);
            }, () => {
                this.conformance = undefined;
                this.conformanceChange.emit(undefined);
            });
        }
    }


    public postAny(url: string, body: string, httpHeaders: HttpHeaders) {
        return this.http.post<any>(url, body, {headers: httpHeaders});
    }

    public post(resource: string, body: any): Observable<any> {

        let headers: HttpHeaders = this.getEPRHeaders(false);
        headers = headers.append('Content-Type', 'application/fhir+json');
        headers = headers.append('Prefer', 'return=representation');
        return this.http.post<any>(this.getFHIRServerBase() + resource, body, {headers: headers});
    }

    public postContentType(resource: string, body: any, contentType): Observable<any> {
        console.log('ContentType = ' + contentType);
        let headers: HttpHeaders = this.getEPRHeaders(false);
        headers = headers.append('Content-Type', contentType);
        headers = headers.append('Accept', 'application/fhir+json');

        return this.http.post<any>(this.getFHIRServerBase() + resource, body, {headers: headers});
    }

    public put(resource: string, body: any): Observable<any> {

        const headers: HttpHeaders = this.getEPRHeaders(false);
        headers.append('Content-Type', 'application/fhir+json');
        headers.append('Prefer', 'return=representation');
        const url = this.getFHIRServerBase() + resource;

        return this.http.put<fhir.Endpoint>(url, body, {'headers': headers});
    }

    public get(search: string): Observable<fhir.Bundle> {

        const url: string = this.getBaseUrl() + search;
        let headers = new HttpHeaders(
        );

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': headers});
        }
    }

    public getR4(search: string): Observable<fhir.Bundle> {

        const url: string = this.getR4ServerBase() + search;
        let headers = new HttpHeaders(
        );

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': headers});
        }
    }

    public getNRLSResource(search: string): Observable<any> {

        const url = this.getFHIRNRLSServerBase() + search;
        let headers = new HttpHeaders(
        );

        headers = headers.append('Authorization', 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2RlbW9uc3RyYXRvci5jb20iLCJzdWIiOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL3Nkcy1yb2xlLXByb2ZpbGUtaWR8ZmFrZVJvbGVJZCIsImF1ZCI6Imh0dHBzOi8vbnJscy5jb20vZmhpci9kb2N1bWVudHJlZmVyZW5jZSIsImV4cCI6MTUzOTM1Mjk3OCwiaWF0IjoxNTM5MzUyNjc4LCJyZWFzb25fZm9yX3JlcXVlc3QiOiJkaXJlY3RjYXJlIiwic2NvcGUiOiJwYXRpZW50L0RvY3VtZW50UmVmZXJlbmNlLnJlYWQiLCJyZXF1ZXN0aW5nX3N5c3RlbSI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvYWNjcmVkaXRlZC1zeXN0ZW18MjAwMDAwMDAwMTE3IiwicmVxdWVzdGluZ19vcmdhbml6YXRpb24iOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL29kcy1vcmdhbml6YXRpb24tY29kZXxBTVMwMSIsInJlcXVlc3RpbmdfdXNlciI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvc2RzLXJvbGUtcHJvZmlsZS1pZHxmYWtlUm9sZUlkIn0=.');
        headers = headers.append('fromASID', '200000000117');
        headers = headers.append('toASID', '999999999999');

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            headers = headers.append('Accept', 'application/fhir+json');
            return this.http.get<any>(url, {'headers': this.getHeaders(true)});
        }
    }

    public getNRLS(search: string): Observable<fhir.Bundle> {

        const url: string = this.getFHIRNRLSServerBase() + search;
        let headers = new HttpHeaders(
        );


//   headers = headers.append( 'Content-Type',  'application/fhir+json' );
        headers = headers.append('Accept', 'application/fhir+json');
        headers = headers.append('Authorization',
            'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2RlbW9uc3RyYXRvci5jb20iLCJzdWIiOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL3Nkcy1yb2xlLXByb2ZpbGUtaWR8ZmFrZVJvbGVJZCIsImF1ZCI6Imh0dHBzOi8vbnJscy5jb20vZmhpci9kb2N1bWVudHJlZmVyZW5jZSIsImV4cCI6MTUzOTM1Mjk3OCwiaWF0IjoxNTM5MzUyNjc4LCJyZWFzb25fZm9yX3JlcXVlc3QiOiJkaXJlY3RjYXJlIiwic2NvcGUiOiJwYXRpZW50L0RvY3VtZW50UmVmZXJlbmNlLnJlYWQiLCJyZXF1ZXN0aW5nX3N5c3RlbSI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvYWNjcmVkaXRlZC1zeXN0ZW18MjAwMDAwMDAwMTE3IiwicmVxdWVzdGluZ19vcmdhbml6YXRpb24iOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL29kcy1vcmdhbml6YXRpb24tY29kZXxBTVMwMSIsInJlcXVlc3RpbmdfdXNlciI6Imh0dHBzOi8vZmhpci5uaHMudWsvSWQvc2RzLXJvbGUtcHJvZmlsZS1pZHxmYWtlUm9sZUlkIn0=.');
        headers = headers.append('fromASID', '200000000117');
        headers = headers.append('toASID', '999999999999');

        return this.http.get<any>(url, {'headers': headers});

    }

    public postGPC(nhsNumber: string): Observable<fhir.Bundle> {

        const url: string = this.getFHIRGPCServerBase() + '/Patient/$gpc.getstructuredrecord';
        let headers = new HttpHeaders(
        );
        headers = headers.append('Content-Type', 'application/fhir+json');
        headers = headers.append('Accept', 'application/fhir+json');
        const body = '{ "resourceType": "Parameters", "parameter": [ { "name": "patientNHSNumber", '
            + '"valueIdentifier": { "system": "https://fhir.nhs.uk/Id/nhs-number", "value": "'
            + nhsNumber + '" } }, { "name": "includeAllergies","part": [{"name": "includeResolvedAllergies","valueBoolean": true}]}, '
            + '{"name": "includeMedication","part": [{"name": "includePrescriptionIssues","valueBoolean": true}]}]}';

        return this.http.post<any>(url, body, {'headers': headers});
    }

    public getResource(search: string): Observable<any> {

        const url = this.getFHIRServerBase() + search;
        let headers = new HttpHeaders(
        );

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': this.getHeaders(true)});
        }
    }


    public getResults(url: string): Observable<fhir.Bundle> {
// console.log('getResults');
        let headers = new HttpHeaders();

        if (this.format === 'xml') {
            headers = headers.append('Content-Type', 'application/fhir+xml');
            headers = headers.append('Accept', 'application/fhir+xml');
            return this.http.get(url, {headers, responseType: 'blob' as 'blob'});
        } else {
            return this.http.get<any>(url, {'headers': this.getHeaders(true)});
        }
    }

    getBinary(id: string): Observable<fhir.Binary> {

        const url = this.getBaseUrl() + '/Binary/' + id;

        return this.http.get<fhir.Binary>(url, {'headers': this.getEPRHeaders(true)});

    }

    getBinaryRaw(id: string): Observable<any> {

        const url = this.getBaseUrl() + '/Binary/' + id;

        return this.http.get(url, {'headers': this.getEPRHeaders(false), responseType: 'blob'});

    }

    getCompositionDocumentHTML(id: string): Observable<any> {

        const url = this.getBaseUrl() + '/Binary/' + id;

        let headers = this.getEPRHeaders(false);
        headers = headers.append('Content-Type', 'text/html');

        return this.http
            .get(url, {headers, responseType: 'text' as 'text'});
    }

    searchPatients(term: string): Observable<fhir.Bundle> {
        const url = this.getBaseUrl();
        if (!isNaN(parseInt(term))) {
            return this.http.get<fhir.Bundle>(url + `/Patient?identifier=${term}`, {'headers': this.getEPRHeaders()});
        } else {

            return this.http.get<fhir.Bundle>(url + `/Patient?name=${term}`, {'headers': this.getEPRHeaders()});

        }

    }

    getCompositionDocumentPDF(id: string): Observable<any> {

        const url = this.getBaseUrl() + '/Binary/' + id;

        let headers = this.getEPRHeaders(false);
        headers = headers.append(
            'Content-Type', 'application/pdf');

        return this.http
            .get(url, {headers, responseType: 'blob' as 'blob'});
    }


}
