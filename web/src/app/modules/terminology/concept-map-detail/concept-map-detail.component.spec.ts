import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptMapDetailComponent } from './concept-map-detail.component';

describe('ConceptMapDetailComponent', () => {
  let component: ConceptMapDetailComponent;
  let fixture: ComponentFixture<ConceptMapDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptMapDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptMapDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
