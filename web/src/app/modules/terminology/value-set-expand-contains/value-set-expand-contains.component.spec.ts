import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetExpandContainsComponent } from './value-set-expand-contains.component';

describe('ValueSetExpandContainsComponent', () => {
  let component: ValueSetExpandContainsComponent;
  let fixture: ComponentFixture<ValueSetExpandContainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueSetExpandContainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetExpandContainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
