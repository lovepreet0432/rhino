import React,{useState,useEffect} from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import emailIcon from "../../assets/images/email.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { forgotPasswordApi } from "../../utils/api/auth";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../utils/validations";
import { ForgotPasswordStyle } from "../../assets/css/authStyle";

const ForgotPassword = () => {
    document.title = "Forgot Password - Rhinolister";
    const [validationErrors, setValidationErrors] = useState({});
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: async (values) => {
        try {
          setValidationErrors({});
          const response = await forgotPasswordApi(values.email);
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: response.data.message,
              customClass: {
                confirmButton: "btn",
              },
            }).then(() => {
              navigate("/login");
            });
          } else if (response.status === 422) {
            setValidationErrors(response.data.errors);
          }
           else if (response.status === 404) {
            formik.setFieldError("email", response.data.message);
          }else
          {
            formik.setFieldError("server", "Internal Server Error");
          }
        } catch (error) {
          console.error("Error:", error);
        } 
      },
    });
  
    return (
      <ForgotPasswordStyle className="login">
        <Container>
          <Row className="justify-content-center">
            <Col sm="6">
              <div className="login p-md-5">
                <h3>Forgot Password</h3>
                <form onSubmit={formik.handleSubmit}>
                {Object.keys(validationErrors).map((fieldName) => (
                  <p key={fieldName} className="error-message">
                    {validationErrors[fieldName]}
                  </p>
                ))}
                  <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                    <Col sm="12">
                      <div className="position-relative">
                        <Form.Control
                          type="text"
                          placeholder="Email address"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span className="email icon"><img src={emailIcon} alt="Email Icon" /></span>
                      </div>
                      {formik.touched.email && formik.errors.email && (
                        <p className="text-start error-message">{formik.errors.email}</p>
                      )}
                    </Col>
                  </Form.Group>
                  <Col sm={12} className="text-center">
                    <Button type="submit" className="custom-btn btn-3 mb-2" disabled={formik.isSubmitting}>
                      <span className="d-flex align-items-center">Submit</span>{" "}
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
      </ForgotPasswordStyle>
    );
  };
  

export default ForgotPassword;
