import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Col, Container, Row,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../redux/slices/accountSlice";
import Table from 'react-bootstrap/Table';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setUserSubscription } from "../redux/slices/authSlice";
import countries from 'countries-list';
import { setUser,setUserProfile } from "../redux/slices/authSlice";
import { useFormik } from "formik";
import { TailSpin } from "react-loader-spinner";
import { PaymentProfileApi } from "../utils/api/auth";
import { PaymentValidationSchema } from "../utils/validations";
import CountryDropdown from "../components/common/CountryDropdown";
import StatesDropdown from "../components/common/StatesDropdown";
import { buyFreePlan, buyPlan } from "../utils/api/subscription";
import { PaymentStyle } from "../assets/css/pagesStyle";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [validationError,setValidationError]=useState('');
  const userProfile = useSelector((state) => state.auth.userProfile);
  
  const accessToken = useSelector((state)=> state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [validationErrors, setValidationErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state ? location.state.subscriptionData : null;

  const formik = useFormik({
    initialValues: {
      street: userProfile.street_one,
      city: userProfile.city,
      zipcode: userProfile.zipcode,
      state: userProfile.state || '',
      country: userProfile.country || 'US'
    },
    validationSchema: PaymentValidationSchema,
    onSubmit: async (values) => {
      setValidationErrors({});
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("full_name", user.name);
      formData.append("street_one", values.street);
      formData.append("city", values.city);
      formData.append("zipcode", values.zipcode);
      formData.append("state", values.state);
      formData.append("country", values.country);


      const response = await PaymentProfileApi(formData, accessToken);
      if (response.status === 201) {
        const userProfileData = response.data.userProfile;
        dispatch(setUserProfile(userProfileData));

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User Updated Successfully.",
          customClass: {
            confirmButton: "btn",
          },
        });
      } else if (response.status === 422) {
        const validationErrors = response.data.errors;
        setValidationErrors(validationErrors);
      }else
      {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
          customClass: {
            confirmButton: "btn",
          },
        });
      }
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
  }, [])

  useEffect(() => {
    if (location.state === null) {
      navigate('/');
    }
  }, [userProfile]);

  const buyFreePlanHandler = async (e) => {
    e.preventDefault();

    // If any field is invalid, prevent form submission
    if (!user.id) {
      return;
    }

    setProcessing(true);
    setValidationError('');
    const response = await buyFreePlan(user.id, accessToken);

    setProcessing(false);
    if (response.status === 200) {
      dispatch(setUserSubscription(response.data.subscription));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        customClass: {
          confirmButton: "btn",
        },
      }).then(() => {
        navigate("/myprofile/subscription");
      }).catch((error) => {
        console.log(error);
      });
    }else if(response.status === 422){
      setValidationError(response.data.error);
    }else if(response.status === 400){
      setValidationError("An error occurred during subscription creation.");
    } else {
      setValidationError("Failed to create subscription.");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const { token, error } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      setProcessing(false);
    } else {
      setValidationError('');
      const response = await buyPlan({
        userProfile: userProfile,
        user: user,
        token:token.id,
        planId: planData.plan_id
      }, accessToken);
      setProcessing(false);
      if (response.status === 200) {
        dispatch(setUserSubscription(response.data.subscription));
        dispatch(setOption(response.data.accountSetting));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Congratulations your plan has been created!!",
          customClass: {
            confirmButton: "btn",
          },
        }).then(() => {
          navigate("/myprofile/subscription");
        }).catch((error) => {
          console.log(error);
        });
      }else if(response.status === 422){
        setValidationError(response.data.error);
      }else if(response.status === 400){
        setValidationError(response.data.error);
      }else {
        setProcessing(false);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.error || "An error occurred during subscription creation.",
          customClass: {
            confirmButton: "btn",
          },
        });
      }
    }
  }

  return (
    <PaymentStyle className="payment-sec" >
      <Container>
        <Row>
          <Col sm={12} className="text-center">
            <h2>Checkout</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm={planData && planData.plan_id != 'plan_free' ? 10 : 6}>
            <Row>
              <div className="payment-row">
                <Row>
                  <Col sm={6} className="text-start">
                    {planData && planData.plan_id != 'plan_free' && <>

                      <div className="persanl">
                        <h2>Personal Details</h2>
                           <form onSubmit={formik.handleSubmit}>
                            <Table striped>
                              <tbody>
                                <tr>
                                  <td><strong>Full Name</strong></td>
                                  <td>{user.name}
                                  </td>

                                </tr>
                                <tr>
                                  <td><strong>Email</strong></td>
                                  <td>{user.email}</td>
                                </tr>
                                <tr>
                                  <td><strong>Street</strong></td>
                                  <td>
                                    <Form.Control
                                      type="text"
                                      name="street"
                                      value={formik.values.street}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                    {formik.errors.street && formik.touched.street && (
                                      <div className="error-message">{formik.errors.street}</div>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>City</strong></td>
                                  <td>
                                  <Form.Control
                                    type="text"
                                    name="city"
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                    {formik.errors.city && formik.touched.city && (
                                      <div className="error-message">{formik.errors.city}</div>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Zip</strong></td>
                                  <td>
                                  <Form.Control
                                    type="text"
                                    name="zipcode"
                                    value={formik.values.zipcode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                     {formik.errors.zipcode && formik.touched.zipcode && (
                                      <div className="error-message">{formik.errors.zipcode}</div>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>State</strong></td>
                                  <td>
                                  <StatesDropdown
                                    selectedState={formik.values.state}
                                    selectedCountry={formik.values.country}
                                    onBlur={formik.handleBlur}
                                    onChange={(stateValue) => {
                                      formik.setFieldValue('state', stateValue);
                                      formik.setFieldTouched('state', true, false);
                                    }}
                                  />
                                      {formik.errors.state && (
                                        <div className="error-message">{formik.errors.state}</div>
                                      )}
                                  </td>
                                </tr>
                                <tr>
                                  <td><strong>Country</strong></td>
                                  <td>
                                    <CountryDropdown
                                      selectedCountry={formik.values.country}
                                      onChange={(value) => {
                                        formik.setFieldValue('state', '')
                                        formik.setFieldValue('country', value)
                                      }}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                            <div>
                              {Object.keys(validationErrors).length > 0 && (
                                    <div >
                                      {Object.values(validationErrors).map((error, index) => (
                                        <p key={index} className="error-message">{error}</p>
                                      ))}
                                    </div>
                              )}
                            </div>
                            <div className="payment-profile-btn">
                              <button className="custom-btn btn-3 " disabled={formik.isSubmitting}>
                                <span style={{ marginRight: formik.isSubmitting ? '5px' : '0' }}> Save </span>{" "}
                                {formik.isSubmitting && (
                                  <TailSpin color="#fff" height={20} width={20} />
                                )}
                              </button>
                            </div>
                          </form>
                      </div>

                    </>}
                  </Col>
                  <Col sm={planData && planData.plan_id != 'plan_free' ? 6 : 12} className="text-start">
                    <div className="persanl absyello">
                      {planData && (
                        <React.Fragment>
                          <h2>{planData.title}</h2>
                          <ul>
                            {planData.features.map((feature, index) => (
                              <li key={index}>
                                <span>
                                  <FaCheck />
                                </span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          {planData && planData.plan_id &&
                            <div className="subtotalrow">
                              <div className="subtotal total">
                                <strong> Total</strong>
                              </div>
                              <div className="subtotal">${planData.price}</div>
                            </div>
                          }
                        </React.Fragment>
                      )}
                      {planData && planData.plan_id != 'plan_free' ? <>
                        <h2>Payment Details</h2>
                        <form onSubmit={handleSubmit}>
                          <div className="btn-row">
                            <CardElement options={{ hidePostalCode: true }} />

                            <button type="submit" className="btn" disabled={!stripe || processing}>
                              {processing ? 'Processing...' : 'Pay'}
                            </button>
                          </div>
                          {validationError && <div className="error-message">{validationError}</div>}
                        </form>
                      </> : <><div className="free-btn"><button type="button" onClick={buyFreePlanHandler} className="btn" >
                        {processing ? 'Processing...' : 'Buy Free Plan'}
                      </button></div>
                          {validationError && <div className="error-message">{validationError}</div>}
                          </>
                      }

                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </PaymentStyle>

  );
};

export default Payment;