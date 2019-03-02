import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSystemConceptsComponent } from './code-system-concepts.component';

describe('CodeSystemConceptsComponent', () => {
  let component: CodeSystemConceptsComponent;
  let fixture: ComponentFixture<CodeSystemConceptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeSystemConceptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSystemConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
