import React, { useContext, useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/images/mcgill_logo.jpg";
import "../style/subTopbar.css";
import { UserContext } from "../App";
import { UserTypes } from "../enums/UserTypes";
import ManageProfessors from "../components/ManageProfessors";
import ManageCourses from "../components/ManageCourses";
import ManageUsers from "../components/ManageUsers";
import ManageTA from "../components/ManageTA";
import TAAdmin from "../components/TAAdmin";
import RateTA from "../components/RateTA";



export function Dashboard() {
  const tabsPerProfile = new Map<UserTypes, Array<string>>([
    [UserTypes.Sysop, ["Rate a TA","Professors", "Courses", "Users", "TA Management", "TA Administration"]],
    [UserTypes.Admin,["Rate a TA","TA Management","TA Administration"]],
    [UserTypes.Professor,["Rate a TA","TA Management"]],
    [UserTypes.Student,["Rate a TA"]],
    [UserTypes.TA,["Rate a TA", "TA Management"]],
  ]); 

  const tabNamesToJSX = new Map<string, JSX.Element>([
    ["Professors", <ManageProfessors />],
    ["Courses", <ManageCourses />],
    ["Users", <ManageUsers />],
    ["TA Management", <ManageTA />],
    ["Rate a TA",<RateTA />],
    ["TA Administration", <TAAdmin />]
  ]);

  const navigate = useNavigate();
  /**
   * Get list of user's profiles/types
   * @TODO Retrieve this information from the actual global user state
   */
  const { user, setUser } = useContext(UserContext);

  // Set a default profile
  const [currentProfile, setCurrentProfile] = useState<UserTypes>(
    user.userType[0]
  );

  // Set the default array of tabs relative to our default profile
  const [currentTabs, setCurrentTabs] = useState<Array<string>>(
    tabsPerProfile.get(currentProfile)!
  );

  // On nav bar selection, this function sets the new current profile and associated tabs.
  function handleNavClick(profile: UserTypes): void {
    setCurrentProfile(profile);
    setCurrentTabs(tabsPerProfile.get(profile)!);
  }

  function handleLogout(): void {
    navigate("/logout");
  }

  useEffect(() => {
    // if no user redirect to login page
    if (!user.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Render nav dropdown options and nav tabs based on state above
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <img className="logo" src={logo} alt="mcgill-logo" />
          <Nav className="me-auto">
            <NavDropdown title={currentProfile} id="basic-nav-dropdown">              
              {user.userType.map((profile) => (
                <NavDropdown.Item
                  key={profile.toString()}
                  onClick={() => {
                    handleNavClick(profile);
                  }}
                >
                  {profile}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <button className="logout" onClick={() => handleLogout()}>
            <LogoutIcon />
          </button>
        </Container>
      </Navbar>
      <Container>
        <Tabs
          defaultActiveKey="0"
          transition={false}
          id="noanim-tab"
          className="sub"
        >
          {currentTabs.map((currentTabName, i) => (
            <Tab className="sub" key={i} eventKey={i} title={currentTabName}>
              {tabNamesToJSX.get(currentTabName)}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
}

export default Dashboard;
