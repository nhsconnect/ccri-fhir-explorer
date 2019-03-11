import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FhirService} from "../../../service/fhir.service";
import {TdLoadingService} from "@covalent/core";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  files: any;

  resources: string[];

  public dataSource = new MatTableDataSource<fhir.OperationOutcomeIssue>();

  displayedColumns = ['icon', 'severity', 'diagnostics', 'location'];

  overlayStarSyntax: boolean = false;

  error: any;

  model: any;

  public json = true;

  input: string;

  public currentResource = '';

  public operationOutcome: fhir.OperationOutcome;

  public loadComplete: EventEmitter<any> = new EventEmitter();

  resourceControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private router: Router,
              private fhirSrv: FhirService,
              private route: ActivatedRoute,
              private _loadingService: TdLoadingService) { }

  ngOnInit() {
    this.doSetup();

    this.route.url.subscribe( url => {
      this.doSetup();
    });

  }

  doSetup() {
    this.currentResource = this.route.snapshot.paramMap.get('resourcetype');
    if (this.fhirSrv.conformance !== undefined) {
      this.buildOptions(this.fhirSrv.conformance);
    }
    this.fhirSrv.getConformanceChange().subscribe( res => {
        this.buildOptions(res);
    });
    this.fhirSrv.getConformance();
  }

  buildOptions(conf: fhir.CapabilityStatement) {

    this.resources = [];
    for (const rest of conf.rest) {
      for (const resource of rest.resource) {
        this.resources.push(resource.type);
      }
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    // console.log('after init');
    this.dataSource.sort = this.sort;

  }

  swapFormat(json: boolean) {
    this.json = json;
  }

  selectEvent(file: FileList | File): void {
    if (file instanceof File) {
      let reader = new FileReader();
      reader.readAsText(file);
      this.loadComplete.subscribe( (data) => {
            //this.buildBundle(data);
            this.input = data;
            if (file.name.toLowerCase().includes('.xml')) {
              this.json = false;
            }
            if (file.name.toLowerCase().includes('.json')) {
              this.json = true;
            }
          }
      );
      const me = this;
      reader.onload = (event: Event) => {
        if (reader.result instanceof ArrayBuffer) {
          // console.log('array buffer');

          me.loadComplete.emit(reader.result);
        } else {
          // console.log('not a buffer');
          me.loadComplete.emit(reader.result);
        }
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    }
  }


  validate() {
    this.operationOutcome = undefined;
    let content='application/fhir+json';
    if (!this.json) {
      content='application/fhir+xml';
    }
    this.operationOutcome = undefined;
    this.error=undefined;

    //console.log(this.model);
    this._loadingService.register('overlayStarSyntax');
    this.fhirSrv.postContentType('/' + this.currentResource + '/$validate', this.model, content).subscribe( result => {
      this._loadingService.resolve('overlayStarSyntax');
      console.log(result);
      if (result.entry !== undefined) {
        const bundle = <fhir.Bundle> result;
        for (let entry of bundle.entry) {
          if (entry.resource.resourceType === 'OperationOutcome') {
            console.log('Add to bundle');
            this.operationOutcome = <fhir.OperationOutcome> entry.resource;
          }
        }
      }
      if (result.resourceType === 'OperationOutcome') {
        console.log('single outcome');
        this.operationOutcome = <fhir.OperationOutcome> result;
      }
      this.dataSource.data = this.operationOutcome.issue;
      //  this.dataSource = new OperationOutcomeIssueDataSource(this.fhirSrv, undefined, );
    }, error => {
      this._loadingService.resolve('overlayStarSyntax');

      this.error=error;
      if (error.error !== undefined) {
        if (error.error.resourceType === 'OperationOutcome') {

          this.operationOutcome = <fhir.OperationOutcome>error.error;
          this.dataSource.data = this.operationOutcome.issue;
          // this.dataSource = new OperationOutcomeIssueDataSource(this.fhirSrv, undefined, this.operationOutcome.issue);
        }
      }
    });

  }

}
