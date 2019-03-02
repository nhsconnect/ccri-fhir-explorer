import {Component, Input, OnInit} from '@angular/core';
import {FhirService} from "../../../service/fhir.service";
import {NamingSystemDataSource} from "../../../data-source/naming-system-data-source";
import {NamingSystemUniqueidDataSource} from "../../../data-source/naming-system-uniqueid-data-source";

@Component({
  selector: 'app-naming-system-unique-id',
  templateUrl: './naming-system-unique-id.component.html',
  styleUrls: ['./naming-system-unique-id.component.css']
})
export class NamingSystemUniqueIdComponent implements OnInit {

  @Input()
  uniqueids: fhir.NamingSystemUniqueId[];

  dataSource: NamingSystemUniqueidDataSource;

  displayedColumns = [  'type', 'value', 'preferred'];

  constructor(
      private fhirService: FhirService
  ) { }

  ngOnInit() {
    this.dataSource = new NamingSystemUniqueidDataSource(this.fhirService, this.uniqueids);
  }

}
