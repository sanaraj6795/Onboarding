import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '../shared/httpInterceptor.service';
import { Observable } from 'rxjs/Observable';
import { IUserGroup } from '../model/userGroup';
import { ICourseDetail } from '../model/courseDetail';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';


@Injectable()
export class UserGroupService {

    private baseUrl: string;
    private header: Headers;
    private options: RequestOptions;

    constructor(private httpInterceptorService: HttpInterceptorService, private http: Http) {
        this.baseUrl = "UserGroup";
        this.header = new Headers({ "Content-Type": "application/json","Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS" });
        this.options = new RequestOptions({ headers: this.header });
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
   
}