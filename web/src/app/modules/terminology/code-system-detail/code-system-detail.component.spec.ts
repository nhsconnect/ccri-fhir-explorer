import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSystemDetailComponent } from './code-system-detail.component';

describe('CodeSystemDetailComponent', () => {
  let component: CodeSystemDetailComponent;
  let fixture: ComponentFixture<CodeSystemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSystemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSystemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
