import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FhirService, Formats} from '../../../service/fhir.service';
import {MatSelect, MatSort, MatTableDataSource} from '@angular/material';
import {ITdDynamicElementConfig, TdDynamicElement, TdDynamicFormsComponent} from '@covalent/dynamic-forms';
import {TdLoadingService} from "@covalent/core";



export interface QueryOptions {
    name: string;
    type: string;
    documentation: string;
}


/*

name:
"date"
type:
"date"
documentation:
"Date record was believed accurate"
 */


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort: MatSort;

    public resource: fhir.Bundle = undefined;

    public resourceString: any = undefined;

    public query = undefined;
    
    public id_query = undefined;

    public operationOutcome: fhir.OperationOutcome;
    
    public json = true;

    public rest: any;

    public base: string;

    public format: Formats;

    progressBar = false;

    searchVisible = false;

    expanded = false;

    input: string;

    model: any;

    resourceType: string;

    files: any;

    public dataSource = new MatTableDataSource<fhir.OperationOutcomeIssue>();

    displayedColumns = ['icon', 'severity', 'code', 'diagnostics'];

    overlayStarSyntax: boolean = false;

    error: any;

  public currentResource = '';

  @ViewChild('field') field: MatSelect;

  @ViewChild('dynform') form: TdDynamicFormsComponent;
  @ViewChild('dynform1') form1 : TdDynamicFormsComponent;
  public elements :ITdDynamicElementConfig[] = [
 ];

	public elements_id :ITdDynamicElementConfig[] = [
  {
      label: 'resource id',
      name: 'patientid',
      type: TdDynamicElement.Input,
      required: true
    }

    ];
   public selectedValue: string;

   public options: QueryOptions[] = [

    ];


    constructor(private router: Router,
                private fhirSrv: FhirService,
                private route: ActivatedRoute,
                private _loadingService: TdLoadingService) { }

  ngOnInit() {
     // console.log('Resource Init called'+ this.router.url);




      this.resourceType = this.route.snapshot.paramMap.get('resourceType');

      if (this.fhirSrv.conformance !== undefined ) {
          this.buildOptions(this.resourceType);
      } else {
          this.fhirSrv.getConformance();

          this.fhirSrv.getConformanceChange().subscribe(
              conformance => {
                  if (this.fhirSrv.conformance !== undefined) {
                      this.buildOptions(this.resourceType);
                  }
              }
          );
      }

      this.route.url.subscribe( url => {
          // console.log('activated route url ='+url);
          // console.log('activated route segment ='+url[0]);
          if (url[0].path === 'resource') {
              const resourceType = this.route.snapshot.paramMap.get('resourceType');
              this.resource = undefined;
              this.resourceString = undefined;
              this.query = undefined;

              this.onClear();
              this.buildOptions(resourceType);
          }
      });


      this.format = this.fhirSrv.getFormat();

      this.fhirSrv.getFormatChange().subscribe( format => {
          this.format = format;
          this.getResults();
      });

/*
      this._routerSub = this.router.events
      // Here is one extra parenthesis it's missing in your code
          .subscribe( event  => {
             // console.log('router event');
              if ((event instanceof NavigationEnd) && (event.url.startsWith('/resource'))) {
                  console.log(' + NavChange '+event.url);
                  let resource = event.url.replace('/resource/','');
                  this.elements=[];
                  if (this.form !== undefined) {
                      this.form.form.valueChanges.subscribe((val) => {
                          this.buildQuery();
                      })
                  }
                  this.resource = undefined;
                  this.resourceString = undefined;
                  this.query = undefined;
                  this.clearDown();
                  this.buildOptions(resource);
              }
          }) */
  }

    onClear() {
        this.elements = [];
        this.json = true;
        this.model = undefined;
        this.input = undefined;
        this.operationOutcome = undefined;

        if (this.form !== undefined) {
            this.form.refresh();
        }
    }

  onExpand() {
      this.expanded = true;
  }

  onCollapse() {
      this.expanded = false;
  }

  swapFormat(json: boolean) {
        this.json = json;
  }

    public loadComplete: EventEmitter<any> = new EventEmitter();

  onAdd(param) {
    const seq: string = (this.elements.length + 1).toString(10);
   if (param !== undefined) {
     switch (param.type) {
       case 'date' :
         const nodeDSQ: ITdDynamicElementConfig = {
           'label': 'Qual',
           'name' : param.type + '-' + seq + '-1-' + param.name,
           'type': TdDynamicElement.Select,
           'required': false,
           'selections': [
             {
               'label': '=',
               'value': 'eq'
             },
             {
               'label': '>',
               'value': 'gt'
             },
             {
               'label': '>=',
               'value': 'ge'
             },
             {
               'label': '<',
               'value': 'lt'
             },
             {
               'label': '<',
               'value': 'le'
             }
           ],
           'flex' : 10
         };
         const nodeDS: ITdDynamicElementConfig = {
           'label': param.name + ' - ' + param.documentation,
           'name' : param.type + '-' + seq + '-2-' + param.name ,
           'type': TdDynamicElement.Datepicker,
           'required': true,
           'flex' : 90
         };

         this.elements.push(nodeDSQ);
         this.elements.push(nodeDS);

         break;
       case 'token' :
         // add matches
         const nodeT1: ITdDynamicElementConfig = {
           'label': 'System - ' + param.name + ' - ' + param.documentation,
           'name' : param.type + '-' + seq + '-1-' + param.name,
           'type': TdDynamicElement.Input,
           'flex' : 50
         };
         const nodeT2: ITdDynamicElementConfig = {
           'label': 'Code - ' + param.name + ' - ' + param.documentation,
           'name' : param.type + '-' + seq + '-2-' + param.name,
           'type': TdDynamicElement.Input,
             'required': true,
           'flex' : 50
         };
         this.elements.push(nodeT1);
         this.elements.push(nodeT2);
         break;
       case 'string' :
         // add matches
         const nodeOpt: ITdDynamicElementConfig = {
           'label': 'match',
           'name': param.type + '-' + seq + '-1-' + param.name,
           'type': TdDynamicElement.Select,
           'selections': [
           {
             'label': 'Matches',
             'value': ''
           },
           {
             'label': 'Exactly',
             'value': 'exact'
           }
         ],
           'required': false,
           'flex': 20
         };

         const nodeS: ITdDynamicElementConfig = {
           'label': param.name + ' - ' + param.documentation,
           'name' : param.type + '-' + seq + '-2-' + param.name,
           'type': TdDynamicElement.Input,
           'required': true,
           'flex' : 80
         };
          this.elements.push(nodeOpt);
         this.elements.push(nodeS);
         break;
       case 'reference' :
         const nodeR: ITdDynamicElementConfig = {
           'label': param.name + ' - ' + param.documentation,
           'name' : param.type + '-' + seq + '-1-' + param.name,
           'type': TdDynamicElement.Input,
           'required': true,
         };
         this.elements.push(nodeR);
         break;
     case 'uri' :
         const nodeU: ITdDynamicElementConfig = {
             'label': param.name + ' - ' + param.documentation,
             'name' : param.type + '-' + seq + '-1-' + param.name,
             'type': TdDynamicElement.Input,
             'required': true,
         };
         this.elements.push(nodeU);
         break;
       default:
         console.log('MISSING - ' + param.type);
     }
     // console.log('call refresh');
     this.form.refresh();
     this.buildQuery();
   }
  }

  onMore(linkUrl: string) {
      this.progressBar = true;

      this.fhirSrv.getResults(linkUrl).subscribe(bundle => {
          switch ( this.format ) {
            case 'jsonf':
              this.resource = bundle;
              break;
            case 'json' :
              this.resource = bundle;
              this.resourceString = JSON.stringify(bundle, null, 2);
              break;
            case 'xml':
              const reader = new FileReader();
              reader.addEventListener('loadend', (e) => {
                this.resourceString = reader.result;
              });
              reader.readAsText(<Blob> bundle);
          }
          this.progressBar = false;
          },
          () => {
              this.progressBar = false;
          });
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    ngAfterViewInit() {
     // console.log('after init');
        this.dataSource.sort = this.sort;
        if (this.form !== undefined) {
            this.form.form.valueChanges.subscribe((val) => {
                this.buildQuery();
            });
        }
    }

  buildQuery() {
      let i: number;
      let first = true;
      let query = this.fhirSrv.getFHIRServerBase() + '/' + this.currentResource + '?';

      for (i = 0; i < this.elements.length; i++) {

          const name = this.elements[i].name;
          const content: string[] = name.split('-');
          let param = content[3];
          if (content.length > 4 && (content[4] !== undefined)) { param = param + '-' + content[4]; }

          if (!first) {
              query = query + '&' + param;
          } else { query = query + param; }
          // console.log('KGM ' + query);
          switch (content[0]) {
              case 'date':
                  query = query + '=';
                  if (this.form.value[this.elements[i].name] !== undefined && this.form.value[this.elements[i].name] !== '') {
                      query = query + this.form.value[this.elements[i].name]; }
                  if (this.form.value[this.elements[i + 1].name] !== undefined) {
                      query = query + this.form.value[this.elements[i + 1].name].format('YYYY-MM-DD'); }
                  i++;
                  break;
              case 'token':
                  query = query + '=';
                  if (this.form.value[this.elements[i].name] !== undefined) {
                      query = query + this.form.value[this.elements[i].name] + '%7C'; }
                  if (this.form.value[this.elements[i + 1].name] !== undefined) {
                      query = query + this.form.value[this.elements[i + 1].name]; }
                  i++;
                  break;
              case 'string':
                 // console.log(this.elements[i]);
                  if (this.form.value[this.elements[i].name] !== undefined
                    && (typeof this.form.value[this.elements[i].name] === 'string' || this.form.value[this.elements[i].name] instanceof String)) {
                      console.log(this.form.value[this.elements[i].name]);
                      //
                      query = query + ':' + this.form.value[this.elements[i].name];
                  }
                  query = query + '=';
                  if (this.form.value[this.elements[i + 1].name] !== undefined) {
                      query = query + this.form.value[this.elements[i + 1].name]; }
                  i++;
                  break;
              case 'reference':
                  query = query + '=';
                  if (this.form.value[this.elements[i].name] !== undefined) {
                      query = query + this.form.value[this.elements[i].name]; }
                  break;
              case 'uri':
                  query = query + '=';
                  if (this.form.value[this.elements[i].name] !== undefined) {
                      query = query + this.form.value[this.elements[i].name]; }
                  break;
          }


         // console.log(this.form.value[this.elements[i].name]);
          first = false;
      }
      //  console.log(query);
      this.query = query;
  }
  onSearch() {


      // console.log(this.form.valid);
      if (this.form.valid && this.elements.length > 0) {
          this.resource = undefined;
          this.progressBar = true;
          this.buildQuery();
          this.getResults();
      }
  }
    onSearch_id() {

        if (this.form1.valid && this.elements_id.length > 0) {
            this.resource = undefined;
           // console.log(this.elements_id[1].value);
            this.progressBar = true;
            
            let id_query = this.fhirSrv.getFHIRServerBase() + '/' + this.currentResource + '/' + + this.form1.value[this.elements_id[0].name];
            this.id_query = id_query;
            // console.log(id_query);
            this.query = id_query;
            this.getResults();
            // console.log(id_query);
        }
    }

  getResults() {
      if (this.query !== undefined && (this.query !== '')) {
      //    console.log(this.format + ' Query = ' + this.query);
            this.fhirSrv.getResults(this.query).subscribe(bundle => {
                  switch (this.format) {
                      case 'jsonf':
                          this.resource = bundle;
                          break;
                      case 'json' :
                          this.resource = bundle;
                          this.resourceString = JSON.stringify(bundle, null, 2);
                          break;
                      case 'xml':
                          const reader = new FileReader();
                          reader.addEventListener('loadend', (e) => {
                              this.resourceString = reader.result;
                          });
                          reader.readAsText(<Blob> bundle);
                  }
                  this.progressBar = false;
              },
              () => {
                  this.progressBar = false;
              });
      }
  }
  


  buildOptions(resource: string) {
      this.searchVisible = false;
      if (this.fhirSrv.conformance !== undefined ) {
          if (this.currentResource !== resource) {
              this.currentResource = resource;
              this.base = this.fhirSrv.getFHIRServerBase() + '/' + this.currentResource;
              this.options = [];
              if (this.fhirSrv.conformance.rest !== undefined) {
                  for (const node of this.fhirSrv.conformance.rest) {

                      for (const resourceSrc of node.resource) {
                          if (resourceSrc.type === resource) {
                             // console.log(resourceSrc.type);
                              this.rest = resourceSrc;
                              if (resourceSrc.searchParam !== undefined) {
                                  this.searchVisible = true;
                                  for (const param of resourceSrc.searchParam) {
                                      const menuOpt: QueryOptions = {
                                          name: param.name,
                                          documentation: param.documentation,
                                          type: param.type
                                      };
                                      this.options.push(menuOpt);
                                  }
                              }
                          }
                      }
                  }
              }
          }
      } else {
          // console.log('In Resource - Forcing naviagation to root');
          // this.router.navigateByUrl('/');
      }

  }



    onResoureSelected(event) {

  }

  validate() {
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
