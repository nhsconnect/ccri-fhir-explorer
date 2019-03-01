import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDefinitionComponent } from './message-definition.component';

describe('MessageDefinitionComponent', () => {
  let component: MessageDefinitionComponent;
  let fixture: ComponentFixture<MessageDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
