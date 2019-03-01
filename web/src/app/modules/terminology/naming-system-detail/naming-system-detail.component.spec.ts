import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamingSystemDetailComponent } from './naming-system-detail.component';

describe('NamingSystemDetailComponent', () => {
  let component: NamingSystemDetailComponent;
  let fixture: ComponentFixture<NamingSystemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamingSystemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamingSystemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
