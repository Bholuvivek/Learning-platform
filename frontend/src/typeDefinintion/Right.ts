

export enum RIGHTS {
    RIGHTS_ALL = 0,
    RIGHTS_CREATE = 1,
    RIGHTS_DELETE  = 2,
    RIGHTS_VIEW = 3
}
 export interface User{
    admin:string;
    user:string;
    guest:string
 }

export const UserRole:User ={
    admin : 'ADMIN',
    user : 'USER',
    guest :'GUEST_USER'
}

export const userRights = {
    admin:[RIGHTS.RIGHTS_ALL,RIGHTS.RIGHTS_CREATE,RIGHTS.RIGHTS_DELETE,RIGHTS.RIGHTS_VIEW],
    user:[RIGHTS.RIGHTS_CREATE,RIGHTS.RIGHTS_DELETE,RIGHTS.RIGHTS_VIEW],
    guest:[RIGHTS.RIGHTS_VIEW]
}
