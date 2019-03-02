import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamingSystemUniqueIdComponent } from './naming-system-unique-id.component';

describe('NamingSystemUniqueIdComponent', () => {
  let component: NamingSystemUniqueIdComponent;
  let fixture: ComponentFixture<NamingSystemUniqueIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamingSystemUniqueIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamingSystemUniqueIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
