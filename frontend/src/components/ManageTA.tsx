import { useState, useEffect } from "react";
import { Course } from "../classes/Course";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "../style/userTable.css";

const ManageTA = () => {
    const [show, setShow] = useState(false);
    // List of all available courses in the db
    const [courses, setCourses] = useState<Array<Course>>([]);
    // Selected course
    const [course, setCourse] = useState<string>();

    const [tempTime, setTempTime] = useState<string>("");
    const [tempLocation, setTempLocation] = useState<string>("");
    const [tempTAduties,setTempTAduties] = useState<string>("");


    // Fetch the list of all available courses
    const fetchCourseData = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/api/course");
            const data = await res.json();
            const courseObject = [];
            for (const d of data.courses){
                let item = {
                    courseNumber: d.courseNumber,
                    courseName: d.courseName,
                    courseDesc: d.courseDesc,
                    term: d.term,
                    year: d.year,
                }
                courseObject.push(item);
            }
            setCourses(courseObject);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCourseData();
    }, []);

    const handleChange = (e) => {
        setCourse(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };
    return(
     
        <div>
        <button className="mb-4 mt-2" onClick={() => setShow(true)}>
            add office hour
        </button>
        <Modal show={show}  onHide={() => setShow(false)} dialogClassName="modal-lg" 
        aria-labelledby="example-custom-modal-styling-title">
        < Modal.Header closeButton >
      
          <Modal.Title id="example-custom-modal-styling-title">Add office hour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
              <p>Enter the time of the office hour below </p>
                <Form.Control required type="time" 
                                value={tempTime} 
                                onChange={(e) => setTempTime(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
              <p>Enter the location of the office hour below</p>
                <Form.Control required type="location" 
                                value={tempLocation} 
                                onChange={(e) => setTempLocation(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
              <p>Enter the duty of each ta below:</p>
                <Form.Control required type="duty" 
                                value={tempTAduties} 
                                onChange={(e) => setTempTAduties(e.target.value)} />
              </Col>
            </Row>

            <Button className="mt-3" variant="light" type="submit"  onClick={() => setShow(false)}>
              Add 
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    );
};


export default ManageTA;