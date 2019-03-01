import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSetDetailComponent } from './value-set-detail.component';

describe('ValueSetDetailComponent', () => {
  let component: ValueSetDetailComponent;
  let fixture: ComponentFixture<ValueSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
