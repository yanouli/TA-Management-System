import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../style/userTable.css";
import { UserTypes } from "../enums/UserTypes";

function EditUserForm({fetchUserData,show,close,user}) {
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempFirstname, setTempFirstname] = useState<string>("");
  const [tempLastname, setTempLastname] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUserType, setTempUserType] = useState<Array<UserTypes>>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // CAUTION: Do not hard code the URLs, rather use routers


      console.log("oldemail:"+user.email)
      console.log("firstname"+tempFirstname)
      console.log("lastname"+tempLastname)
      console.log("email:"+tempEmail)
      console.log("pass:"+tempPassword)
      console.log("usertype"+tempUserType)

      const res = await fetch("http://127.0.0.1:3000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          findEmail:user.email,
          firstName: tempFirstname,
          lastName: tempLastname,
          email: tempEmail,
          password: tempPassword,
          userType: tempUserType,
        }),
      });

      if (res.status === 201) {
        const data = await res.json();
        setTimeout(() => {
        fetchUserData();
        }, 500);
      } else {
        alert("Error while adding user.");
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  function handleCheckbox(e) {
    let existingUserTypes:UserTypes[] = [...tempUserType];
    if (e.target.checked) {
        existingUserTypes.push(e.target.value);
    } else {
        const index = existingUserTypes.indexOf(e.target.value);
        existingUserTypes.splice(index, 1);
    }
    setTempUserType(existingUserTypes);
  }

  return (
    <div>
      <Modal show={show} dialogClassName="modal-lg" 
                aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton onClick={close}>

          <Modal.Title id="example-custom-modal-styling-title">Edit a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control required type="firstName" 
                                placeholder={user.firstName}
                                value={tempFirstname} 
                                onChange={(e) => setTempFirstname(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="lastName" 
                                placeholder={user.lastName}
                                value={tempLastname} 
                                onChange={(e) => setTempLastname(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="email" 
                                placeholder={user.email}
                                value={tempEmail} 
                                onChange={(e) => setTempEmail(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="password" 
                                placeholder="Enter temporary password" 
                                value={tempPassword} 
                                onChange={(e) => setTempPassword(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
              <Form.Check inline type="checkbox" label="Student" value="stud" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Professor" value="prof" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="TA" value="ta" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Admin" value="admin" onChange={handleCheckbox}/>
              <Form.Check inline type="checkbox" label="Sysop" value="sysop" onChange={handleCheckbox}/>
              </Col>
            </Row>

            <Button className="mt-3" variant="light" type="submit" onClick={close}>
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditUserForm;
