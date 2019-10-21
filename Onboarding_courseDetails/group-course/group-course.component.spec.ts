import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCourseComponent } from './group-course.component';

describe('GroupCourseComponent', () => {
  let component: GroupCourseComponent;
  let fixture: ComponentFixture<GroupCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
