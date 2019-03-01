import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireSummaryComponent } from './questionnaire-summary.component';

describe('QuestionnaireSummaryComponent', () => {
  let component: QuestionnaireSummaryComponent;
  let fixture: ComponentFixture<QuestionnaireSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
