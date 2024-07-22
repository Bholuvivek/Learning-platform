export interface VideoDataTypesProps{
    id:number;
    title:string;
    url:string;
}
export interface CourseModuleDataProps{
    id:number;
    title:string;
    video:VideoDataTypesProps[];
}
export interface CourseTypeDataProps{
    id:number;
    title:string;
    module:CourseModuleDataProps[];
}
