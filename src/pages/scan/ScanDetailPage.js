import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { exportCSV } from "../../utils/common";
import ManuallyEnterItem from "./ManuallyEnterItem";
import ExportItems from "./ExportItems";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultScanImage from "../../assets/images/defaultScanImage.jpg";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import 'react-datepicker/dist/react-datepicker.css';
import { filterScanByDate, scanProductNonLogin, scanProduct, checkUserCanScan, scanHistoryData } from "../../utils/api/scan";
import { formatDateInNumber } from "../../utils/common";
import { formatDate } from "../../utils/common";
import { ScanHistoryRecords } from "./ScanHistoryRecords";
import { ScanDetailPageStyle } from "../../assets/css/scanStyle";
import { getFeatures } from "../../utils/api/scan";

const ScanDetailPage = () => {
  document.title = "Scan Detail - Rhinolister";
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  let scanData = location.state?.scanData || {};
  const scanBy = location.state?.scanBy || 'number';
  const { id } = useParams();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [showScanDetail, setShowScanDetail] = useState(true);
  const [planFeatures, setplanFeatures] = useState({});
  const [useCamera, setUseCamera] = useState(false);
  const [freeError, setFreeError] = useState('');
  const [disableNewBatch, setDisableNewBatch] = useState(true);
  const userSubscription = useSelector(state => state.auth.userSubscription);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [scanHistory, setScanHistory] = useState([]);
  const [showManuallyPopup, setShowManuallyPopup] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [barcodeNumber, setBarcodeNumber] = useState("");
  const [error, setError] = useState("");
  const [errorCamera, setErrorCamera] = useState("");
  const [showUpgradeLink, setShowUpgradeLink] = useState(true);
  const [showRegisterLink, setShowRegisterLink] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [loadData, setLoadData] = useState({});
  const [keys, setKeys] = useState([]);
  const [batchNumber, setBatchNumber] = useState(1);
  const [paginationKey, setPaginationKey] = useState(10);
  const currentDate = new Date();
  let isScanningEnabled = true;
  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const newFilterDate = location.state?.filterDate || new Date();
    setStartDate(newFilterDate);
  }, [location.state]);

  useEffect(() => {
    const get_Features = async () => {
      if (id == undefined) {
        setShowScanDetail(false);
        if (userSubscription?.plan_id) {
          const response = await getFeatures(userSubscription.plan_id);
          if (response.status == 200) {
            setplanFeatures(response.data);
          }
        }
      } else {
        setShowScanDetail(true);
      }
    }
    get_Features();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (user) {
        try {
          const response = await filterScanByDate(formatDate(startDate), formatDate(currentDate), user.id, accessToken);
          if (response.status === 200) {
            const groupedScanHistory = response.data.data;
            if (groupedScanHistory.length != 0) {
              if ("0" in groupedScanHistory) {
                setDisableNewBatch(false);
              }
              const formattedDate = formatDateInNumber(startDate);
              const firstKey = Object.keys(groupedScanHistory)[0];
              const keysWithFormattedDate = Object.keys(groupedScanHistory).map(key => formattedDate + key);
              setLoadData(groupedScanHistory);
              setKeys(keysWithFormattedDate);
              setBatchNumber(keysWithFormattedDate[0]);
              setPaginationKey((prevKey) => prevKey - 1);
              setScanHistory(groupedScanHistory[firstKey]);
            }
            else {
              setKeys([]);
              setScanHistory([]);
            }
          }
          else {
            setError(response.data.message);
            setShowUpgradeLink(false);
            setTimeout(() => {
              setError('');
              setShowUpgradeLink(true);
            }, 3000);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }

    fetchData();
  }, [user, startDate]);

  const exportfree = () => {
    setFreeError("Upgrade your plan for Export");
  };

  const useCameraHandler = () => {
    setErrorCamera('');
    setUseCamera(!useCamera);
  }

  const handleNonAuthenticatedUser = async (barcodeNumber, type = "number") => {
    const response = await scanProductNonLogin();
    if (response.status === 201) {
      const mainApiResponse = await scanProduct(barcodeNumber, null);
      if (mainApiResponse.status == 200) {
        const mainApiResponse = await scanProduct(barcodeNumber, null);
        if (!mainApiResponse.data || Object.keys(mainApiResponse.data).length === 0) {
          setLoading(false);
          setShowRegisterLink(false);
          setShowUpgradeLink(false);
          setBarcodeNumber('');
          if (type == 'number') {
            setError('No data found');
          } else {
            setErrorCamera("No data found");
          }
          return;
        } else {
          setLoading(false);
          setError('');
          if (type == 'camera') {
            setErrorCamera("");
          }
          setBarcodeNumber('');
          setUseCamera(false);
          navigate(`/scandetail/${barcodeNumber}`, {
            state: { scanData: mainApiResponse.data, scanBy: type },
          });
        }
      } else {
        setLoading(false);
        setShowRegisterLink(false);
        setShowUpgradeLink(false);
        setBarcodeNumber('');
        if (type == 'number') {
          setError('Internal Server Error');
        } else {
          setErrorCamera("Internal Server Error");
        }
        return;
      }
    } else if (response.status == 403) {
      setLoading(false);
      setShowRegisterLink(true);
      setShowUpgradeLink(false);
      setBarcodeNumber('');
      if (type == 'number') {
        setError('60 Second Wait for Unregistered Users ');
      } else {
        setErrorCamera("60 Second Wait for Unregistered Users ");
      }
      return;
    } else {
      setLoading(false);
      setShowRegisterLink(false);
      setShowUpgradeLink(false);
      setBarcodeNumber('');
      if (type == 'number') {
        setError('Internal Server Error');
      } else {
        setErrorCamera("Internal Server Error");
      }
      return;
    }
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
        setLoading(true);
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
        }
        else {
          const response = await scanHistoryData(mainApiResponse , user.id, accessToken);
          if (response.status == 201) {
            setLoading(false);
            setStartDate(new Date());
            setShowScanDetail(true);
            const groupedScanHistory = response.data.data;
            if (groupedScanHistory.length != 0) {
              if ("0" in groupedScanHistory) {
                setDisableNewBatch(false);
              }
              const formattedDate = formatDateInNumber(new Date());
              const firstKey = Object.keys(groupedScanHistory)[0];
              const keysWithFormattedDate = Object.keys(groupedScanHistory).map(key => formattedDate + key);
              setLoadData(groupedScanHistory);
              setKeys(keysWithFormattedDate);
              setBatchNumber(keysWithFormattedDate[0]);
              setPaginationKey((prevKey) => prevKey - 1);
              setScanHistory(groupedScanHistory[firstKey]);
            }
            else {
              setScanHistory([]);
            }

            setBarcodeNumber('');
            navigate(`/scandetail/${barcodeNumber}`, {
              state: { scanData: mainApiResponse.data, scanBy: 'number' },
            });
          } else {
            setLoading(false);
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

  const scanHandlerCamera = async (barcode) => {

    if (barcode === "") {
      isScanningEnabled = true;
      setErrorCamera("Please Enter Barcode Number");
      return;
    }

    try {
      if (!isAuthenticated) {
        await handleNonAuthenticatedUser(barcode, "camera");
      } else {
        // Check if the user can scan or not based on subscription
        const countForTodayResponse = await checkUserCanScan(user.id, userSubscription.plan_id);
        if (!countForTodayResponse.data.success) {
          isScanningEnabled = true;
          setErrorCamera(countForTodayResponse.data.error);
          return;
        }

        //  Make the main API call
        const mainApiResponse = await scanProduct(barcode, userSubscription.plan_id);
        if (
          !mainApiResponse.data ||
          Object.keys(mainApiResponse.data).length === 0
        ) {
          isScanningEnabled = true;
          setShowUpgradeLink(false);
          setErrorCamera("No data found");
          return;
        }
        else {
          setErrorCamera("");
          const response = await scanHistoryData(mainApiResponse , user.id, accessToken);
          if (response.status == 201) {
            setUseCamera(false);
            setStartDate(new Date());
            setShowScanDetail(true);
            isScanningEnabled = true;
            const groupedScanHistory = response.data.data;
            if (groupedScanHistory.length != 0) {
              if ("0" in groupedScanHistory) {
                setDisableNewBatch(false);
              }
              const formattedDate = formatDateInNumber(new Date());
              const firstKey = Object.keys(groupedScanHistory)[0];
              const keysWithFormattedDate = Object.keys(groupedScanHistory).map(key => formattedDate + key);
              setLoadData(groupedScanHistory);
              setKeys(keysWithFormattedDate);
              setBatchNumber(keysWithFormattedDate[0]);
              setPaginationKey((prevKey) => prevKey - 1);
              setScanHistory(groupedScanHistory[firstKey]);
            }
            else {
              setScanHistory([]);
            }

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

  //Manually Enter Item Popup
  const handleManuallyEnterItem = () => {
    setShowManuallyPopup(true);
  };

  const handleManuallyClosePopup = () => {
    setShowManuallyPopup(false);
  };

  //Export Options Popup
  const handleExportProducts = () => {
    setShowExportOptions(true);
    document.body.classList.add('bodyfixed');
  };

  const handleExportClosePopup = () => {
    document.body.classList.remove('bodyfixed');
    setShowExportOptions(false);
  };

  return (
    <>
      <ScanDetailPageStyle className="scan-details">
        <div className="scan-deatils">
          <Container>
            <Row className="justify-content-center align-items-end ">
              <Col sm={12}>
                <Row className="justify-content-center ">
                  <Col sm={12} lg={8}>
                    <div className="scan-row">
                      <div className="upc">
                        {scanBy == 'number' ? (
                          <>
                            <form className="cover-area" onSubmit={scanHandler}>
                              <div className="cov">
                                <div className="cover">
                                  <p className="padd-0">Scan Next Item</p>
                                  <input
                                    type="text"
                                    ref={inputRef}
                                    className="form-control"
                                    value={barcodeNumber}
                                    onChange={(event) => {
                                      setError("");
                                      setBarcodeNumber(event.target.value);
                                    }}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="custom-btn custom-8 btn-3 d-flex align-items-center"
                                >
                                  <span >Scan Detail </span>{" "}
                                  {loading && (
                                    <TailSpin color="#fff" height={18} width={18} />
                                  )}
                                </button>
                              </div>
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
                            </form>
                          </>
                        ) :
                          (<>
                            <div className="cover cameraText camera-scan">
                              <p className="padd-0">Scan Next Item    <button className="use-camera-btn" onClick={useCameraHandler}>{useCamera ? 'Turn Off Camera (Beta)' : 'Use Camera (Beta)'}</button>
                              </p>
                              <div>
                                {useCamera &&
                                  <BarcodeScannerComponent
                                    width={250}
                                    height={250}
                                    onUpdate={(err, result) => {
                                      if (isScanningEnabled && result) {
                                        const scannedText = result.text;
                                        const cleanedText = scannedText.slice(1);
                                        scanHandlerCamera(cleanedText);
                                        isScanningEnabled = false;
                                      }
                                    }}
                                  />
                                }
                              </div>
                              {errorCamera && <>
                                <span className="error-message mb-3 eror-cam">{errorCamera} {' '}
                                  {showUpgradeLink && <Link to='/subscription' className="error-message" style={{ textDecoration: "underline" }}>
                                    Upgrade Subscription
                                  </Link>}
                                </span>
                              </>
                              }
                            </div>
                          </>
                          )}
                      </div>
                    </div>
                  </Col>
                  <Col sm={12}>
                    {!showScanDetail && <div className=" mt-2 text-center">
                      <div className="or-line mb-4"><span>or</span></div>
                      <button className="use-camera-btn" onClick={useCameraHandler}>{useCamera ? 'Turn Off Camera (Beta)' : 'Use Camera (Beta)'}</button>
                      {useCamera && 
                          <Container>
                            <Row className="justify-content-center">
                              <Col sm={6}>
                                <p style={{ margin: 0 }}>Hold the camera to the Barcode</p>
                                <div className="camera-border">
                                  <BarcodeScannerComponent
                                    width={400}
                                    onUpdate={(err, result) => {
                                      if (isScanningEnabled && result) {
                                        const scannedText = result.text;
                                        const cleanedText = scannedText.slice(1);
                                        scanHandlerCamera(cleanedText);
                                        isScanningEnabled = false;
                                      }
                                    }}
                                  />
                                </div>
                                <h3 className="text-center">Scanning...</h3>
                              </Col>
                            </Row>
                          </Container>
                      }
                      {errorCamera && <p className="text-center error-message">{errorCamera} {' '}
                        {showUpgradeLink && <Link to='/subscription' className="error-message" style={{ textDecoration: "underline" }}>
                          Upgrade Subscription
                        </Link>}</p>}
                    </div>}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>



        {showScanDetail && <div className="scan-display"><Container>
          <Row>
            <Col sm="12"> <h2>Scan Display window</h2></Col>
          </Row>
          <Row>
            <Col sm={6} className="text-start">
              <p className="batch"><span>Scan ID:</span> {id} </p>
              <div className="apple-arirport">
                <p>{scanData.Title && <><span>Title:</span> {scanData.Title}</>}</p>
                <p>{scanData.Desc && <><span>Desc:</span> {scanData.Desc}</>}</p>
                <p>{scanData.MaxPrice && <><span>Max Price:</span> {scanData.MaxPrice}</>}</p>
                <p>{scanData.MinPrice && <><span>Min Price:</span> {scanData.MinPrice}</>}</p>
                <p>{scanData.AveragePrice && <><span>Average Price:</span> ${scanData.AveragePrice}</>}</p>
                <p>{scanData.Weight && <><span>Weight Price:</span>{scanData.Weight}</>}</p>
              </div>
              <div className="btn-row">
                <div className="d-md-flex align-items-center">
                  {scanData.manuallyEnter == true && formatDate(startDate) == formatDate(currentDate) &&
                    <div className="text-center"><Button onClick={handleManuallyEnterItem} className="custom-btn btn-3 me-sm-4">
                      <span>Manually Enter item</span>
                    </Button>
                    </div>}
                  {scanData.export_options == true && <>
                    <div className="text-center"> <Button onClick={handleExportProducts} disabled={scanHistory.length == 0} className="custom-btn btn-3 m-0">
                      <span>Export Products</span>
                    </Button></div>
                  </>
                  }
                </div>
              </div>
            </Col>
            <Col sm={6} className="text-center">
              {scanData.Images ?
                <Carousel showThumbs={false}>
                  {scanData?.Images?.map((image, index) => (
                    <div key={index} className="image-size">
                      <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                  ))}
                </Carousel>
                :
                <p className="error-message"><img src={defaultScanImage} />
                  <Link to='/subscription' className="error-message" style={{ textDecoration: "underline" }}>Upgrade your plan to view Images</Link></p>
              }
            </Col>
          </Row>
          <Row className="justify-content-center pt-3 btn-row">
            <Col sm={12}>
              <Row className="justify-content-between">
                {scanData.export_to_csv &&
                  <Col sm={4} className="text">
                    <Link to="#" className="custom-btn btn-3" onClick={(e) => { e.preventDefault(); exportCSV(scanHistory) }}>
                      Export Products
                    </Link>
                  </Col>}
                {scanData.export_free === true && isAuthenticated &&
                  <Col sm={4} className="text">
                    <Button className="custom-btn btn-3" onClick={exportfree}>
                      Export Products
                    </Button>
                    <p className="error-message">
                      <Link
                        to="/subscription"
                        className="error-message"
                        style={{ textDecoration: "underline" }}
                      >
                        {freeError}
                      </Link>
                    </p>
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </Container>
        </div>
        }
        {showManuallyPopup && <ManuallyEnterItem userId={user.id} setDisableNewBatch={setDisableNewBatch} setPaginationKey={setPaginationKey} setBatchNumber={setBatchNumber} setKeys={setKeys} setLoadData={setLoadData} startDate={startDate} setStartDate={setStartDate} onClose={handleManuallyClosePopup} setScanHistory={setScanHistory} />}
        {showExportOptions && <ExportItems batchNumber={batchNumber} scanHistory={scanHistory} userId={user.id} onClose={handleExportClosePopup} startDate={startDate} />}



        <div className="History-sec">
          <ScanHistoryRecords
            user={user}
            exportCSV={exportCSV}
            setStartDate={setStartDate}
            startDate={startDate}
            scanHistory={scanHistory}
            setScanHistory={setScanHistory}
            loadData={loadData}
            setLoadData={setLoadData}
            keys={keys}
            setKeys={setKeys}
            batchNumber={batchNumber}
            setBatchNumber={setBatchNumber}
            paginationKey={paginationKey}
            setPaginationKey={setPaginationKey}
            disableNewBatch={disableNewBatch}
            setDisableNewBatch={setDisableNewBatch}
            planFeatures={planFeatures}
            handleManuallyEnterItem={handleManuallyEnterItem}
            handleExportProducts={handleExportProducts}
            showScanDetail={showScanDetail}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </ScanDetailPageStyle>
    </>
  );
};

export default ScanDetailPage;