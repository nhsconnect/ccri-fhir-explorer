import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDefinitionDetailComponent } from './structure-definition-detail.component';

describe('StructureDefinitionDetailComponent', () => {
  let component: StructureDefinitionDetailComponent;
  let fixture: ComponentFixture<StructureDefinitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureDefinitionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDefinitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
