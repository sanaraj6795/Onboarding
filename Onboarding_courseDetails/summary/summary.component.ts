import { Component, OnInit } from '@angular/core';
import { CourseDetailService } from '../course-details/service/courseDetail.service';
import { ICourseDetail } from '../course-details/model/courseDetail';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IUserDetail } from '../group-course/model/userDetail';
import { ToasterService } from 'angular2-toaster';
import { UserGroupNewService } from '../group-course/service/userGroup.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
})
export class SummaryComponent implements OnInit {
 courseForm: FormGroup;
 associateId: string;
  userDetails: IUserDetail[] = [];

  constructor(private courseDetailService: CourseDetailService,
  private formBuilder: FormBuilder,
  private toasterService: ToasterService,
  private userGroupService: UserGroupNewService) { }

  ngOnInit() {
      this.createForm();
  }
  
  createForm() {
    this.courseForm = this.formBuilder.group({
      associateId: ['', Validators.required],
  });
  }
 
 addAssociateId() {
    debugger;
    this.associateId = this.courseForm.get('associateId').value;
    const isAssociateId = this.userDetails.filter(x => x.AssociateId === this.associateId);

    if (isAssociateId.length > 0) {
      this.toasterService.pop("info", "User Info", "Associate Id Adready Added");
      return;
    }

    this.userGroupService.getUserDetail(this.associateId).subscribe(model => {
      if (model && model.value) {
        this.userDetails.push(model.value);
      } else {
        this.toasterService.pop("info", "User Info", "Invalid User Id");
      }
    });
  }
  
}