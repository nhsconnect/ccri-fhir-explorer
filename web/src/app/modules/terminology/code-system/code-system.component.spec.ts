import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSystemComponent } from './code-system.component';

describe('CodeSystemComponent', () => {
  let component: CodeSystemComponent;
  let fixture: ComponentFixture<CodeSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
