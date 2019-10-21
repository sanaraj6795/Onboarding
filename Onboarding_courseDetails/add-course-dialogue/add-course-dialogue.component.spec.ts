import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseDialogueComponent } from './add-course-dialogue.component';

describe('AddCourseDialogueComponent', () => {
  let component: AddCourseDialogueComponent;
  let fixture: ComponentFixture<AddCourseDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
