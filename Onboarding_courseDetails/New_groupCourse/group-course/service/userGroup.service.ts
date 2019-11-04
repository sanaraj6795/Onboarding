import { Injectable } from '@angular/core';
import { IUserGroup } from '../model/userGroup';
import { ICourseDetail } from '../model/courseDetail';
import { IRole,Role } from '../model/role';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class UserGroupService {

    private baseUrl: string;

    constructor(private httpClient: HttpClient) {
        this.baseUrl = "UserGroup";
    }
    
   getCourseList(role: string): Observable<IUserGroup> {
        return of(this.getResonse());
    }

   private getResonse(): IUserGroup {

       const list ={
           role:"Associate",
           courseList:this.getCourses()
       }
       return list as IUserGroup;
   }
 
  private getCourses(): ICourseDetail[] {

        const first = {
           courseId:"1",
           title:"Angular",
           url:"https://angular.io/tutorial",
           description:"Basic concepts",
           courseType:"common",
           documentType:"txt"
        };
        const second = {
           courseId:"12",
           title:"Cucumber",
           url:"https://Cucumber.io/tutorial",
           description:"Advanced concepts in Automation Testing",
           courseType:"RLG",
           documentType:"pdf" 
        };
        const third = {
           courseId:"123",
           title:"Typescript",
           url:"https://Typescript.io/tutorial",
           description:"basics of TSC",
           courseType:"common",
           documentType:"txt"
        };
         const fourth = {
           courseId:"1234",
           title:"Typescript",
           url:"https://Typescript.io/tutorial",
           description:"basics of TSC",
           courseType:"Technology",
           documentType:"txt"
        };
          const fifth = {
           courseId:"1234",
           title:"Typescript",
           url:"https://Typescript.io/tutorial",
           description:"basics of TSC",
           courseType:"Technology",
           documentType:"txt"
        };
         const sixth = {
           courseId:"12346",
           title:"Typescript",
           url:"https://Typescript.io/tutorial",
           description:"basics of TSC",
           courseType:"RLG",
           documentType:"txt"
        };

        return [first, second, third,fourth,fifth,sixth] as ICourseDetail[];
    }
   

    getRoleOptions(): Observable<any> {
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('CourseGroup')/items?%24skiptoken=Paged%3dTRUE%26p_ID%3d";
        return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
             const roleOptions = resspone.value.map(item => {
                return new Role(
                    item.CourseIds,
                    item.GroupCode,
                    item.Title,
                );
            });
            console.log(roleOptions);
            return of(roleOptions);
        }));
    }

      
}