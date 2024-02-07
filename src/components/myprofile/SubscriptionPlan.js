import React, { useState,useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import { setUserSubscription } from "../../redux/slices/authSlice";
import { cancelPlan } from "../../utils/api/subscription";
import { formatStringDate } from "../../utils/common";
import { SubscriptionPlanStyle } from "../../assets/css/myProfileStyle";

const SubscriptionPlan = () => {
  const [loading, setLoading] = useState(false);
  const [validationError,setValidationError]=useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userSubscription = useSelector((state) => state.auth.userSubscription);
  const accessToken = useSelector((state)=> state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cancelHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "Are you sure you want to cancel subscription ?",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "btn",
        cancelButton: "btn cancel-btn"
      },
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          setValidationError('');
            const response = await cancelPlan(user.id, accessToken);
            if (response.status == 200) {
              setLoading(false);
              dispatch(setUserSubscription(response.data.subscription));
            } else {
              setLoading(false);
              setValidationError('Failed to cancel subscription.');
            }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <SubscriptionPlanStyle>
      <div className="profile-sec">
        <Row>
          <Col sm={12} className="text-end mb-3">
            <Link to="/subscription" className="custom-btn ex-btn btn-3">
              Upgrade Subscription
            </Link>
          </Col>
        </Row>

        <div className="bass-row">
          {!userSubscription && <p>No subscription yet</p>}
          {userSubscription && <>
            <Row>
              <Col sm={12}>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>Title</strong>
                        </th>

                        <th>
                          <strong>Price</strong>
                        </th>

                        <th>
                          <strong>Created At</strong>
                        </th>

                        <th>
                          <strong>Expires At</strong>
                        </th>

                        <th>
                          <strong>Status</strong>
                        </th>

                      </tr>
                    </thead>
                    <tbody key={userSubscription.id}>
                      <tr>
                        <td>
                          {userSubscription.title}
                        </td>
                        <td>
                          $ {userSubscription.price}
                        </td>
                        <td>
                          {formatStringDate(userSubscription.created_at)}
                        </td>
                        <td>
                          {userSubscription.expires_at ? formatStringDate(userSubscription.expires_at) : '-'}
                        </td>
                        <td>
                          {userSubscription.status === "cancelled" ?
                            <span>Cancelled</span> : <span>Active</span>
                          }
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </>
          }

          {userSubscription && <>
            <div className="error-message">{validationError}</div>
              <Row>
                <Col className="text-end">
                  {userSubscription.status === "active" && 
                    <Button onClick={() => cancelHandler(userSubscription.subscription_id)} className="btn">
                      <div className="deactivate-load"> <span>Deactivate</span>{" "}
                        {loading && (
                          <TailSpin color="#fff" height={20} width={20} />
                        )}
                      </div>
                    </Button>
                  }
                </Col>
              </Row>
          </>
          }
        </div>
      </div>
    </SubscriptionPlanStyle>
  );
};

export default SubscriptionPlan;