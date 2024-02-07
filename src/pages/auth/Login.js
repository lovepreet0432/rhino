import React, { useState,useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import emailIcon from "../../assets/images/email.svg";
import passwordIcon from "../../assets/images/password.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { setUser, setToken, setIsAuthenticated, setUserProfile, setUserSubscription } from '../../redux/slices/authSlice';
import { setOption } from '../../redux/slices/accountSlice';
import { loginApi } from "../../utils/api/auth";
import { useFormik } from "formik";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LoginSchema } from "../../utils/validations";
import { LoginStyle } from "../../assets/css/authStyle";

const Login = () => {
  document.title = "Login - Rhinolister";
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await loginApi(values);
      setValidationErrors({});
      if (response.status === 200) {
        const token = response.data.access_token;
        const decodedToken = btoa(token);
        localStorage.setItem("access_token", decodedToken);
        dispatch(setUser(response.data.user));

        if (response.data.user_profile !== null) {
          dispatch(setUserProfile(response.data.user_profile));
        }

        if (response.data.user_accounts !== null) {
          dispatch(setOption(response.data.user_accounts));
        }

        dispatch(setUserSubscription(response.data.user_subscription));
        dispatch(setToken(decodedToken));
        navigate("/scandetail");
        dispatch(setIsAuthenticated(true));
      }else if (response.status === 422) {
        const validationErrors = response.data.errors;
        setValidationErrors(validationErrors);
      }
       else if (response.status === 302) {
        navigate('/email/verify', {
          state: { email: values.email }
        });
      } else if (response.status === 401) {
        setValidationErrors({"error" : "Invalid credentials. Please try again."});
      } else {
        setValidationErrors({"error" : "Internal Server Error."});
      }
    },
  });

  return (
    <LoginStyle className="login">
      <Container>
        <Row>
          <Col sm="12">
            <h2>Login</h2>
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
                      <span className="email icon"><img src={emailIcon} alt="email icon" /></span>
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
                  <Col sm="12" className="mb-3 pass-log">
                    <div className="position-relative">
                      <Form.Control
                        type={formik.values.showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="pass icon"><img src={passwordIcon} alt="password icon" /></span>
                      {" "}
                      <i
                        className={`bi ${formik.values.showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                          } password-icon`}
                        onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
                      ></i>
                      {formik.errors.password && formik.touched.password && (
                        <p className=" text-start error-message">{formik.errors.password}</p>
                      )}
                    </div>
                  </Col>
                </Form.Group>
                <div className="forgotPassword">
                    <Link to="/forgot-password">Forgot password ?</Link>
                  </div>
                <Col sm={12} className="text-center">
                  <Button type="submit" className="custom-btn btn-3 mb-2" disabled={formik.isSubmitting}>
                    <span className="d-flex align-items-center" style={{ marginRight: "10px" }}>Login</span>  {" "}{formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </Button>
                
                  <p>
                    <span className="or">or</span>
                    <span className="border-row"></span>
                  </p>
                  <p>
                    Don’t have an account?{" "}
                    <Link to="/registration">Register</Link>
                  </p>
                </Col>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </LoginStyle>
  );
};

export default Login;
