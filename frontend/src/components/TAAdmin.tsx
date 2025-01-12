import React, { useEffect, useState } from "react";
import "../style/userTable.css";
import { TA } from "../classes/TA";
import { CourseQ } from "../classes/CourseQ";
import { TAC } from "../classes/TAC";
import { TACourse } from "../classes/TACourse";
import ImportForm from "./ImportForm";
import { Container } from "react-bootstrap";
import TARow from "./TARow";
import CourseQRow from "./CourseQRow";
import TACRow from "./TACRow";
import TACourseRow from "./TACourseRow";
import AddTACourseForm from "./AddTACourseForm";

function Example() {
  const [tas, setTAs] = React.useState<Array<TA>>([]);
  const [courseqs, setCourseQs] = React.useState<Array<CourseQ>>([]);
  const [tacs, setTACs] = React.useState<Array<TAC>>([]);
  const [tacourses, setTACourses] = React.useState<Array<TACourse>>([]);
    
  const fetchTAData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tas");
      const json = await res.json();
      setTAs(json.tas);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCourseQData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tas/courseQ");
      const json = await res.json();
      setCourseQs(json.courseqs);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTACData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tas/tac");
      const json = await res.json();
      setTACs(json.tacs);
    } catch (err) {
      console.log(err);
    }
  };


  const fetchTACourseData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/tas/tacourse");
      const json = await res.json();
      setTACourses(json.tacourses);
    } catch (err) {
      console.log(err);
    }
  };

  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "none") {
        content.style.display = "block";
      } else  {
        content.style.display = "none";
      }
    });
  };

  const deleteRow= (index) =>{
    let TACoursesCopy = [...tacourses]
    TACoursesCopy.splice(index,1)
    setTACourses(TACoursesCopy)
  }

  useEffect(() => {
    // Load data
    fetchTAData();
    fetchCourseQData();
    fetchTACData();
    fetchTACourseData();
  }, []);

  return (
    <div>
      <h5>Import Course Quota</h5>
      <ImportForm taskName="Course Quota" uploadUrl="http://127.0.0.1:3000/api/tas/uploadCQ" />
      <h5>Import TA Cohort</h5>
      <ImportForm taskName="TA Quota" uploadUrl="http://127.0.0.1:3000/api/tas/uploadTAC" />

      
    
      <button type="button" className="collapsible">Open Course Quota</button>
      <Container className="mt-5" >
                  
          <div className="rowC">
            <h2 style={{ marginBottom: "20px" }}>Course Quota</h2>
          </div>
          <div id="profTable">
            <table>
              <thead>
                <tr>
                  <th className="column0"></th>
                  <th className="column1">Term Year</th>
                  <th className="column2">Course Number</th>
                  <th className="column3">Course Type</th>
                  <th className="column4">Course Name</th>
                  <th className="column5">Course Instructor</th>
                  <th className="column6">Course Enrollment</th>
                  <th className="column7">TA Quota</th>
                </tr>
              </thead>
              <tbody>
                {courseqs.map((courseq: CourseQ, i: number) => {
                  if (courseq) {
                    return <CourseQRow key={i} courseQ={courseq} fetchCourseQData={fetchCourseQData} />;
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </Container>
      

        <button type="button" className="collapsible">Open TA Cohort</button>        
        <Container className="mt-5" >
          <div className="rowC">
            <h2 style={{ marginBottom: "20px" }}>TA Cohort</h2>
          </div>
          <div id="profTable">
            <table>
              <thead>
                <tr>
                  <th className="column0"></th>
                  <th className="column1">Term Year</th>
                  <th className="column2">TA Name</th>
                  <th className="column3">Student ID</th>
                  <th className="column4">Legal Name</th>
                  <th className="column5">Email</th>
                  <th className="column6">Grad or Ugrad</th>
                  <th className="column8">Supervisor Name</th>
                  <th className="column9">Priority</th>
                  <th className="column10">House</th>
                  <th className="column11">Date Applied</th>
                  <th className="column12">Location</th>
                  <th className="column13">Phone</th>
                  <th className="column14">Degree</th>
                  <th className="column15">Courses Applied To</th>
                  <th className="column16">Open to Other Courses</th>
                  <th className="column17">Notes</th>
                </tr>
              </thead>
              <tbody>
                {tacs.map((tac: TAC, i: number) => {
                  if (tac) {
                    return <TACRow key={i} tac={tac} fetchTACData={fetchTACData} />;
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </Container>  
        
        <button type="button" className="collapsible">Open TA's and Courses</button>
        <Container className="mt-5" id="TAandC" >
          <div className="rowC">
            <h2 style={{ marginBottom: "20px" }}>TA's and Courses</h2>
            <AddTACourseForm fetchTACourseData={fetchTACourseData} />
          </div>
          <div id="profTable">
            <table>
              <thead>
                <tr>
                  <th className="column0"></th>
                  <th className="column1">Term Year</th>
                  <th className="column2">Course Number</th>
                  <th className="column3">TA Name</th>
                  <th className="column4">Student ID</th>
                  <th className="column5">Assigned Hours</th>
                </tr>
              </thead>
              <tbody>
                {tacourses.map((tacourse: TACourse, i: number) => {
                  if (tacourse) {
                    return <TACourseRow key={i} tacourse={tacourse} fetchTACourseData={fetchTACourseData}  deleteRow = {deleteRow} index = {i}/>;
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </Container>   
         

      
  
        <button type="button" className="collapsible">Open All TAs</button>
        <Container className="mt-5" id="AllTas">
          <div className="rowC">
            <h2 style={{ marginBottom: "20px" }}>All TAs</h2>
          </div>
          <div id="profTable">
            <table>
              <thead>
                <tr>
                  <th className="column0"></th>
                  <th className="column1">Term Year</th>
                  <th className="column2">TA Name</th>
                  <th className="column3">Student ID</th>
                  <th className="column4">Legal Name</th>
                  <th className="column5">Email</th>
                  <th className="column6">Grad or Ugrad</th>
                  <th className="column8">Supervisor Name</th>
                  <th className="column9">Priority</th>
                  <th className="column10">House</th>
                  <th className="column11">Date Applied</th>
                  <th className="column12">Location</th>
                  <th className="column13">Phone</th>
                  <th className="column14">Degree</th>
                  <th className="column15">Courses Applied To</th>
                  <th className="column16">Open to Other Courses</th>
                  <th className="column17">Notes</th>
                  <th className="column18">Course History</th>
                </tr>
              </thead>
              <tbody>
                {tas.map((ta: TA, i: number) => {
                  if (ta) {
                    return <TARow key={i} ta={ta} fetchTAData={fetchTAData} />;
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </Container>
     

    </div>



  );
}
function A() {
  return (
    <Example />
  );
}
export default A;

