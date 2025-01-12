import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../style/userTable.css";
import { FileDownload } from "@mui/icons-material";
import { Course } from "../classes/Course";

function ImportCourseForm({ taskName, uploadUrl,fetchCourseData}: { taskName: string, uploadUrl: string, fetchCourseData:Function}) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const [courses, setCourses] = React.useState<Array<Course>>([]);


  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false);
    const formData = new FormData();
    formData.append('csvFile', file);


    try {
      // CAUTION: Do not hard code the URLs, rather use routers
      console.log(uploadUrl);
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData
      });

      if (res.status === 200) {
        const data = await res.json();
      } else {
        alert("Error while adding user.");
      }

      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          csvToArray(text);
          console.log(text)
        };
        fileReader.readAsText(file);
      }


    } catch (err) {
      console.log(err);
    }
  };

  const csvToArray = string => {
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const imported= csvRows.map(i => {
    const values = i.split(",");
    const course = { term: values[0], year: values[1], courseNumber: values[2], courseName: values[3],instructorName:values[4]};
    return course;
    }
    );
    console.log(imported)
    fetchCourseData();
    setCourses(courses.concat(imported));
    console.log(courses)
  };


  return (
    <div id="ta-review-modal">
      <button className="courses" onClick={() => setShow(true)}>
        <FileDownload /> Import
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-md" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{`Import ${taskName}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control required type="file" name="csvFile" onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Button variant="outline-secondary" type="submit">
              Upload
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ImportCourseForm;
