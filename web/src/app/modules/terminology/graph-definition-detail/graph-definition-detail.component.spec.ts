import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDefinitionDetailComponent } from './graph-definition-detail.component';

describe('GraphDefinitionDetailComponent', () => {
  let component: GraphDefinitionDetailComponent;
  let fixture: ComponentFixture<GraphDefinitionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDefinitionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDefinitionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
