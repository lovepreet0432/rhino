import React, { useEffect, useState } from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/images/logo23.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { API_BASE_URL } from "../../Constants";
import { useDispatch, useSelector } from 'react-redux';
import { setUser,setUserProfile,setUserSubscription, setToken, setIsAuthenticated} from '../../redux/slices/authSlice';
import loginocon from "../../assets/images/login.svg"
import rigstericon from "../../assets/images/rigster.svg"
import profileicon from "../../assets/images/profile.svg"
import Offcanvas from 'react-bootstrap/Offcanvas';
import logout from "../../assets/images/logout.svg"
import { HeaderStyle } from "../../assets/css/commonStyle";

const Header = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state)=> state.auth.token);
  const [isSticky, setIsSticky] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const scrollToTop = () => {
    setShow(false); 
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const logoutHandler = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
      customClass: {
        confirmButton: 'btn', 
        cancelButton: 'btn cancel-btn ',  
    },
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(API_BASE_URL+"/logout", {token:atob(accessToken)}, {
              headers: {
                  Authorization: `Bearer ${atob(accessToken)}`
              }
          });
          if (response.status === 200) {
            localStorage.removeItem('access_token');
            dispatch(setUser(''));
            dispatch(setUserProfile(''));
            dispatch(setUserSubscription(''));
            dispatch(setToken(''));
            dispatch(setIsAuthenticated(false));
            navigate("/");
        } else {
            console.error("Logout failed with status:", response.status);
        }
      } catch (error) {
          console.error(error);
      }
    }
};

  return (
    
    <HeaderStyle className={isSticky ? "sticky-header active" : "sticky-header"}>
      <Navbar expand="lg" className="bg-body-tertiary mt-0 mb-0"  expanded={expanded}>
        <Container>
          <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink>        
          <Navbar.Toggle aria-controls="navbarScroll" variant="primary" className="d-lg-none" onClick={handleShow}/>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0">   
              <NavLink
                to="/"
                onClick={scrollToTop}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "isActive" : ""
                } data-hover=""
              >
                Home
              </NavLink>
              <NavLink
                to="/scan"
                onClick={scrollToTop}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "isActive" : ""
                } data-hover=""
              >
                Scan
              </NavLink>
              {!accessToken ? (
                <>
                  <NavLink
                    to="/subscription"
                    onClick={scrollToTop}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "isActive" : ""
                    }
                    data-hover=""
                  >
                    Pricing
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/subscription"
                    onClick={scrollToTop}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "isActive" : ""
                    }
                    data-hover=""
                  >
                    Subscription
                  </NavLink>
                </>
              )}
            </Nav>
            <div className="d-lg-flex login-btn">
              {!accessToken ? (
                <>
                  <NavLink to="/login" onClick={scrollToTop} className="">
                    <span><img src={loginocon}/>Login</span>
                  </NavLink>
                  <NavLink
                    to="/registration"
                    onClick={scrollToTop}
                    className="pending"
                  >
                     <span><img src={rigstericon}/>Register</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/myprofile/profile" onClick={scrollToTop}  className="">
                    <span><img src={profileicon}/>My Profile</span>
                  </NavLink>
                  <a className=""  onClick={logoutHandler}><span><img src={logout}/></span>Logout</a>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>  <NavLink to="/">
            <img src={Logo} alt="Logo" />
          </NavLink></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar.Collapse id="navbarScroll">
            <div className="my-lg-0">   
              <NavLink
                to="/"
                onClick={scrollToTop}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "isActive" : ""
                } data-hover=""
              >
                Home
              </NavLink>
              <NavLink
                to="/scan"
                onClick={scrollToTop}
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "isActive" : ""
                } data-hover=""
              >
                Scan
              </NavLink>
              {!accessToken ? (
                <>
                  <NavLink
                    to="/subscription"
                    onClick={scrollToTop}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "isActive" : ""
                    }
                    data-hover=""
                  >
                    Pricing
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/subscription"
                    onClick={scrollToTop}
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "isActive" : ""
                    }
                    data-hover=""
                  >
                    Subscription
                  </NavLink>
                </>
              )}
            </div>
            <div className="d-lg-flex login-btn">
              {!accessToken ? (
                <>
                  <NavLink to="/login" onClick={scrollToTop} className="">
                    <span><img src={loginocon}/>Login</span>
                  </NavLink>
                  <NavLink
                    to="/registration"
                    onClick={scrollToTop}
                    className="pending"
                  >
                     <span><img src={rigstericon}/>Register</span>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/myprofile/profile" onClick={scrollToTop}  className="">
                    <span><img src={profileicon}/>My Profile</span>
                  </NavLink>
                  <a className=""  onClick={logoutHandler}><span><img src={logout}/></span>Logout</a>
                </>
              )}
            </div>
            </Navbar.Collapse>
        </Offcanvas.Body>
      </Offcanvas>
    </HeaderStyle>
  );
};

export default Header;