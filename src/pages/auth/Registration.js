import React, { useState,useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import emailIcon from "../../assets/images/email.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "bootstrap-icons/font/bootstrap-icons.css";
import { registerApi } from "../../utils/api/auth";
import { useFormik } from "formik";
import { RegisterStyle } from "../../assets/css/authStyle";
import { RegistrationSchema } from "../../utils/validations";

const Registration = () => {
  document.title = "Signup - Rhinolister";
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerApi(values);
        console.log(response,'eee')
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your account is created successfully. Please confirm your email.",
            customClass: {
              confirmButton: "btn",
            }
          }).then(() => {
            navigate("/login");
          });
        } else if (response.status === 422) {
          const validationErrors = response.data.errors;
          setValidationErrors(validationErrors);
        } else if (response.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: response.data.error,
            customClass: {
              confirmButton: "btn",
            }
          })
        } 
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    formik.setFieldValue("showConfirmPassword", !formik.values.showConfirmPassword);
  };


  return (
    <RegisterStyle className="register">
      <Container>
        <Row>
          <Col sm="12">
            <h2>Create an Account</h2>
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
                <Form.Group as={Row} className="mb-2" controlId="formPlaintextName">
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="2">
                      Full Name
                    </Form.Label>
                  </Col>
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="error-message">{formik.errors.fullName}</p>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                  </Col>
                  <Col sm="12">
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="email icon">
                        <img src={emailIcon} alt="Email Icon" />
                      </span>
                      {formik.touched.email && formik.errors.email && (
                        <p className="error-message">{formik.errors.email}</p>
                      )}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="formPlaintextPassword">
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="2">
                      Password
                    </Form.Label>
                  </Col>
                  <Col sm="12" className="position-relative">
                    <div className="position-relative">
                      <Form.Control
                        type={formik.values.showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
        
                      <i
                        className={`ps-1 bi ${formik.values.showPassword
                          ? "bi-eye-slash-fill"
                          : "bi-eye-fill"
                          } password-icon`}
                        onClick={togglePasswordVisibility}
                      ></i>

                      {formik.touched.password && formik.errors.password && (
                        <p className="error-message">{formik.errors.password}</p>
                      )}
                    </div>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextConfirmPassword"
                >
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="4">
                      Confirm Password
                    </Form.Label>
                  </Col>
                  <Col sm="12" className="position-relative">
                    <div className="position-relative">
                      <Form.Control
                        type={formik.values.showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                   
                      <i
                        className={`ps-1 bi ${formik.values.showConfirmPassword
                          ? "bi-eye-slash-fill"
                          : "bi-eye-fill"
                          } password-icon`}
                        onClick={toggleConfirmPasswordVisibility}
                      ></i>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="error-message">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <Button
                    type="submit"
                    className="custom-btn btn-3 mb-2"
                    disabled={formik.isSubmitting}
                  >
                    <span className="d-flex align-items-center" style={{ marginRight: "10px" }}>
                      Register
                    </span>{" "}
                    {formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </Button>
                  <p>
                    <span className="or">or</span>
                    <span className="border-row"></span>
                  </p>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Col>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </RegisterStyle>
  );
};


export default Registration;
