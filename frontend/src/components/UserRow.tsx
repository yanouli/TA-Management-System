import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import "../style/userTable.css";
import { User } from "../classes/User";
import { UserTypes } from "../enums/UserTypes";
import EditUserForm from "./EditUserForm";
import { Modal } from "react-bootstrap";


  const UserRow = ({ user, fetchUserData ,deleteRow,index}: { user: User; fetchUserData: Function ;deleteRow: Function; index:Number}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempFirstname, setTempFirstname] = useState<string>("");
  const [tempLastname, setTempLastname] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUserType, setTempUserType] = useState<Array<UserTypes>>([]);


  const handleDeleteUser = async (e) => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }
      
      ),});
      // make API call to delete user
      deleteRow(index)


    } catch (e) { }
  };
  


  return (

    <tr className="body" >
        <td className="column6">  <button onClick={() => setShowEditForm(true)}>edit</button>
      <EditUserForm fetchUserData={fetchUserData} show={showEditForm} close={() => setShowEditForm(false)} user={user}/>
      </td>

      <td className="column0">
    
        <button className="btn btn-secondary" onClick={handleDeleteUser}>
          <RemoveIcon />
        </button>
      </td>
    
      <td className="column1">{user.email}</td>
      <td className="column2">{user.firstName}</td>
      <td className="column3">{user.lastName}</td>
      <td className="column5">{user.userType.join(", ")}</td>
    </tr>
  );
};

export default UserRow;
