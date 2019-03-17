import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MatTableDataSource, MatTreeNestedDataSource} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {FhirService} from "../../../service/fhir.service";
import {ResourceDialogComponent} from "../../../dialog/resource-dialog/resource-dialog.component";
import {BehaviorSubject} from "rxjs";
import {NestedTreeControl} from "@angular/cdk/tree";

export class ElementNode {
  children: ElementNode[];
  parent: ElementNode;
  name: string;
  type: string;
  element: fhir.ElementDefinition;
}




@Component({
  selector: 'app-structure-definition-detail',
  templateUrl: './structure-definition-detail.component.html',
  styleUrls: ['./structure-definition-detail.component.css']
})
export class StructureDefinitionDetailComponent implements OnInit {

  definitionid = undefined;
  structureDefinition: fhir.StructureDefinition;

  public dataSource = new MatTableDataSource<fhir.ElementDefinition>();

  displayedColumns = ['path', 'type','cardinality', 'comment', 'resource'];

  element: fhir.ElementDefinition = undefined;

  nestedTreeControl: NestedTreeControl<ElementNode>;
  nestedDataSource: MatTreeNestedDataSource<ElementNode>;

  dataChange = new BehaviorSubject<ElementNode[]>([]);

  get data(): ElementNode[] { return this.dataChange.value; }


  hasNestedChild = (_: number, nodeData: ElementNode) => nodeData.children.length>0;

  private _getChildren = (node: ElementNode) => node.children;


  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private fhirService: FhirService) {
    this.nestedTreeControl = new NestedTreeControl<ElementNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    //database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  ngOnInit() {

    this.doSetup();

    this.route.url.subscribe( url => {
      this.doSetup();
    });
  }

  doSetup() {
    this.definitionid = this.route.snapshot.paramMap.get('definitionid');
    if (this.definitionid !== undefined) {
      this.fhirService.getResource('/StructureDefinition/' + this.definitionid).subscribe( result => {
        this.structureDefinition = result;
        this.dataSource.data = this.structureDefinition.snapshot.element;
        this.buildTree();
      });
    }
  }


  buildTree() {
    let lastNode: ElementNode = undefined;
    let data:ElementNode[] = [];
    for (let element of this.structureDefinition.snapshot.element) {

      if (lastNode === undefined
          || (element.base !== undefined && element.base.path === element.path)
          || (this.inDifferential(element))
          || (element.type !== undefined && element.type[0].code === 'Extension' && element.sliceName !== undefined)) {

          const node = new ElementNode();
          node.name = element.path;
          node.element = element;
          node.children = [];
          if (lastNode === undefined) {
            //node.type = element.path;
            data.push(node);

          } else {
            if (node.element.sliceName !== undefined) {
              console.log(node.element.path);
              console.log(lastNode.element.path);
              console.log(node.element.path.includes(lastNode.element.path));
            }
            while (!node.element.path.includes(lastNode.element.path) || (node.element.path === lastNode.element.path)) {
              lastNode = lastNode.parent;
            }
            node.name = node.element.path.replace(lastNode.element.path + '.', '');

            node.parent = lastNode;
            lastNode.children.push(node);
          }

          lastNode = node;
        }
      }
    data = this.removeEmptyNodes(data);
    this.nestedDataSource.data = data
  }

  inDifferential(element: fhir.ElementDefinition): Boolean {
    for (let diffelement of this.structureDefinition.differential.element) {
      if (element.id === diffelement.id) {
        return true;
      }
    }
    return false;
  }

  removeEmptyNodes(data:ElementNode[]) :ElementNode[] {

    for (let i = 0; i < data.length; i++) {
      if (data[i].element.max === '0') {

       data.splice(i,1);

      } else {
        if (data[i].children.length > 0) {
          data[i].children = this.removeEmptyNodes(data[i].children);
        }
      }
    }

    return data;
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
  selectNode(node: ElementNode) {
    this.element = node.element;
  }
  select(resource) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      resource: resource
    };
    const resourceDialog: MatDialogRef<ResourceDialogComponent> = this.dialog.open( ResourceDialogComponent, dialogConfig);
  }

}
