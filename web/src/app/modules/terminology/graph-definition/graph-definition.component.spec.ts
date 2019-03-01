import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDefinitionComponent } from './graph-definition.component';

describe('GraphDefinitionComponent', () => {
  let component: GraphDefinitionComponent;
  let fixture: ComponentFixture<GraphDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
