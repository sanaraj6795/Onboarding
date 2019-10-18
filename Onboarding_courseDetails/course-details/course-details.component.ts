import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators,FormBuilder  } from '@angular/forms';
import { ICourseDetail } from '../../model/courseDetail';
import { CourseDetailService } from '../../service/courseDetail.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '../../shared/alert.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  mode: string;
  courseDetail: ICourseDetail;
  /*courseForm = new FormGroup({
    title: new FormControl(''),
    url: new FormControl(''),
    description: new FormControl(''),
    docType: new FormControl(''),
    courseName: new FormControl(''),
  });*/
  courseForm:FormGroup;
  title: FormControl;
  url: FormControl;
  description: FormControl;
  docType: FormControl;
  courseName: FormControl;

  courseType:Array<string>=['RLG','common','Technology','UI'];
  documentType:Array<string>=['txt','pdf','xml','json'];

  constructor(private courseDetailService: CourseDetailService,
        private route: ActivatedRoute, private router: Router,
        private alertService:AlertService,private fb: FormBuilder ) { }

  ngOnInit() {
      this.createFormControls();
      this.createForm();
      this.route.params.subscribe(params => { this.courseId = params["id"] });
        if (this.courseId == "0" && this.courseId != undefined) {
            this.mode = "Add";
        }
        else {
            this.courseDetailService.getCourse(this.courseId)
                .subscribe(model => {
                    this.courseDetail = model;
                    this.mode = "Update";
                    this.bindData();
                });

        }
  }
  
  createFormControls() {
    this.title = new FormControl('', Validators.required);
    this.url = new FormControl('', Validators.required);
    this.description = new FormControl('');
    this.docType = new FormControl('',Validators.required);
    this.courseName = new FormControl('',Validators.required);
  }

  createForm() {
    this.courseForm = new FormGroup({
      title: this.title,
      url: this.url,
      description: this.description,
      courseName: this.courseName,
      docType:this.docType
    });
  }

  private bindData() {
    const result = Object.assign({}, this.courseDetail);
        this.courseForm.setValue({
            title: result.title,
            url: result.url,
            description: result.description,
            docType: result.documentType,
            courseName: result.courseType
        });
  }

  onSubmit(formData: any) {
        if (this.mode == "Update") {
            this.courseDetailService.put(formData)
                .subscribe(model => {
                    this.alertService.success("Course Details Updated Successfully.");
                });
        }
        else {
            this.courseDetailService.post(formData)
                .subscribe(model => {
                    this.alertService.success("Course Details Added Successfully.");
                });
        }
    }

}
