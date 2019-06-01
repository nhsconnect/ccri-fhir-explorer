import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDefinitionSummaryComponent } from './observation-definition-summary.component';

describe('ObservationDefinitionSummaryComponent', () => {
  let component: ObservationDefinitionSummaryComponent;
  let fixture: ComponentFixture<ObservationDefinitionSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDefinitionSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationDefinitionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
