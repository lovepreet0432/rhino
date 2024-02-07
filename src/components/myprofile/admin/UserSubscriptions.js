import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { UserSubscriptionsStyle } from '../../../assets/css/adminStyle';
import { user_subscription } from "../../../utils/api/admin";
import { useSelector } from "react-redux";
import {formatStringDate} from '../../../utils/common';

const UserSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  const [usersubscriptions, setUserSubscriptions] = useState({});
  const access_token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
 
    setLoading(true);
    async function fetchSubscriptionData() {
      try {
        const response = await user_subscription(access_token);
        if (response.status == 200) {
          setLoading(false);
          setUserSubscriptions(response.data.userSubscriptions);
        } else {
          setLoading(false);
          console.error("Error fetching subscription plans");
        }
      } catch (error) {
        setLoading(false);
        console.error("An error occurred", error);
      }
    }
    fetchSubscriptionData();
  }, []);



  if (loading) {
    return (
      <div className="loader-container">
        <TailSpin height={50} width={50} />
      </div>
    );
  }

  if (usersubscriptions.length === 0) {
    return (
      <div className="loader-container">
        <h3>No data found</h3>
      </div>
    );
  }

  function renderSubscriptionTable(key, usersubscriptions) {
    return (
      
      <UserSubscriptionsStyle key={key} className='profile-sec'> 
        <h4>{key} Plan</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th>Expires</th>
            </tr>
          </thead>
          <tbody>
            {usersubscriptions.map((user) => (
              <tr key={user?.user_id}>
                <td>{user?.user?.name}</td>
                <td>{user?.user?.email}</td>
                <td>{formatStringDate(user?.created_at)}</td>
                <td>{key !='Free' ?formatStringDate(user?.expires_at):'-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </UserSubscriptionsStyle>
    );
  }

  return (
    <Row>
      <Col sm={12} className="text-start">
        {Object.keys(usersubscriptions).map((key) =>
          renderSubscriptionTable(key, usersubscriptions[key])
        )}
      </Col>
    </Row>
  )
}

export default UserSubscriptions