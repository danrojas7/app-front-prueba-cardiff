import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleCalendarComponent } from './people-calendar.component';

describe('PeopleCalendarComponent', () => {
  let component: PeopleCalendarComponent;
  let fixture: ComponentFixture<PeopleCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
