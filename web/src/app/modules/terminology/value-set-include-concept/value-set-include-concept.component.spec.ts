import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetIncludeConceptComponent } from './value-set-include-concept.component';

describe('ValueSetIncludeConceptComponent', () => {
  let component: ValueSetIncludeConceptComponent;
  let fixture: ComponentFixture<ValueSetIncludeConceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueSetIncludeConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetIncludeConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
