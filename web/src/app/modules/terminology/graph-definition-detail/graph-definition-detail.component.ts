import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {ResourceDialogComponent} from '../../../dialog/resource-dialog/resource-dialog.component';


@Component({
  selector: 'app-graph-definition-detail',
  templateUrl: './graph-definition-detail.component.html',
  styleUrls: ['./graph-definition-detail.component.css']
})
export class GraphDefinitionDetailComponent implements OnInit {

  graphid = undefined;

  graph: fhir.GraphDefinition;

  data = [ ];

  edges = [];

  force = {
    // initLayout: 'circular'
    // gravity: 0
    repulsion: 100,
    edgeLength: 300
  };


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private fhirService: FhirService) { }

  ngOnInit() {

    this.doSetup();
    this.route.url.subscribe( url => {
      this.doSetup();
    });
  }

  doSetup() {
    this.graphid = this.route.snapshot.paramMap.get('graphid');
    if (this.graphid !== undefined) {
      this.fhirService.getResource('/GraphDefinition/' + this.graphid ).subscribe( result => {
        const graph: fhir.GraphDefinition = result;
        this.graph = graph;
        // TODO   this.processGraph();
      });
    }
  }

  getColour(resource) {
    if (resource === 'Bundle') return 'accent';
    return 'primary';
  }

  getProfile(profile: string, resource: string) {
    if (profile !== undefined) return profile;
    return 'https://www.hl7.org/fhir/stu3/' + resource.toLowerCase() + '.html';
  }

  processGraph() {
    this.data = [];
    this.edges = [];
    let f = 1;

    this.data.push({
      id: f.toString(3),
      name: this.graph.start,
      symbolSize: 50,
      itemStyle: {normal: {color: '#c71919'}}
    });
    let base = f;
    f++;
    if (this.graph.link !== undefined) {
      this.processItem(base, f, this.graph.link);
    }
  }
  processItem(base, f, links) {
    for (let link of links) {
      if (link.target !== undefined) {
        for (const target of link.target) {

          this.data.push({
            id: f.toString(3),
            name: target.type,
            symbolSize: 50,
            itemStyle: {normal: {color: '#4f19c7'}}
          });
          this.edges.push({
            source: base.toString(3),
            target: f.toString(3),
            label: 'saz'
          });

          base = f;
          f++;
          if (target.compartment !== undefined) {
            for (const compartment of target.compartment) {
              this.data.push({
                id: f.toString(3),
                name: compartment.code,
                symbolSize: 50,
                itemStyle: {normal: {color: '#c76919'}}
              });
              this.edges.push({
                source: base.toString(3),
                target: f.toString(3),
                label: 'bob'
              });
              f++;
            }
          }
          if (target.link !== undefined) {
            this.processItem(base, f, target.link);
          }
        }
      }

    }
    console.log(this.data);
    console.log(this.edges);
  }

  view(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

  getMarkdown(markdown: string): string {
    //console.log(markdown);
    if (markdown === undefined) return undefined;
    markdown = markdown.replace(new RegExp('\\\\n','g'),'\n');
    //console.log(markdown);
    return markdown ;
  }



}
