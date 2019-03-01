import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamingSystemComponent } from './naming-system.component';

describe('NamingSystemComponent', () => {
  let component: NamingSystemComponent;
  let fixture: ComponentFixture<NamingSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamingSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
