import { UserTypes } from "../enums/UserTypes";
import { Course } from "./Course";


export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userType: UserTypes[];
  courses: Course[];
}

export const emptyUser: User = { firstName: "", lastName: "", email: "", userType: [], courses: []};
