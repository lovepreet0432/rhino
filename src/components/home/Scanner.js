import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScannerStyle } from "../../assets/css/homeStyle.js";
import { scanProductNonLogin, scanProduct, checkUserCanScan, scanHistoryData } from "../../utils/api/scan.js";

const Scanner = ({content}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const [showUpgradeLink, setShowUpgradeLink] = useState(true);
  const [showRegisterLink, setShowRegisterLink] = useState(false);
  const user = useSelector(state => state.auth.user);
  const userSubscription = useSelector(state => state.auth.userSubscription);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state)=> state.auth.token);

  const handleNonAuthenticatedUser = async (barcodeNumber) => {
    const response = await scanProductNonLogin();
   
    if (response.status === 201) {
      const mainApiResponse = await scanProduct(barcodeNumber, null);
      if (mainApiResponse.status == 200) {
        if (!mainApiResponse.data || Object.keys(mainApiResponse.data).length === 0) {
          setBarcodeNumber('');
          setShowRegisterLink(false);
          setShowUpgradeLink(false);
          setError("No data found");
          return;
        } else {
          setError('');
          navigate(`/scandetail/${barcodeNumber}`, {
            state: { scanData: mainApiResponse.data, scanBy: 'number' },
          });
        }
      } else {
        setBarcodeNumber('');
        setShowRegisterLink(false);
        setShowUpgradeLink(false);
        setError("Internal Server Error");
      }
    } else if (response.status == 403) {
      setBarcodeNumber('');
      setShowRegisterLink(true);
      setShowUpgradeLink(false);
      setError(response.data.message);
      return;
    } else {
      setBarcodeNumber('');
      setShowRegisterLink(true);
      setShowUpgradeLink(false);
      setError('Internal Server Error');
      return;
    }
  };

  const cameraHandler = (e) => {
    e.preventDefault();
    // if (userSubscription == null ||Object.keys(userSubscription).length === 0|| userSubscription.plan_type == 'free') {
    //   setError('Please purchase paid subscription plan to use camera');
    //   return;
    // }
    navigate('/scan');
  }


  const scanHandler = async (e) => {
    e.preventDefault();

    if (barcodeNumber === "") {
      setShowRegisterLink(false);
      setShowUpgradeLink(false);
      setError("Please Enter Barcode Number");
      return;
    }

    try {
      setLoading(true);
      if (!isAuthenticated) {
        await handleNonAuthenticatedUser(barcodeNumber);
      }
      else {
        if (!userSubscription) {
        setShowUpgradeLink(true);
          setError('Please purchase subscription plan to proceed further');
          return;
        }
        // Check if the user can scan or not based on subscription
        const countForTodayResponse = await checkUserCanScan(user.id, userSubscription.plan_id);
        if (countForTodayResponse.data.success) {
          const mainApiResponse = await scanProduct(barcodeNumber, userSubscription.plan_id);
          if (
            !mainApiResponse.data ||
            Object.keys(mainApiResponse.data).length === 0
          ) {         
            setShowUpgradeLink(false);
            setError("No data found");
            return;
          } else {
            const scanHistoryResponse = await scanHistoryData(mainApiResponse, user.id, accessToken);
            if (scanHistoryResponse.status == 201) {
              navigate(`/scandetail/${barcodeNumber}`, {
                state: { scanData: mainApiResponse.data, scanBy: 'number' },
              });
            } else {
              console.log(scanHistoryResponse);
            }
          }
        } else {
          setError(countForTodayResponse.data.error);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScannerStyle className="cam-row" data-aos="fade-up" data-aos-duration="1000" >
        <Container>
          <Row className="align-items-center">
            <Col md={6} lg={7} className="text-start">
              <h2 className="mb-2">Scan Product</h2>
              <p className="leftcontent">
               {content}{" "}
              </p>
            </Col>
            <Col md={6} lg={5} className="text-center">
              <div className="upc">
                <h2>Try Me</h2>
                <p className="padd-0">
                    Enter your UPC/ASIN or <button className="use-camera" onClick={cameraHandler} >Use Camera (Beta)</button>
                </p>
                <form onSubmit={scanHandler}>
                  <input
                    type="text"
                    className="form-control"
                    value={barcodeNumber}
                    onChange={(event) => {
                      setBarcodeNumber(event.target.value);
                      setError("");
                    }}
                  />
                   {error &&
                            <>
                                <span className="error-message mb-3">{error} {' '}
                                  {showUpgradeLink && <Link to='/subscription' className="error-message" style={{ textDecoration: "underline" }}>
                                    Upgrade Subscription
                                  </Link>}
                                  {showRegisterLink && <Link to='/registration' className="error-message" style={{ textDecoration: "underline" }}>
                                    Register for free here
                                  </Link>}
                                </span>
                            </>
                   }
                  <button
                    className="custom-btn btn-3 d-flex align-items-center"
                    disabled={loading}
                  >
                    <span style={{ marginRight: "8px" }}>Scan Detail </span>{" "}
                    {loading && (
                      <TailSpin color="#fff" height={20} width={20} />
                    )}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </ScannerStyle>
    </>
  );
};

export default Scanner;
