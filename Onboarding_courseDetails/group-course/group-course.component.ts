import { Component, OnInit } from '@angular/core';
import { UserGroupService } from '../../service/userGroup.service';
import { ICourseDetail } from '../../model/courseDetail';
import { IUserGroup} from '../../model/userGroup';
import { IGroupCourse } from '../../model/groupCourse';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCourseDialogueComponent } from '../add-course-dialogue/add-course-dialogue.component';

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
  constructor(private userGroupService: UserGroupService,public dialog: MatDialog) { }

  ngOnInit() {
  }

  addAssociateId(){
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
  this.getCourseListDetails();
  if(this.groupCourseCount!=0 && this.startDate != null){
    this.isGenerateClicked=true;
    this.isGenerateDisabled=true;
  }
  } 
     
  clearData(){
  this.clearAll();
  this.startDate=null;
  this.courseDetail=null;
  }

  private clearAll(){
   this.isGenerateDisabled=false;
   this.isGenerateClicked=false;
   this.groupCourse=[];
  }

   private getCourseListDetails() {
     this.incrementDate=this.startDate;
     if(this.startDate != null){
       this.userGroupService.getCourseList(this.role).subscribe(model => {
            this.courseDetail = model
        });
      this.courselist(this.courseDetail.courseList);  
     }
   }

 private courselist(courseList  : ICourseDetail[]){
  let i=1,j=1;
  const uniquevalue = Array.from(new Set(courseList.map(obj => obj.courseType)));
        uniquevalue.forEach(x => {
        courseList.forEach(y=>{
          console.log(courseList);
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
        this.incrementDate=dt;
        if(i%5==0){
          j++;
        }
       i++;
       }
       })
      });
      this.groupCourseCount=this.groupCourse.length;
   }
   
   openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseDialogueComponent, {
      width:'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
      this.clearAll();
      this.groupCourse=[];
      result.forEach(e =>{
      this.courseDetail.courseList.push(e);
     });
     this.courselist(this.courseDetail.courseList);
     this.isGenerateClicked=true;
     this.isGenerateDisabled=true;
      //console.log(result);
      //console.log(this.courseDetail.courseList);
      //console.log('The dialog was closed');
      this.incrementDate=this.startDate;
    }
    });
  }
}

