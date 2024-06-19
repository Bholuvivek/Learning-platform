import { UserRole } from "../typeDefinintion/Right";

  interface Permission{
    id:number;
    description:string;
    name:string;
  }

  interface UserData {
    id:number;
    name:string;
    role:string;
    permissions:Permission[];
  }
  interface Data{
    data:UserData
  }
  interface Status{
    isLoading:boolean;
    isSuccessful:boolean;
  }

  export const useOne= ()=>{
    const data:Data ={
      data:{
          id:1,
          name:'Dear Admin ',
          role:UserRole.admin,
          permissions:[
            {
            id:0, description:'Right to accesss all',name:'RIGHTS_ALL'
          },
          {
            id:1, description:'Right to create',name:'RIGHTS_CREATE'
          },
          {
            id:2, description:'Right to delete',name:'RIGHTS_DELETE'
          },
          {
            id:3, description:'Right to view',name:'RIGHTS_VIEW'
          },
          
          ],
      }
      

  }
  const status:Status={
    isLoading:false,
    isSuccessful:true,
  }
  return ( { data, status} )
  }

