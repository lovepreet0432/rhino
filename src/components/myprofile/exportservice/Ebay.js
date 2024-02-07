import React, { useEffect, useState } from "react";
import ebay from "../../../assets/images/ebay2.png";
import { Col, Row, Form } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../../redux/slices/accountSlice";
import { checkTokenExpiry } from "../../../utils/api/accountSetting";
import {
  saveEbayData,
  authorizeEbay,
  refreshEbay,
} from "../../../utils/api/accountSetting";

const Ebay = ({ options,optionData, showOptions,handleOptionChange, user ,validationError,setValidationError}) => {
  const dispatch = useDispatch();
  const [saveLoading, setSaveLoading] = useState(false);
  const [ebayLoading, setEbayLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);
  const accessToken = useSelector((state)=> state.auth.token);

  const checkTokenValidity = async () => {
    // Create an object containing the data you want to send to the API
    const response = await checkTokenExpiry(user.id, accessToken);

    if (response && response.status === 200) {
      setValidToken(response.data.token_valid);
    } else {
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        'ebay': response.data.message, 
      }));
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const ebayAuthorizeHandler = async (e) => {
    e.preventDefault();
    setEbayLoading(true);
    setValidationError((prevErrors) => ({
      ...prevErrors, 
      'ebay': '', 
    }));
    
    const response = await authorizeEbay(user.id, accessToken);
    setEbayLoading(false);
    if (response.status == 201) {
      window.location.href = response.data.url;
    } else {
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        'ebay': response.data.message, 
      }));
    }
  };

  const handleEbaySubmit = async (e) => {
    e.preventDefault();

    setSaveLoading(true);
    const response = await saveEbayData(user.id, optionData.ebay, accessToken);
    if (response.status == 200) {
      setSaveLoading(false);
      dispatch(setOption({...options, 'ebay': optionData.ebay}));
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn",
        },
      });
    } else {
      setSaveLoading(false);
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        'ebay': response.data.message, 
      }));
    } 
  };

  return (
    <div className=" col-sm-12">
      <div className="profile-sec">
        <div className="tp-label">
          <img src={ebay} alt="ebay" />
          <span>eBay</span>
        </div>
        <Form.Check
          inline
          label="Enable"
          name="ebay"
          type="radio"
          id="enableRadio"
          htmlFor="enableRadio"
          value="enable"
          checked={optionData.ebay === "enable"}
          onChange={handleOptionChange}
        />
        <Form.Check
          inline
          label="Disable"
          name="ebay"
          type="radio"
          id="disableRadio"
          htmlFor="enableRadio"
          value="disable"
          checked={optionData.ebay === "disable"}
          onChange={handleOptionChange}
        />

        {optionData.ebay === "disable" ? (
          ""
        ) : (
          <>
            <Row className="mt-2">
              {validToken ? (
                <>
                  <Col sm={6}>
                    <button disabled={true} className="custom-btn btn-3">
                      <span>Authorized</span>{" "}
                    </button>
                  </Col>
                </>
              ) : (
                <Col sm={6}>
                  <button
                    onClick={ebayAuthorizeHandler}
                    disabled={ebayLoading}
                    className="custom-btn btn-3"
                  >
                    <span>Authenticate with Login</span>{" "}
                    {ebayLoading && (
                      <TailSpin color="#E7A83E" height={20} width={20} />
                    )}
                  </button>
                </Col>
              )}
              {/* <Col sm={6}>
                                <button onClick={ebayReauthenticateHandler} disabled={refreshLoading} className="custom-btn btn-3">
                                    <span>Re-Authenticate without Login</span>{" "}
                                    {refreshLoading && (
                                        <TailSpin color="#E7A83E" height={20} width={20} />
                                    )}
                                </button>
                            </Col> */}
            </Row>
          </>
        )}
        <div className="mt-3 col-sm-12 " style={{display:'flex',justifyContent:'space-between'}}>
          <button
            type="button"
            disabled={ebayLoading || saveLoading || !showOptions.ebay}
            onClick={(e) => handleEbaySubmit(e, "ebay", optionData.ebay)}
            className="custom-btn btn-3">
            <span>Save</span>{" "}
            {saveLoading && <TailSpin color="#E7A83E" height={20} width={20} />}
          </button>
          {validationError && validationError.ebay &&
              <div className="error-message">
                {validationError.ebay}
              </div>
            }
        </div>
      </div>
    </div>
  );
};

export default Ebay;
