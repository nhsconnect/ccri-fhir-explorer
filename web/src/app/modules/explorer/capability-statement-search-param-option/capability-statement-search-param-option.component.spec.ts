import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityStatementSearchParamOptionComponent } from './capability-statement-search-param-option.component';

describe('CapabilityStatementSearchParamOptionComponent', () => {
  let component: CapabilityStatementSearchParamOptionComponent;
  let fixture: ComponentFixture<CapabilityStatementSearchParamOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityStatementSearchParamOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityStatementSearchParamOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
