import React, { useEffect, useState } from "react";
import AddCourseForm from "./AddCourseForm";
import CourseRow from "./CourseRow";
import "../style/userTable.css";
import { Course } from "../classes/Course";
import { Container } from "react-bootstrap";
import ImportForm from "./ImportForm";
import ImportCourseForm from "./ImportCourseForm";


const ManageCourses = () => {
  const [courses, setCourses] = useState<Array<Course>>([]);

  const fetchCourseData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/course");
      const data = await res.json();
      const courseObject = [];
      for (const d of data.courses) {
        const instructorRes = await fetch("http://127.0.0.1:3000/api/users/" + d.courseInstructor);
        let item = {
          courseNumber: d.courseNumber,
          courseName: d.courseName,
          courseDesc: d.courseDesc,
          term: d.term,
          year: d.year,
        }
        if (instructorRes) {
          const instructorData = await instructorRes.json();
          item["instructorName"] = instructorData.user.firstName + " " + instructorData.user.lastName;
        } else {
          item["instructorName"] = ""
        }
        courseObject.push(item);
      }
      setCourses(courseObject);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRow= (index) =>{
    let courseCopy = [...courses]
    courseCopy.splice(index,1)
    setCourses(courseCopy)
  }
  

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <div>
    <ImportCourseForm taskName="Courses" uploadUrl="http://127.0.0.1:3000/api/course/upload" fetchCourseData={fetchCourseData}/>
      <Container className="mt-3">
        <div className="rowC">
          <h2 style={{ marginBottom: "20px" }}>All Courses</h2> 
          <AddCourseForm fetchCourseData={fetchCourseData} />
        </div>
        <div id="profTable">
          <table>
            <thead>
              <tr>
                <th className="column0"></th>
                <th className="column1">Course Number</th>
                <th className="column2">Course Name</th>
                <th className="column3">Course Description</th>
                <th className="column4">Course Semester</th>
                <th className="column5">Course Year</th>
                <th className="column6">Course Instructor</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course: Course, i: number) => (
                <CourseRow key={i} course={course} deleteRow = {deleteRow} index = {i} />
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageCourses;
