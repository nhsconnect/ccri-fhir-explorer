import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDefinitionDetailComponent } from './message-definition-detail.component';

describe('MessageDefinitionDetailComponent', () => {
  let component: MessageDefinitionDetailComponent;
  let fixture: ComponentFixture<MessageDefinitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDefinitionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDefinitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
