import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMapElementComponent } from './concept-map-element.component';

describe('ConceptMapElementComponent', () => {
  let component: ConceptMapElementComponent;
  let fixture: ComponentFixture<ConceptMapElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptMapElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMapElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
