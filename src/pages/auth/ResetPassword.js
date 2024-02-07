import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useFormik } from "formik";
import { ResetPasswordValidationSchema } from "../../utils/validations";
import { resetPasswordApi } from "../../utils/api/auth";
import { ResetPasswordStyle } from "../../assets/css/authStyle";
import { useSelector } from "react-redux";

const ResetPassword = () => {
  document.title = "Reset Password - Rhinolister";
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlToken = queryParams.get("token");
  const urlEmail = queryParams.get("email");
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const accessToken = useSelector((state)=> state.auth.token);


  const formik = useFormik({
    initialValues: {
      email: urlEmail,
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await resetPasswordApi(values.email, values.password, values.confirmPassword, urlToken, accessToken);
        setValidationErrors({});
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            customClass: {
              confirmButton: 'btn',
            },
          }).then(() => {
            navigate('/');
          });
        } else if (response.status === 422) {
          const validationErrors = response.data.errors;
          setValidationErrors(validationErrors);
        } else if (response.status === 404) {
          setValidationErrors({ "email": "Email not found." });
        }
        else if (response.status === 400) {
          setValidationErrors({ "accessToken": "Invalid access token." });
        }
        else {
          setValidationErrors({ "error": "Internal Server Error." });
        }
      } catch (error) {
        console.error('Submission failed:', error);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <ResetPasswordStyle className="login">
      <Container>
        <Row className="justify-content-center">
          <Col sm="6">
            <div className="login p-5">
              <h3>Reset Password</h3>
              <form onSubmit={formik.handleSubmit}>
                {Object.keys(validationErrors).map((fieldName) => (
                  <p key={fieldName} className="error-message">
                    {validationErrors[fieldName]}
                  </p>
                ))}
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                  <Col sm="12">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email address"
                      value={urlEmail}
                      readOnly
                      isInvalid={formik.touched.email && !!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 pass-ab"
                  controlId="formPlaintextPassword"
                >
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="4">
                      New Password
                    </Form.Label>
                  </Col>
                  <Col sm="12" className="mb-2">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="New Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <i
                      className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                        } password-icon`}
                      onClick={togglePasswordVisibility}
                    ></i>
                    {formik.touched.password && formik.errors.password && (
                      <div className="error-message">{formik.errors.password}</div>
                    )}
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Col sm={12} className="text-start">
                    <Form.Label column sm="6">
                      Confirm New Password
                    </Form.Label>
                  </Col>
                  <Col sm="12" className="mb-2 pass-ab2">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <i
                      className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                        } password-icon`}
                      onClick={toggleConfirmPasswordVisibility}
                    ></i>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                      <div className="error-message">{formik.errors.confirmPassword}</div>
                    )}
                  </Col>
                </Form.Group>

                <Col sm={12} className="text-center">
                  <Button
                    type="submit"
                    className="custom-btn btn-3 mb-2 loader-bt"
                  >
                    <span>Submit</span>{" "}
                    {formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </Button>
                </Col>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </ResetPasswordStyle>
  );
};

export default ResetPassword;