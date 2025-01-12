import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "../style/userTable.css";
import { TAC } from "../classes/TAC";
import { Course } from "../classes/Course";

const TACRow = ({ tac, fetchTACData }: { tac: TAC; fetchTACData: Function }) => {
  const [show, setShow] = useState(false);
  
  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{tac.termYear}</td>
      <td className="column2">{tac.TAName}</td>
      <td className="column3">{tac.studentID}</td>
      <td className="column4">{tac.legalName}</td>
      <td className="column5">{tac.Email}</td>
      <td className="column6">{tac.gradUgrad}</td>
      <td className="column8">{tac.supervisorName}</td>
      <td className="column9">{tac.Priority}</td>
      <td className="column10">{tac.Hours}</td>
      <td className="column11">{tac.dateApplied}</td>
      <td className="column12">{tac.Location}</td>
      <td className="column13">{tac.Phone}</td>
      <td className="column14">{tac.Degree}</td>
      <td className="column15">{tac.courseList}</td>
      <td className="column16">{tac.otherCourse}</td>
      <td className="column17">{tac.Notes}</td>
    </tr>
  );
};

export default TACRow;
