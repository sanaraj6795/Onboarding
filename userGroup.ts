import { ICourseDetail } from './courseDetail';

export interface IUserGroup {
    role:string;
    courseList: ICourseDetail[],
}