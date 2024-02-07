import React, { useState,useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import emailIcon from "../../assets/images/email.svg";
import passwordIcon from "../../assets/images/password.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useFormik } from "formik";
import { setUser, setToken, setUserProfile, setIsAuthenticated,setUserSubscription } from '../../redux/slices/authSlice';
import { setOption } from '../../redux/slices/accountSlice';
import { TailSpin } from "react-loader-spinner";
import { adminLoginApi } from "../../utils/api/auth";
import { LoginSchema } from "../../utils/validations";
import { AdminLoginStyle }from '../../assets/css/authStyle';
const AdminLogin = () => {
  document.title = "Admin Login - Rhinolister";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setValidationErrors({});
      const response = await adminLoginApi(values);
      if (response.status == 200) {
        const decodeToken = btoa(response.data.access_token);
        localStorage.setItem("access_token", decodeToken);
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(response.data.user));
        if (response.data.user_profile != null) {
          dispatch(setUserProfile(response.data.user_profile));
        }
        if (response.data.user_accounts !== null) {
          dispatch(setOption(response.data.user_accounts));
        }

        dispatch(setUserSubscription(response.data.user_subscription));
        dispatch(setToken(decodeToken));
        navigate("/myprofile/profile");
  
      }
      else if (response.status === 422) {
        const validationErrors = response.data.errors;
        setValidationErrors(validationErrors);
      } 
      else if (response.status === 401) {
        setValidationErrors({"error" : "Invalid credentials. Please try again."});
      } else {
        setValidationErrors({"error" : "Internal Server Error."});
      }
    }
  });

  return (
    <AdminLoginStyle className="login">
      <Container>
        <Row>
          <Col sm="12">
            <h2>Admin Login</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm="6">
            <div className="login p-5">
              <form onSubmit={formik.handleSubmit}>
                {Object.keys(validationErrors).map((fieldName) => (
                  <p key={fieldName} className="error-message">
                    {validationErrors[fieldName]}
                  </p>
                ))}
                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="formPlaintextEmail"
                >
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                  </Col>
                  <Col sm="12">
                    <div className="position-relative">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="email icon"><img src={emailIcon} /></span>
                      {formik.errors.email && formik.touched.email && (
                        <p className="text-start error-message">{formik.errors.email}</p>
                      )}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-2"
                  controlId="formPlaintextPassword"
                >
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="2">
                      Password
                    </Form.Label>
                  </Col>
                  <Col sm="12" className="mb-2 pass-log">
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="pass icon"><img src={passwordIcon} /></span>
                      {" "}
                      <i
                        className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                          } password-icon`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      {formik.errors.password && formik.touched.password && (
                        <p className=" text-start error-message">{formik.errors.password}</p>
                      )}
                    </div>
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <Button type="submit" className="custom-btn btn-3 mb-2" disabled={formik.isSubmitting}>
                    <span className="d-flex align-items-center" style={{ marginRight: "10px" }}>Login</span>  {" "}{formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </Button>
                </Col>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </AdminLoginStyle>
  );
};

export default AdminLogin;
