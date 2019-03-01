import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDefinitionLinkComponent } from './graph-definition-link.component';

describe('GraphDefinitionLinkComponent', () => {
  let component: GraphDefinitionLinkComponent;
  let fixture: ComponentFixture<GraphDefinitionLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDefinitionLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDefinitionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
