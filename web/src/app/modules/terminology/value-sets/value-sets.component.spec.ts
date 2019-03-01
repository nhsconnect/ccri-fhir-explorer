import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetsComponent } from './value-sets.component';

describe('ValueSetsComponent', () => {
  let component: ValueSetsComponent;
  let fixture: ComponentFixture<ValueSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
