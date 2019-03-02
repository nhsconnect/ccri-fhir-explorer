import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMapElementTargetComponent } from './concept-map-element-target.component';

describe('ConceptMapElementTargetComponent', () => {
  let component: ConceptMapElementTargetComponent;
  let fixture: ComponentFixture<ConceptMapElementTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptMapElementTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMapElementTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
