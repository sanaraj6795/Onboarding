export interface IRole {
   CourseIds:string,
   Groupcode:string,
   GroupName:string
}

export class Role implements IRole {

    constructor(
        public CourseIds: string,
        public Groupcode: string,
        public GroupName: string,
       ) {
    }
}
