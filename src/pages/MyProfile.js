import React,{useState, useEffect, useMemo } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Nav,
} from "react-bootstrap";
import { FaUserLarge } from "react-icons/fa6";
import { FaHouseChimney, FaWindowMaximize, FaRegCircleUser, FaUnlockKeyhole, FaFileLines, FaUserGear } from "react-icons/fa6";
import { FaUserFriends } from 'react-icons/fa';
import Profile from '../components/myprofile/Profile';
import ChangePassword from '../components/myprofile/ChangePassword';
import AccountSetting from '../components/myprofile/AccountSetting';
import SubscriptionPlan from '../components/myprofile/SubscriptionPlan';
import HomePage from '../components/myprofile/admin/HomePage';
import UserSubscriptions from '../components/myprofile/admin/UserSubscriptions';
import Subscription from '../components/myprofile/admin/Subscription';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import UserList from "../components/myprofile/admin/UserList";
import ContactFormList from "../components/myprofile/admin/ContactFormList";
import { MyProfileStyle } from "../assets/css/pagesStyle";


const MyProfile = ({ url }) => {
  const user = useSelector(state => state.auth.user);
  const isAdmin = user && user.is_admin;
  const userRole = user ? user.role : null;
  const isSupport = userRole === "support";

  const [activeComponent, setActiveComponent] = useState('profile');

  useEffect(() => {
    setActiveComponent(url);
  }, [url]);

  const componentMap = useMemo(() => ({
    profile: <Profile />,
    changepassword: <ChangePassword />,
    accountsetting: <AccountSetting />,
    subscriptionplan: <SubscriptionPlan />,
    homepage: <HomePage />,
    adminSubscription: <Subscription />,
    userSubscriptions: <UserSubscriptions />,
    userList: <UserList />,
    contactFormList: <ContactFormList />,
  }), []);

  const renderComponent = useMemo(() => componentMap[activeComponent] || <Profile />, [activeComponent, componentMap]);

  return (
    <MyProfileStyle className="Profilepage">
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3} className="text-start">
              <div className="left-sidebar">
                <h4>Account Settings</h4>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <NavLink to="/myprofile/profile" className="nav-link">
                      <span>
                        <FaUserLarge />
                      </span>
                      Profile
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to="/myprofile/password" className="nav-link">
                      <span>
                        <FaUnlockKeyhole />
                      </span>
                      Password
                    </NavLink>
                  </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/subscription" className="nav-link">
                        <span>
                          <FaFileLines />
                        </span>
                        Subscriptions
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/account" className="nav-link">
                        <span>
                          <FaUserGear />
                        </span>
                        Export Settings
                      </NavLink>
                    </Nav.Item>
                </Nav>
                {isAdmin ? <>
                  <h4 className="pt-4">Admin Settings</h4>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/homepage" className="nav-link">
                        <span>
                          <FaHouseChimney />
                        </span>
                        HomePage
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/subscription" className="nav-link">
                        <span>
                          <FaWindowMaximize />
                        </span>
                        Subscription
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/userList" className="nav-link">
                        <span>
                          <FaUserFriends />
                        </span>
                        User List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/contactFormList" className="nav-link">
                        <span>
                          <FaUserFriends />
                        </span>
                        Contact Form List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/user-subscriptions" className="nav-link">
                        <span>
                          <FaRegCircleUser />
                        </span>
                        User Subscriptions
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                </> : ""}
                {isSupport ?
                  <>
                  <h4 className="pt-4">Admin Settings</h4>
                  <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                      <NavLink to="/myprofile/admin/homepage" className="nav-link">
                        <span>
                          <FaHouseChimney />
                        </span>
                        HomePage
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink to="/myprofile/admin/subscription" className="nav-link">
                        <span>
                          <FaWindowMaximize />
                        </span>
                        Subscription
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                  </>:""
                  }
              </div>
            </Col>

            <Col sm={9}>
              {renderComponent}
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </MyProfileStyle>
  );
};



export default MyProfile;