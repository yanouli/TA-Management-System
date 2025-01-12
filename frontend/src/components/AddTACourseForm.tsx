import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import "../style/userTable.css";
import { UserTypes } from "../enums/UserTypes";

function AddTACourseForm({ fetchTACourseData }) {
  const [show, setShow] = useState(false);
  const [tempTermYear, setTempTermYear] = useState<string>("");
  const [tempCourseNum, setTempCourseNum] = useState<string>("");
  const [tempTAName, setTempTAName] = useState<string>("");
  const [tempStudentID, setTempStudentID] = useState<string>("");
  const [tempAssignedHours, setTempAssignedHours] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // CAUTION: Do not hard code the URLs, rather use routers
      const res = await fetch("http://127.0.0.1:3000/api/tas/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          termYear: tempTermYear,
          courseNum: tempCourseNum,
          TAName: tempTAName,
          studentID: tempStudentID,
          assignedHours: tempAssignedHours,
        }),
      });

      if (res.status === 201) {
        const data = await res.json();
        setTimeout(() => {
          fetchTACourseData();
        }, 500);
      } else {
        alert("Error while adding user.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon />
      </button>

      <Modal show={show} onHide={() => setShow(false)} 
                dialogClassName="modal-lg" 
                aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a TA to a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control required type="termYear" 
                                placeholder="Enter the term year" 
                                value={tempTermYear} 
                                onChange={(e) => setTempTermYear(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseNum" 
                                placeholder="Enter the Course Number" 
                                value={tempCourseNum} 
                                onChange={(e) => setTempCourseNum(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="TAName" 
                                placeholder="Enter the TA's name" 
                                value={tempTAName} 
                                onChange={(e) => setTempTAName(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="studentID" 
                                placeholder="Enter the TA's student ID" 
                                value={tempStudentID} 
                                onChange={(e) => setTempStudentID(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="assignedHours" 
                                placeholder="Enter the assigned hours" 
                                value={tempAssignedHours} 
                                onChange={(e) => setTempAssignedHours(e.target.value)} />
              </Col>
            </Row>
            <Button className="mt-3" variant="light" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddTACourseForm;
