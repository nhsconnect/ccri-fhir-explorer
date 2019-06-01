import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDefinitionComponent } from './observation-definition.component';

describe('ObservationDefinitionComponent', () => {
  let component: ObservationDefinitionComponent;
  let fixture: ComponentFixture<ObservationDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
