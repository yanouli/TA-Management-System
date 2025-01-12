import React, { useState, useEffect } from "react";
import "../style/userTable.css";
import { TA } from "../classes/TA";


const TARow = ({ ta, fetchTAData }: { ta: TA; fetchTAData: Function }) => {
  const [show, setShow] = useState(false);
  var pls="";
  if(ta.courses){
   for (let i = 0; i <ta.courses.length; i++) {
      pls=pls+ta.courses[i].termYear+ta.courses[i].courseNum+" "
    }
}




  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{ta.termYear}</td>
      <td className="column2">{ta.TAName}</td>
      <td className="column3">{ta.studentID}</td>
      <td className="column4">{ta.legalName}</td>
      <td className="column5">{ta.Email}</td>
      <td className="column6">{ta.gradUgrad}</td>
      <td className="column8">{ta.supervisorName}</td>
      <td className="column9">{ta.Priority}</td>
      <td className="column10">{ta.Hours}</td>
      <td className="column11">{ta.dateApplied}</td>
      <td className="column12">{ta.Location}</td>
      <td className="column13">{ta.Phone}</td>
      <td className="column14">{ta.Degree}</td>
      <td className="column15">{ta.courseList}</td>
      <td className="column16">{ta.otherCourse}</td>
      <td className="column17">{ta.Notes}</td>
      <td className="column18">{pls}</td>
    </tr>
  );
};

export default TARow;
