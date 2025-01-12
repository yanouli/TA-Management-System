import React, { useState, useEffect } from "react";
import FlagIcon from "@material-ui/icons/Flag";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "../style/userTable.css";
import { CourseQ } from "../classes/CourseQ";
import { Course } from "../classes/Course";

const CourseQRow = ({ courseQ, fetchCourseQData }: { courseQ: CourseQ; fetchCourseQData: Function }) => {
  const [show, setShow] = useState(false);
  
  if((parseInt(courseQ.courseEnrollment)/parseInt(courseQ.TAQuota))<30||(parseInt(courseQ.courseEnrollment)/parseInt(courseQ.TAQuota))>45){

  return (
    <tr className="body">
      <td className="column0"><FlagIcon /></td>
      <td className="column1">{courseQ.termYear}</td>
      <td className="column2">{courseQ.courseNum}</td>
      <td className="column3">{courseQ.courseType}</td>
      <td className="column4">{courseQ.courseName}</td>
      <td className="column5">{courseQ.instructorName}</td>
      <td className="column6">{courseQ.courseEnrollment}</td>
      <td className="column7">{courseQ.TAQuota}</td>
    </tr>
  );
  }
  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{courseQ.termYear}</td>
      <td className="column2">{courseQ.courseNum}</td>
      <td className="column3">{courseQ.courseType}</td>
      <td className="column4">{courseQ.courseName}</td>
      <td className="column5">{courseQ.instructorName}</td>
      <td className="column6">{courseQ.courseEnrollment}</td>
      <td className="column7">{courseQ.TAQuota}</td>
    </tr>
  );
};

export default CourseQRow;
