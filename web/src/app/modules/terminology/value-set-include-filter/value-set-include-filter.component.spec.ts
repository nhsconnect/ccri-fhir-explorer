import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetIncludeFilterComponent } from './value-set-include-filter.component';

describe('ValueSetIncludeFilterComponent', () => {
  let component: ValueSetIncludeFilterComponent;
  let fixture: ComponentFixture<ValueSetIncludeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueSetIncludeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetIncludeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
