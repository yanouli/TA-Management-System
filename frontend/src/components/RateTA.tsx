import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../style/login.css";
import "../style/userTable.css";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Course } from "../classes/Course";
import { TA } from "../classes/TA";
import { useNavigate } from "react-router-dom";



const RateTA =  () => {
    // All avaiable courses
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [course,setCourse] = useState<string>();
    const [comment, setComment] = useState<string>();
    const [TA, setTA] = useState<string>();
    const [score, setScore] = useState<number>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [TAs, setTAs] = useState<Array<TA>>([]);

    const submitHandler = async(e: { preventDefault: () => void}) => {
        e.preventDefault();
    
        // course, TA and score are required
        if (!course || !TA || !score){
          console.error("Please provide a course, TA and score.");
          setError("Please provide a course, TA and score.");
          return;
        }
        
        try {
          // Make register API call
          // Caution: Do not hardcord the URLs, instead use routers
          const res = await fetch(
            "http://127.0.0.1:3000/api/rateata/add",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                course: course,
                TA: TA,
                score: score,
                comment: comment,
              }),
            }
          );
    
          if (res.status == 201){
            navigate("/dashboard");
            return;
          } else{
            setError("Invalid");
          }
        } catch (error) {
          console.error(error);
        }
      };

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

    const fetchTAData = async () => {
        try {
            const res = await fetch("http://127.0.0.1:3000/api/tas");
            const data = await res.json();
            const taObject = [];
            for (const d of data.tas){
                let item = {
                    TAName: d.TAName
                }
                taObject.push(item);
            }
            setTAs(taObject);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchCourseData();
        fetchTAData();
    }, []);

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    };

    const handleTAChange = (e) => {
        setTA(e.target.value);
    }

    const handleScoreChange = (e) => {
        setScore(parseInt(e.target.value));
    }


    return (
        <div>
            <Container className="mt-3">
                <div className="rowC">
                    <h2 style={{ marginBottom: "20px" }}>Rate a TA</h2> 
                </div>

                <form>
                    <Row className="my-3">
                        <Col>
                            <Form.Select>
                                <option value="">Select a course...</option>
                                {courses.map((course: Course, index:number) => (
                                    <option value={course.courseNumber} onChange={handleCourseChange}>{course.courseNumber+" - "+course.term+" "+course.year+" ("+course.instructorName+")"}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="my-3">
                        <Col>
                            <Form.Select>
                                <option value="">Select a TA...</option>
                                {TAs.map((TA: TA, index:number) => (
                                    <option value={TA.TAName} onChange={handleTAChange}>{TA.TAName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="my-3">
                        <Col>
                            <Form.Select>
                                <option value="">Select a score...</option>
                                <option value="0" onChange={handleScoreChange}>0</option>
                                <option value="1" onChange={handleScoreChange}>1</option>
                                <option value="2" onChange={handleScoreChange}>2</option>
                                <option value="3" onChange={handleScoreChange}>3</option>
                                <option value="4" onChange={handleScoreChange}>4</option>
                                <option value="5" onChange={handleScoreChange}>5</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="my-3">
                        <Col>
                        <Form.Control type="courseNumber" placeholder="Please write a short comment. (Optional)" value="" />
                        </Col>
                    </Row>

                    <Button className="mt-3" variant="light" type="submit">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
      );
}

export default RateTA;