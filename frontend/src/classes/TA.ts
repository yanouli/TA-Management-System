import { TACourse } from "./TACourse"
export interface TA {
    termYear: string,
    TAName: string,
    studentID: string,
    legalName: string,
    Email: string,
    gradUgrad: string,
    supervisorName: string,
    Priority: string,
    Hours: string,
    dateApplied: string,
    Location: string,
    Phone: string,
    Degree: string,
    courseList: string,
    otherCourse: string,
    Notes: string,
    courses: TACourse[]
}