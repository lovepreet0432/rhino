import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import Content from "../components/subscriptionplan/Content";
import ContactForm from "../components/subscriptionplan/ContactForm";
import { SubscriptionPlanStyle } from "../assets/css/pagesStyle";
import { subscription_Plans } from "../utils/api/subscription";

const SubscriptionPlan = () => {
  document.title = "Subscription - Rhinolister";
  const navigate = useNavigate();
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const userSubscription = useSelector((state) => state.auth.userSubscription);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubscribeClick = (plan) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (userSubscription && Object.keys(userSubscription).length > 0) {
        if (parseFloat(userSubscription.price) > parseFloat(plan.price)) {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "Do you want to downgrade your plan?",
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            customClass: {
              confirmButton: "btn",
              cancelButton: "btn cancel-btn",
            },
          })
            .then((result) => {
              if (result.isConfirmed) {
                navigate("/payment", { state: { subscriptionData: plan } });
              }
            })
            .catch((error) => {
              setLoading(false);
            });
        } else {
          navigate("/payment", { state: { subscriptionData: plan } });
        }
      } else {
        navigate("/payment", { state: { subscriptionData: plan } });
      }
    }
  };

  useEffect(() => {
   
      const fetchSubscriptionPlans = async () => {
        try {
          const response = await subscription_Plans();
          const plansWithParsedFeatures = response.data.subscriptionPlans.map((plan) => ({
            ...plan,
            features: JSON.parse(plan.features),
          }));
    
          setSubscriptionPlans(plansWithParsedFeatures);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
    
      fetchSubscriptionPlans();
    
  }, []);

  return (
    <SubscriptionPlanStyle className="subscription">
      <Content />
      <Container>
        <Row className="justify-content-center">
          <Col sm={12} className="text-start">
              <h2 className="text-center subscription-plan" style={{padding:0}}>
                Subscriptions
              </h2>
              <Row>
              {loading ? (  
                  <Col sm="12">
                    <div className="loader-contain">
                      <TailSpin height={40} width={40} />
                    </div>
                  </Col>
              ) : (
                subscriptionPlans.map((plan) => {
                  return (
                    <Col
                      key={plan.plan_id}
                      sm={12}
                      lg={3}
                      className="mb-4 mb-md-0 mt-4"
                    >
                      <div
                        className={`plan ${
                          userSubscription &&
                          Object.keys(userSubscription).length > 0 &&
                          userSubscription.plan_id == plan.plan_id
                            ? "current-plan"
                            : ""
                        }`}
                      >
                        <h3>{plan.title}</h3>
                        <div className="price-row">
                          <h2>$ {plan.price}</h2>
                          {plan?.subscriptionType === "free" ? (
                            ""
                          ) : (
                            <p>/ {plan?.subscriptionType}</p>
                          )}
                        </div>
                        <div className="t-price">
                          <div className="del-text">
                            <ul>
                              {plan.features.map((feature, index) => (
                                <li key={index}>
                                  <span>
                                    <FaCheck />
                                  </span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            className="custom-btn btn-3"
                            onClick={() => handleSubscribeClick(plan)}
                            disabled={
                              userSubscription &&
                              userSubscription.plan_id === plan.plan_id
                            }
                          >
                            <span>
                              {userSubscription &&
                              Object.keys(userSubscription).length > 0 &&
                              userSubscription.plan_id == plan.plan_id
                                ? "Subscribed"
                                : "Subscribe"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </Col>
                  )
                })
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      <ContactForm />
    </SubscriptionPlanStyle>
  );
};

export default SubscriptionPlan;