import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import TextEditor from "../../common/TextEditor";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { TailSpin } from "react-loader-spinner";
import { SubscriptionStyle } from "../../../assets/css/adminStyle";
import {
  subscriptionPlans,
  deleteSubscriptionPlans,
  addSubscription_Plan
} from "../../../utils/api/admin";

const Subscription = () => {
  const [pageLoading, setPageLoading] = useState(true);
  const access_token = useSelector((state) => state.auth.token);
  const [maxId, setMaxId] = useState(1);
  const [isFreeSubscriptionAvailable, setIsFreeSubscriptionAvailable] = useState(false);
  const [removeLoadingIndex, setRemoveLoadingIndex] = useState(-1);
  const [saveloadingIndex, setSaveLoadingIndex] = useState(-1);
  const [disableBtn, setDisableBtn] = useState(false);

  const [subscriptionPlan, setSubscriptionPlan] = useState([
    {
      id: 1,
      title: "",
      price: "0",
      subscriptionType: "free",
      type: "free",
      plan_id: "plan_free",
      scans_per_day: 100,
      delay_btw_scans: 15,
      features: [],
      isDisabled: false,
    },
  ]);

  const [errors, setErrors] = useState([
    {
      id: 1,
      title: "",
      price: "",
      subscriptionType: "",
      type: "",
      scans_per_day: "",
      delay_btw_scans: "",
      features: "",
    },
  ]);

  const updateErrors = (index, field, errorMessage) => {
    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index][field] = errorMessage;
      return newErrors;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchSubscriptionData = async () => {
      try {
        const response = await subscriptionPlans();
        if (response.status == 200) {
          const responseData = response.data;
          if (
            Array.isArray(responseData.subscriptionPlans) &&
            responseData.subscriptionPlans.length > 0
          ) {
            const decodedSubscriptionPlans = responseData.subscriptionPlans.map(
              (plan) => ({
                id: plan.id,
                title: plan.title,
                price: plan.price,
                subscriptionType: plan.subscriptionType,
                type: plan.type,
                plan_id: plan.plan_id,
                scans_per_day: plan.scans_per_day,
                delay_btw_scans: plan.delay_btw_scans,
                features: JSON.parse(plan.features),
                isDisabled: true,
              })
            );
            // Check if there is any plan with subscriptionType "free"
            const hasFreeSubscription = decodedSubscriptionPlans.some(
              (plan) => plan.subscriptionType === "free"
            );
            setIsFreeSubscriptionAvailable(hasFreeSubscription);
            // Create an array of error objects based on the subscription plans
            const initialErrors = decodedSubscriptionPlans.map((plan) => ({
              id: plan.id,
              title: "",
              price: "",
              subscriptionType: "",
              type: "",
              scans_per_day: "",
              delay_btw_scans: "",
              features: "",
            }));
            setMaxId(responseData.maxId);
            setSubscriptionPlan(decodedSubscriptionPlans);
            setErrors(initialErrors);
          }
        } else {
          console.error("Error fetching subscription plans");
        }
      } catch (error) {
        console.error("An error occurred", error);
      } finally {
        setPageLoading(false);
      }
    };
    fetchSubscriptionData();
  }, []);

  const addSubscriptionPlan = (e) => {
    e.preventDefault();
    if (subscriptionPlan.length < 6) {
      // const highestId = Math.max(...subscriptionPlan.map((plan) => plan.id));
      const newId = maxId + 1;
      setMaxId(newId);
      setSubscriptionPlan([
        ...subscriptionPlan,
        {
          id: newId,
          title: "",
          price: "0",
          subscriptionType: "",
          type: "free",
          scans_per_day: 100,
          delay_btw_scans: 15,
          features: [],
          isDisabled: false,
        },
      ]);
      setErrors([
        ...errors,
        {
          id: newId,
          title: "",
          price: "",
          subscriptionType: "",
          type: "",
          scans_per_day: "",
          delay_btw_scans: "",
          features: "",
        },
      ]);
    }
  };

  const removeSubscription = async (plan_id, title, index) => {

    const result = await Swal.fire({
      title: "Are you sure you want to delete this subscription?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn", 
        cancelButton: "btn cancel-btn "
      },
    });

    if (result.isConfirmed) {
      setRemoveLoadingIndex(index);
      setDisableBtn(true);

      if (!subscriptionPlan[index]["isDisabled"]) {
        setRemoveLoadingIndex(-1);
        setDisableBtn(false);
        const updatedSubscriptionPlan = subscriptionPlan.filter(
          (_, i) => i !== index
        );
        setSubscriptionPlan(updatedSubscriptionPlan);
        return;
      }

      try {
        const response = await deleteSubscriptionPlans(plan_id, title, access_token);
        if (response.status === 200) {
          setDisableBtn(false);
          setRemoveLoadingIndex(-1);
          const responseData = response.data;
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Plan deleted Successfully",
            customClass: {
              confirmButton: "btn",
            },
          }).then(() => {
            const updatedSubscriptionPlans = responseData.subscriptionPlans.map(
              (plan) => ({
                ...plan,
                isDisabled: true,
              })
            );
            setSubscriptionPlan(updatedSubscriptionPlans);
            setErrors((prevErrors) => {
              const newErrors = [...prevErrors];
              newErrors.splice(index, 1);
              return newErrors;
            });
          });
        } else {
          setDisableBtn(false);
          setRemoveLoadingIndex(-1);
          const errorData = await response.json();
          console.error("Error deleting subscription plan:", errorData.error);
        }
      } catch (error) {
        setDisableBtn(false);
        setRemoveLoadingIndex(-1);
      }
    }
  };

  // Validation function
  const validateInput = (name, value,index=0) => {
    if (name === "price" &&  subscriptionPlan[index]['subscriptionType']!='free') {
      if (value === 0 || !value || value=="0") {
        return "This field is required";
      }
    } else if (name === "title") {
      const val = value.trim();
      if (!val) {
        return "This field is required";
      } else if (!/^[a-zA-Z0-9 ]*$/.test(val)) {
        return "Only alphabets are allowed";
      } else if (val.length > 30) {
        return "Maximum 30 characters allowed";
      }
    }

    return ""; 
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setSubscriptionPlan((prevSubscriptions) => {
      const updatedSubscriptions = [...prevSubscriptions];
      const updatedSubscription = {
        ...updatedSubscriptions[index],
        [name]: value,
      };

      if (name === "subscriptionType") {
        if (value === "free") {
          updatedSubscription.price = "0";
        }
        updateErrors(index, name, "");
        updateErrors(index, 'price', "");
      } else {
        const errorMessage = validateInput(name, value);
        updateErrors(index, name, errorMessage);
      }

      updatedSubscriptions[index] = updatedSubscription;
      return updatedSubscriptions;
    });
  }

  const handleEditorChange = (content, index = 0) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const listItems = doc.querySelectorAll("ul li");
    const listContent = Array.from(listItems).map((li) => li.textContent);
    const hasEmptyContent =listContent.length === 0 || (listContent.length === 1 && listContent[0] === "");
  
    setSubscriptionPlan((prevSubscriptions) => {
      const updatedSubscriptions = [...prevSubscriptions];
      updatedSubscriptions[index].features = listContent;
      return updatedSubscriptions;
    });

    setErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      if (hasEmptyContent) {
        newErrors[index].features = "Features is required";
      } else {
        newErrors[index].features = ""; 
      }
      return newErrors;
    });
  };

  const handleSubmit = async (event, index) => {
    event.preventDefault();

    const updatedSubscription = { ...subscriptionPlan[index] };

      // Check if the price contains a dollar sign and then remove it
      console.log(updatedSubscription,'wwww')
  if (typeof updatedSubscription.price === 'string' && updatedSubscription.price.includes("$")) {
    updatedSubscription.price = updatedSubscription.price.replace("$", "");
  }

    const errorObj = {
      title: validateInput("title", updatedSubscription.title,index),
      price:validateInput("price", updatedSubscription.price,index),
      features: updatedSubscription.features.every((feature) => feature.trim() === "")? "Features is required":"",
      type: !updatedSubscription.type ? "Type is required" : "",
      subscriptionType: !updatedSubscription.subscriptionType? "Subscription Type is required": "",
    };

    const newErrors = [...errors];
    newErrors[index] = { id: newErrors[index].id, ...errorObj };
    setErrors(newErrors);
    
    const hasErrors = Object.values(errorObj).some((value) => value !== "");

    if (!hasErrors) {
      setSaveLoadingIndex(index);
      setDisableBtn(true);
   console.log(updatedSubscription,'checking')
        const response = await addSubscription_Plan(updatedSubscription, access_token);
        console.log(response,'qwertyui')
        if (response.status == 200) {
          setDisableBtn(false);
          setSaveLoadingIndex(-1);
          const responseData = response.data;
          const updatedPlans = [...subscriptionPlan];
          updatedPlans[index] = response.data.subscription;
          updatedPlans[index].isDisabled = true;
          updatedPlans[index].price = String(updatedPlans[index].price);

          const hasFreeSubscription = updatedPlans.some(
            (plan) => plan.subscriptionType === "free"
          );
          setIsFreeSubscriptionAvailable(hasFreeSubscription);
          setSubscriptionPlan(updatedPlans);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: responseData.message,
            customClass: {
              confirmButton: "btn",
            },
          }).then(() => {
            console.log("done");
          });
        } else if (response.status === 422) {
          setDisableBtn(false);
          setSaveLoadingIndex(-1);
          const errorResponse = response.data;
          const validationErrors = errorResponse.error;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: validationErrors,
            customClass: {
              confirmButton: "btn",
            },
          });
        }
  
    }
  };

  if (pageLoading) {
    return (
      <div className="loader-container">
        <TailSpin height={40} width={40} />
      </div>
    );
  }

  return (
    <>
      <SubscriptionStyle>
        {subscriptionPlan.map((subscription, index) => {
          return (
            <Form onSubmit={(e) => handleSubmit(e, index)} key={index}>
              <div key={index} className="subscription-plan-container">
                <div className="profile-sec">
                  <Row>
                    <Col sm={12} className="text-start">
                      <h4>Subscription Plan {index + 1}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor={`heading_${index}`}>
                        Title
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={subscription.title}
                        onChange={(event) => handleChange(event, index)}
                        disabled={subscriptionPlan[index].isDisabled}
                      />
                      {errors[index].title && (
                        <div className="text-danger  error-message">
                          {errors[index].title}
                        </div>
                      )}
                    </Col>
                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor="subHeading">Price</Form.Label>
                      <div className="input-group">
                        <CurrencyInput
                          className="form-control"
                          prefix="$"
                          name="price"
                          decimalsLimit={2}
                          allowNegativeValue={false}
                          defaultValue={0}
                          disabled={
                            subscriptionPlan[index].subscriptionType ==
                              "free" || subscriptionPlan[index].isDisabled
                          }
                          onValueChange={(value) => {
                            if (value == undefined) {
                              handleChange(
                                { target: { name: "price", value: 0 } },
                                index
                              );
                            }
                            if (value <= 1000) {
                              handleChange(
                                { target: { name: "price", value } },
                                index
                              );
                            }
                          }}
                          value={subscription?.price}
                        />
                      </div>
                      {errors[index].price && (
                        <div className="text-danger error-message">
                          {errors[index].price}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor={`subscriptionType_${index}`}>
                        Subscription Type
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="subscriptionType"
                        value={subscription?.subscriptionType}
                        onChange={(event) => handleChange(event, index)}
                        disabled={subscriptionPlan[index].isDisabled}
                      >
                        <option value="">Select subscription type</option>
                        {subscription.subscriptionType == "free" && isFreeSubscriptionAvailable && (
                          <option value="free">Free</option>
                        )}
                        {!isFreeSubscriptionAvailable && (
                          <option value="free">Free</option>
                        )}
                        <option value="day">Daily</option>
                        <option value="month">Monthly</option>
                        <option value="year">Annually</option>
                      </Form.Control>

                      {errors[index].subscriptionType && (
                        <div className="text-danger error-message">
                          {errors[index].subscriptionType}
                        </div>
                      )}
                    </Col>
                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor={`type_${index}`}>
                        Features Get
                      </Form.Label>
                      <Form.Control
                        as="select" // Use "as" prop to render a dropdown select
                        name="type"
                        value={subscription.type}
                        onChange={(event) => handleChange(event, index)}
                      >
                        <option value="free">Free</option>
                        <option value="basic">Basic</option>
                        <option value="advance">Advance</option>
                        <option value="enterprise">Enterprise</option>
                      </Form.Control>
                      {errors[index].type && (
                        <div className="text-danger error-message">
                          {errors[index].type}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor={`scans_per_day_${index}`}>
                        Scans per day
                      </Form.Label>
                      <Form.Control
                        as="select" // Use "as" prop to render a dropdown select
                        name="scans_per_day"
                        value={subscription.scans_per_day}
                        onChange={(event) => handleChange(event, index)}
                      >
                         <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="1000">1000</option>
                        <option value="5000">5000</option>
                        <option value="10000">10000</option>
                        <option value="-1">Unlimited</option>
                      </Form.Control>
                      {errors[index].scans_per_day && (
                        <div className="text-danger error-message">
                          {errors[index].scans_per_day}
                        </div>
                      )}
                    </Col>

                    <Col sm={6} className="mb-3 text-start">
                      <Form.Label htmlFor={`delay_btw_scans_${index}`}>
                        Delay b/w scans
                      </Form.Label>
                      <Form.Control
                        as="select" // Use "as" prop to render a dropdown select
                        name="delay_btw_scans"
                        value={subscription.delay_btw_scans}
                        onChange={(event) => handleChange(event, index)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                      </Form.Control>
                      {errors[index].delay_btw_scans && (
                        <div className="text-danger error-message">
                          {errors[index].delay_btw_scans}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} className="mb-5 text-start">
                      Features
                      <TextEditor
                        subscriptionPlan={subscription}
                        updateErrors={updateErrors}
                        index={index}
                        onChange={(content) =>
                          handleEditorChange(content, index)
                        }
                      />
                    </Col>
                    {errors[index].features && (
                      <div className="text-danger error-message">
                        {errors[index].features}
                      </div>
                    )}
                  </Row>

                  <Row>
                    <Col className="pt-3 save-remove-btn">
                      <Button
                        type="submit"
                        className="custom-btn btn-3"
                        disabled={disableBtn}
                      >
                        <span>Save</span>{" "}
                        {index == saveloadingIndex && (
                          <TailSpin color="#fff" height={15} width={15} />
                        )}
                      </Button>
              
                        <Button
                          type="button"
                          className="custom-btn btn-3 d-flex focus-btn"
                          onClick={() =>
                            removeSubscription(
                              subscription.plan_id,
                              subscription.title,
                              index
                            )
                          }
                          disabled={disableBtn}
                        >
                          <span>Remove Subscription</span>{" "}
                          {index == removeLoadingIndex && (
                            <TailSpin color="#fff" height={15} width={15} />
                          )}
                        </Button>
                
                    </Col>
                  </Row>
                </div>

                <Row>
                  <Col className="pt-3">
                    {index === subscriptionPlan.length - 1 &&
                      subscriptionPlan.length < 6 && (
                        <Button
                          type="button"
                          className="custom-btn btn-3"
                          onClick={(e)=>addSubscriptionPlan(e)}
                        >
                          <span>Add Subscription</span>
                        </Button>
                      )}
                  </Col>
                </Row>
              </div>
            </Form>
          );
        })}
      </SubscriptionStyle>
    </>
  );
};
export default Subscription;
