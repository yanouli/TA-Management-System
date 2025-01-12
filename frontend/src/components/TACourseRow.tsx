import React, { useState, useEffect } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import "../style/userTable.css";
import { TACourse } from "../classes/TACourse";

const TACourseRow = ({ tacourse, fetchTACourseData, deleteRow, index }: { tacourse: TACourse; fetchTACourseData: Function; deleteRow: Function; index:Number }) => {
  const [show, setShow] = useState(false);
  const handleDeleteTACourse = async (e) => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tas/deleteTA", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TAName: tacourse.TAName,
        courseNum: tacourse.courseNum
      }),});
      // make API call to delete tacourse
       deleteRow(index)
    } catch (e) { }
  };

  return (
    <tr className="body">
      <td className="column0">
        <button className="btn btn-secondary" onClick={handleDeleteTACourse}>
          <RemoveIcon />
        </button>
      </td>
      <td className="column1">{tacourse.termYear}</td>
      <td className="column2">{tacourse.courseNum}</td>
      <td className="column3">{tacourse.TAName}</td>
      <td className="column4">{tacourse.studentID}</td>
      <td className="column5">{tacourse.assignedHours}</td>
    </tr>
  );
};

export default TACourseRow;
