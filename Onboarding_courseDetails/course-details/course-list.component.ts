import { Component, OnInit } from '@angular/core';
import { ICourseDetail } from '../../model/courseDetail';
import { CourseDetailService } from '../../service/courseDetail.service';
import { Router } from '@angular/router';
import { ConfirmationDialogsService } from '../../shared/confirmationDialog.service';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseDetail: ICourseDetail[];
  id: any;
  constructor(private courseDetailService: CourseDetailService,
              private router: Router,
              private confirmationDialogsService: ConfirmationDialogsService,
              private alertService: AlertService) { }

  ngOnInit() {
      this.getCourseListDetails();
  }

    private getCourseListDetails() {
        this.courseDetailService.getCourses(this.id).subscribe(model => {
            this.courseDetail = model
        });
   }
   
   deleteCourseDetail(courseId: string): void {
        this.confirmationDialogsService.confirmWithoutContainer("Confirmation", "Are you sure you want to delete this course? ", true)
            .subscribe(result => {
                if (result) {
                    this.courseDetailService.deleteCourse(courseId)
                        .subscribe(data => this.alertService.success("Associate Deleted Successfully."));
                    this.getCourseListDetails();
                }
            })
    }
}