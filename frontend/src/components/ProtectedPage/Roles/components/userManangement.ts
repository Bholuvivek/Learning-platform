export interface UserManagementDataProps {
    id:number,
  title: string;
  content: string;
}

export const userManangementData: UserManagementDataProps[] = [
  {
    id:1,
    title: "Role Management",
    content:
      "Easily create, view, update, and delete roles. Assign different permissions to roles to control access levels across the application.",
  },
  {
    id:2,
    title:'User Assignments',
    content:'Assign users to roles to define their access levels. Manage user roles dynamically to ensure security and proper access control.'
  },
  {
    id:3,
    title: "Task Management",
    content:
      "Easily create, view, update, and delete roles. Assign different permissions to roles to control access levels across the application.",
  },
  {
    id:4,
    title:'Task Assignments',
    content:'Assign users to roles to define their access levels. Manage user roles dynamically to ensure security and proper access control.'
  }
];
