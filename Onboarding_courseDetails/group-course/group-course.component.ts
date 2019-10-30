import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../service/userGroup.service';
import { ICourseDetail } from '../../model/courseDetail';
import { IUserGroup} from '../../model/userGroup';
import { IGroupCourse } from '../../model/groupCourse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCourseDialogueComponent } from '../add-course-dialogue/add-course-dialogue.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-group-course',
  templateUrl: './group-course.component.html',
  styleUrls: ['./group-course.component.css']
})
export class GroupCourseComponent implements OnInit {
  associateId:number;
  associateIdCount:number=0;
  associateIdList:Array<number>=[];
  isGenerateClicked:boolean;
  isGenerateDisabled:boolean;
  role:string;
  courseDetail:IUserGroup;
  groupCourse:IGroupCourse[]=[];
  groupCourseCount:number=0;
  id:any;
  roleType:Array<string>=['Programmer Analyst Trainee','program Analyst','Associate','Senior Associate'];
  startDate:Date;
  incrementDate:Date;

  courseForm: FormGroup;
  submitted = false;
  constructor(private userGroupService: UserGroupService,public dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  
    createForm() {
    this.courseForm = this.formBuilder.group({
      associateId:['',Validators.required],
      role:['',Validators.required],
      startDate:['',Validators.required]
    });
    
  }
 
 onSubmit(){
   console.log(this.courseForm.get('associateId').value);
   this.submitted=true;
    if (this.courseForm.invalid) {
      return;
    }
 }
 get f() { return this.courseForm.controls; }
 
  addAssociateId(){
    this.associateId=this.courseForm.get('associateId').value;
    if(this.associateId!=null){
    this.associateIdList.push(this.associateId);
    this.associateId=null;
    this.associateIdCount=this.associateIdList.length;
    }
  }

  deleteAssociateId(data:any){
  this.associateIdList.splice(this.associateIdList.indexOf(data),1);
  this.associateIdCount=this.associateIdList.length;
  }

  generateClicked(){
  this.submitted=true;
    if (this.courseForm.invalid) {
      return;
    }
    else{
    this.getCourseListDetails();
    if(this.groupCourseCount!=0 && this.startDate != null){
    this.isGenerateClicked=true;
    this.isGenerateDisabled=true;
  }
  }
  } 
     
  clearData(){
  this.clearAll();
  this.courseForm.setValue({
      associateId:this.courseForm.get('associateId').value,
      role:"",
      startDate:""
    });
  this.submitted = false;
  this.courseDetail=null;
  }

  private clearAll(){
   this.isGenerateDisabled=false;
   this.isGenerateClicked=false;
   this.groupCourse=[];
  }

   private getCourseListDetails() {
     this.startDate=this.courseForm.get('startDate').value;
     this.incrementDate=this.startDate;
     if(this.startDate != null){
       this.userGroupService.getCourseList(this.courseForm.get('role').value).subscribe(model => {
         console.log(this.courseForm.get('role').value,this.courseForm.get('startDate').value);
            this.courseDetail = model
        });
      this.courselist(this.courseDetail.courseList);  
     }
   }

 private courselist(courseList  : ICourseDetail[]){
  let i=1,j=1;
  this.getWeekDays(this.incrementDate);
  const uniquevalue = Array.from(new Set(courseList.map(obj => obj.courseType)));
        uniquevalue.forEach(x => {
        courseList.forEach(y=>{
        if(x == y.courseType){
        let data={
          day:i,  
          week:j,
          startDate:this.incrementDate,
          courseType:y.courseType,
          title:y.title,
        }
        this.groupCourse.push(data);
        let dt=new Date(this.incrementDate);
        dt.setDate(dt.getDate()+1);
        this.getWeekDays(dt);
        if(i%5==0){
          j++;
        }
       i++;
       }
       })
      });
      this.groupCourseCount=this.groupCourse.length;
   }

   getWeekDays(newIncrementDate : Date){
     let dt=new Date(newIncrementDate);
      if(dt.getDay()==6){
        dt.setDate(dt.getDate()+2);
      }else if(dt.getDay() == 0){
        dt.setDate(dt.getDate()+1);
      }
      this.incrementDate=dt;
   }

   openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogueComponent,{
      width:"auto"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
      this.clearAll();
      this.groupCourse=[];
      result.forEach(e =>{
      this.courseDetail.courseList.push(e);
     });
     this.incrementDate=this.startDate;
     this.courselist(this.courseDetail.courseList);
     this.isGenerateClicked=true;
     this.isGenerateDisabled=true;
    }
    });
  }
}

