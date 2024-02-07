import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Col, Row } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { formatDate } from "../../utils/common";
import { filterScanByDate, scanProductNonLogin, scanProduct, checkUserCanScan, scanHistoryData } from "../../utils/api/scan";
import { BarcodeScanPageStyle } from "../../assets/css/scanStyle";


function BarcodeScanPage() {
  document.title = "Scan - Rhinolister";
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [useCamera, setUseCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCurrentDateData, setLoadingCurrentDateData] = useState(false);

  const [filterLoading, setFilterLoading] = useState(false);
  const [filterDate, setFilterDate] = useState();
  const [error, setError] = useState("");
  const [errorCamera, setErrorCamera] = useState("");
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userSubscription = useSelector(state => state.auth.userSubscription);
  const [showUpgradeLink, setShowUpgradeLink] = useState(true);
  const [showRegisterLink, setShowRegisterLink] = useState(false);
  let isScanningEnabled = true;
  const currentDate = new Date();
  const accessToken = useSelector((state)=> state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
 
    if (user) {
      setLoadingCurrentDateData(true);
      const fetchData = async () => {
        try {
          const response = await filterScanByDate(formatDate(currentDate),formatDate(currentDate), user.id, accessToken);
          if (response.status === 200) {
            setLoadingCurrentDateData(false);
            const responseData = response.data.data;
            if (responseData.length !== 0) {
              navigate('/scandetail');
            }
          }
        } catch (error) {
          setLoadingCurrentDateData(false);
          console.error('Error:', error);
        }
      }
      fetchData();
    }
  }, []);

  const handleNonAuthenticatedUser = async (barcodeNumber, type = "number") => {
    try {
      const result = await scanProductNonLogin();

      if (result.data.status === 403) {
        setLoading(false);
        setShowRegisterLink(true);
        setShowUpgradeLink(false);
        setBarcodeNumber('');
        if (type == 'number') {
          setError('60 Second Wait for Unregistered Users ');
        } else {
          setErrorCamera("60 Second Wait for Unregistered Users ");
        }
      } else {
        const mainApiResponse = await scanProduct(barcodeNumber, null);
        if (!mainApiResponse.data || Object.keys(mainApiResponse.data).length === 0) {
          setLoading(false);
          setShowUpgradeLink(false);
          setBarcodeNumber('');
          if (type == 'number') {
            setError('No data found');
          } else {
            setErrorCamera("No data found");
          }
        } else {
          setBarcodeNumber('');
          navigate(`/scandetail/${barcodeNumber}`, {
            state: { scanData: mainApiResponse.data, scanBy: type },
          });
        }
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };


  const scanHandlerCamera = async (barcode) => {

    if (barcode === "") {
      setErrorCamera("Please Enter Barcode Number");
      isScanningEnabled = true;
      return;
    }

    try {
      if (!isAuthenticated) {
        await handleNonAuthenticatedUser(barcode, "camera");
      } else {
        // Check if the user can scan or not based on subscription
        const countForTodayResponse = await checkUserCanScan(user.id, userSubscription.plan_id);
        if (!countForTodayResponse.data.success) {
          setErrorCamera(countForTodayResponse.data.error);
          isScanningEnabled = true;
          return;
        }

        //  Make the main API call
        const mainApiResponse = await scanProduct(barcode, userSubscription.plan_id);
        if (
          !mainApiResponse.data ||
          Object.keys(mainApiResponse.data).length === 0
        ) {
          setShowUpgradeLink(false);
          isScanningEnabled = true;
          setErrorCamera("No data found");
          return;
        }
        else {
          setErrorCamera("");
          const scanHistoryResponse = await scanHistoryData(mainApiResponse,user.id, accessToken);
          if (scanHistoryResponse.status == 201) {
            navigate(`/scandetail/${barcode}`, {
              state: { scanData: mainApiResponse.data, scanBy: 'camera' },
            });
          }
        }
      }
    } catch (error) {
      setErrorCamera("An error occurred. Please try again later.");
    }
  }

  const handleDateChange = (date) => {
    setFilterDate(date);
    setFilterLoading(true);
    setTimeout(() => {
      navigate(`/scandetail`, {
        state: { filterDate: date },
      });
    }, 2000);
  }

  const scanHandler = async (e) => {
    e.preventDefault();
    if (barcodeNumber === "") {
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
        if (userSubscription == null) {
          setLoading(false);
          setBarcodeNumber('');
          setError('Please purchase subscription plan to proceed further');
          return;
        }
        // Check if the user can scan or not based on subscription

        const countForTodayResponse = await checkUserCanScan(user.id, userSubscription.plan_id);
        if (!countForTodayResponse.data.success) {
          setLoading(false);
          setBarcodeNumber('');
          setError(countForTodayResponse.data.error);
          return;
        }

        //  Make the main API call
        const mainApiResponse = await scanProduct(barcodeNumber, userSubscription.plan_id);

        if (
          !mainApiResponse.data ||
          Object.keys(mainApiResponse.data).length === 0
        ) {
          setLoading(false);
          setShowUpgradeLink(false);
          setBarcodeNumber('');
          setError("No data found");
          return;
        } else {
      
          const scanHistoryResponse = await scanHistoryData(mainApiResponse,user.id, accessToken);
          if (scanHistoryResponse.status == 201) {
            setBarcodeNumber('');
            navigate(`/scandetail/${barcodeNumber}`, {
              state: { scanData: mainApiResponse.data, scanBy: 'number' },
            });
          } else {
            setBarcodeNumber('');
          }
        }
      }
    } catch (error) {
      setLoading(false);
      setBarcodeNumber('');
      setError("An error occurred. Please try again later.");
    }
  };

  const useCameraHandler = () => {
    // if (userSubscription == null || Object.keys(userSubscription).length === 0 || userSubscription.plan_type == 'free') {
    //   setErrorCamera('Please purchase paid subscription plan to use camera');
    //   return;
    // }
    setUseCamera(!useCamera);
  }

  return (
    <>
      <BarcodeScanPageStyle className="scan">
        {loadingCurrentDateData ? 
        <div className="loading-scan">
          <div className="loader-container">
            <TailSpin height={80} width={80} />
          </div> 
        </div> : ''}

        <div className="container">
          <Row className="align-items-center scan-main3s">
            <Col md={8} lg={6} className="text-center">
              <div className="scan0-row">
                <h2 className="">Scan Barcode</h2>
                {isAuthenticated && 
                <>
                  <div className="date-picker">
                    <h3>Filter History by Date   {filterLoading && (
                      <TailSpin color="#E99714" height={18} width={18} />
                    )}</h3>
                    <DatePicker
                      selected={filterDate}
                      onChange={handleDateChange}
                      placeholderText="Select Date" className="form-control"
                    />
                  
                  </div>
                  <div className="or-line"><span>or</span></div>
                </>
                }
                <form className="scan-input-form" onSubmit={scanHandler}>
                  <div className="scan-input">
                    <input
                      type="text"
                      className="form-control"
                      value={barcodeNumber}
                      placeholder="Enter your UPC/ASIN"
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
                  </div>

                  <button
                    className="custom-btn btn-3 d-flex align-items-center"
                    type="submit"
                    disabled={loading}
                  >
                    <span style={{ marginRight: loading ? '5px' : '0' }}>Scan Detail</span>{" "}
                    {loading && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </div>
        <button className="use-camera-btn" onClick={useCameraHandler}>{useCamera ? 'Turn Off Camera (Beta)' : 'Use Camera (Beta)'}</button>
        {useCamera && <Container>
          <Row className="justify-content-center">
            <Col sm={6}>
              <p style={{ margin: 0 }}>Hold the camera to the Barcode</p>
              <BarcodeScannerComponent
                height={380}
                onUpdate={(err, result) => {
                  if (isScanningEnabled && result) {
                    const scannedText = result.text;
                    const cleanedText = scannedText.slice(1);
                    scanHandlerCamera(cleanedText);
                    isScanningEnabled = false;
                  }
                }}
              />
              <h3 className="text-center">Scanning...</h3>
            </Col>
          </Row>
        </Container>}
        {errorCamera && <p className="text-center error-message">{errorCamera} {' '}
          {showUpgradeLink && <Link to='/subscription' className="error-message" style={{ textDecoration: "underline" }}>
            Upgrade Subscription
          </Link>}</p>}
      </BarcodeScanPageStyle>
    </>
  );
}

export default BarcodeScanPage;