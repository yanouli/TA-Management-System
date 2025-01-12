import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../classes/Course";
import "../style/userTable.css";

const CourseRow = ({ course,deleteRow,index }: { course: Course ;deleteRow: Function; index:Number}) => {
  const [show, setShow] = useState(false);
  
  const handleDeleteCourse = async (e) => {
    console.log("Delete course");
    try {
      const res = await fetch("http://127.0.0.1:3000/api/course/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseNumber: course.courseNumber,
      }),});
      // make API call to delete course
      deleteRow(index)


    } catch (e) { }
    
  };

  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary" onClick={handleDeleteCourse}>
          <RemoveIcon />
        </button>
      </td>
      <td className="column1">{course.courseNumber}</td>
      <td className="column2">{course.courseName}</td>
      <td className="column3">{course.courseDesc}</td>
      <td className="column4">{course.term}</td>
      <td className="column5">{course.year}</td>
      <td className="column6">{course.instructorName}</td>
    </tr>
  );
};

export default CourseRow;
