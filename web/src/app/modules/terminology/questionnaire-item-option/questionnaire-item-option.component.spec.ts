import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireItemOptionComponent } from './questionnaire-item-option.component';

describe('QuestionnaireItemOptionComponent', () => {
  let component: QuestionnaireItemOptionComponent;
  let fixture: ComponentFixture<QuestionnaireItemOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireItemOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireItemOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
