import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminologyMainComponent } from './terminology-main.component';

describe('TerminologyMainComponent', () => {
  let component: TerminologyMainComponent;
  let fixture: ComponentFixture<TerminologyMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminologyMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminologyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
