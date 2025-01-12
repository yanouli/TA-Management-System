import React, { useContext, useEffect, useState }from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/mcgill_logo.jpg";
import { UserTypes } from "../enums/UserTypes";
import "../style/register.css";
import "../App.css";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
//import SelectCourse from "../components/Register/SelectCourse";
//import AddIcon from "@mui/icons-material/Add";
import { Course } from "../classes/Course";

const Register: React.FC = () =>{

  // Declare hooks
  //const [show, setShow] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFname] = useState<string>("");
  const [lastName, setLname] = useState<string>("");
  const [userType,setUserType] = useState<Array<UserTypes>>([]);
  // All avaiable courses
  const [course, setCourse] = useState<Array<Course>>([]);
  // List of courses that user belongs to
  const [userCourse, setUserCourse] = useState<Array<Course>>([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // on register pass firstName, lastName, email and password values entered by user
  const submitHandler = async(e: { preventDefault: () => void}) => {
    e.preventDefault();

    // error if empty fname, lname, email or password
    if (!firstName || !lastName || !email || !password || !userType){
      console.error("Please provide your first name, last name, email, password and user type.");
      setError("Please provide your first name, last name, email, password and user type.");
      return;
    }
    
    try {
      // Make register API call
      // Caution: Do not hardcord the URLs, instead use routers
      const res = await fetch(
        "http://127.0.0.1:3000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: userType,
            course: userCourse,
          }),
        }
      );

      // If register was successful, redirect to login page
      if (res.status == 201){
        navigate("/login");
        return;
      } else{
        setError("Invalid");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  function handleCheckbox(e) {
    // create a new array of usertype
    const UserTypes:UserTypes[] = [];
    //let existingUserTypes:UserTypes[] = [...userType];
    if (e.target.checked) {
        UserTypes.push(e.target.value);
    } else {
        const index = UserTypes.indexOf(e.target.value);
        UserTypes.splice(index, 1);
    }
    setUserType(UserTypes);
    console.log(userType);
  }

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
        setCourse(courseObject);
    } catch (err) {
        console.error(err);
    }
}

useEffect(() => {
    fetchCourseData();
  }, []);

  function handleCourseCheckbox(e){
    // create a new array of courses that the user belongs to
    const UserCourse:Course[] = [];
    //Instead of just push the course number, get the course object
    if (e.target.checked) {
        UserCourse.push(e.target.value);
    } else {
        const index = UserCourse.indexOf(e.target.value);
        UserCourse.splice(index, 1);
    }
    setUserCourse(UserCourse);
    console.log(UserCourse);
  }

  return (
    <div className="register">
    <div className="welcome">
      <form onSubmit={submitHandler}>
        <div className="form-inner2">
          <img className="logo" src={logo} alt="mcgill-logo" />

          <p className="top">Create your account.</p>
            {error !== "" ? <div className="error"> * {error} </div> : ""}

          <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                id="firstName"
                onChange={(e) => setFname(e.target.value)}
              />
          </div>
          <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                id="lastName"
                onChange={(e) => setLname(e.target.value)}
              />
          </div>

          <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="top">Select your user type(s).</p>

            <Form>
              <Row>
                <Col>
                  <Form.Check inline type="checkbox" label="Student" value="stud" onChange={handleCheckbox}/>
                  <Form.Check inline type="checkbox" label="Professor" value="prof" onChange={handleCheckbox}/>
                  <Form.Check inline type="checkbox" label="TA" value="ta" onChange={handleCheckbox}/>
                  <Form.Check inline type="checkbox" label="Admin" value="admin" onChange={handleCheckbox}/>
                  <Form.Check inline type="checkbox" label="Sysop" value="sysop" onChange={handleCheckbox}/> 
                </Col>
              </Row>
            </Form>

            <div>
              <p className="top">Select your course(s).</p>
              {course.map((course: Course,index: number) => (
                <div key={index}>
                  <Form>
                    <Form.Check inline type="checkbox" label={course.courseNumber+" - "+course.term+" "+course.year+" ("+course.instructorName+")"} value={course.courseNumber} onChange={handleCourseCheckbox}/>
                  </Form>
                </div>
              ))}
            </div>

          {/*  

            <a className="bottom" onClick={()=> setShow(true)}>Select a course</a>

            <Modal show={show} onHide={()=> setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">Select a course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SelectCourse></SelectCourse>
              </Modal.Body>
            </Modal>
            */}

            <div className="sign-in-button">
              <input type="submit" value="Register" />
            </div>

            <p className="bottom">
              <Link className="links" to="/Login">
                Back to login page
              </Link>
            </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Register;