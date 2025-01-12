import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import React from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import { Course } from "../classes/Course";
import TAAdmin from "./TAAdmin";
import { useNavigate } from "react-router-dom";
import {useRef, useEffect} from 'react';

const ManageTARow = ({ course, fetchCourseData }: { course: Course; fetchCourseData: Function }) => {
  
  const ref = useRef(null);
  const navigate = useNavigate();
  
  return (
    <tr className="body" >
      <td className="column0"></td>
      <td className="column1">{course.courseNumber}</td>
      <td className="column2">{course.courseName}</td>
      <td className="column3">{course.courseDesc}</td>
      <td className="column4">{course.term}</td>
      <td className="column5">{course.year}</td>
      <td className="column6">{course.instructorName}</td>
    </tr>
  );
};

export default ManageTARow;
