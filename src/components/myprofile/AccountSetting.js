import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form } from 'react-bootstrap';
import { setOption } from '../../redux/slices/accountSlice';
import { TailSpin } from "react-loader-spinner";
import Swal from 'sweetalert2';
import Hibid from './exportservice/Hibid';
import Shopify from './exportservice/Shopify';
import { saveServices } from '../../utils/api/accountSetting';
import what from '../../assets/images/what.png';
import Ebay from './exportservice/Ebay';
import { checkServicesForPlan } from '../../utils/api/scan';
import { Link } from 'react-router-dom';
import { AccountSettingStyle } from '../../assets/css/myProfileStyle';

const AccountSetting = () => { 
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const options = useSelector((state) => state.accounts);
  const [optionData, setOptionData] = useState({});
  const [current, setCurrent] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [showOptions, setShowOptions] = useState({});
  const [validationError, setValidationError] = useState({});
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state)=> state.auth.token);
  const userSubscription = useSelector(state => state.auth.userSubscription);

  useEffect(() => {
    window.scrollTo(0, 0);
    const get_Features = async() =>{
        if(userSubscription && userSubscription.plan_id){
        const response = await checkServicesForPlan(userSubscription.plan_id);
        setLoading(false);
        if (response.status == 200) {
          setShowOptions(response.data);
        }
      }else{
        setLoading(false);
      }
    }
    get_Features();
  }, []);

  useEffect(() => {
    setOptionData({ ...options });
  }, [options]);

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    if(showOptions[name]){
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        [name]: '', 
      }));
      setOptionData({ ...optionData, [name]: value });
    }
    else
    {
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        [name]: 'Upgrade your plan to proceed further.', 
      }));
    }
  }

  const handleAccountSaves = async (event, exportName, exportValue) => {
    event.preventDefault();
    setCurrent(exportName);
    const response = await saveServices(exportName, exportValue, user.id, accessToken);
    console.log(response,'respp')
    if (response.status === 200) {
      setCurrent('');
      dispatch(setOption({...options, [exportName]: exportValue}));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data saved successfully.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn',
        },
      });
    }
    else {
      setCurrent('');
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong please try again.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'btn',
        },
      });
    }
  }

  return (
    <>
      <AccountSettingStyle>
        <div className="accountsetting">
          <Row>
             <Col sm="12">
              <div className="account-setting">
                <Form className="row">
                  {/* Shopify */}
                  <Shopify
                    options={options}
                    optionData={optionData}
                    user={user}
                    setOption={setOption}
                    showOptions={showOptions}
                    setOptionData={setOptionData}
                    validationError={validationError}
                    setValidationError={setValidationError}
                    handleOptionChange={handleOptionChange}
                  />
                  {/* eBay */}
                  <Ebay
                    options={options}
                    optionData={optionData}
                    showOptions={showOptions}
                    handleOptionChange={handleOptionChange}
                    user={user}
                    validationError={validationError}
                    setValidationError={setValidationError}
                  />

                  {/* Whatnot */}
                  <div className=" col-sm-12">
                    <div className="profile-sec">
                      <div className="tp-label"><img src={what} alt="what" /><span>WhatNot</span></div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="whatnot"
                        type="radio"
                        id="whatnotEnable"
                        htmlFor="whatnotEnable"
                        value="enable"
                        checked={optionData.whatnot === 'enable'}
                        onChange={handleOptionChange}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="whatnot"
                        type="radio"
                        id="whatnotDisable"
                        htmlFor="whatnotDisable"
                        value="disable"
                        checked={optionData.whatnot === 'disable'}
                        onChange={handleOptionChange}
                      />
                      <div className="mt-3 col-sm-12" style={{display:'flex',justifyContent:'space-between'}}>
                        <button 
                          type='button' 
                          onClick={(e) => handleAccountSaves(e, 'whatnot', optionData.whatnot)} 
                          className="custom-btn btn-3"
                          disabled={!showOptions.whatnot}>
                          <span>Save</span>{" "}
                          {current == 'whatnot' && (
                            <TailSpin color="#fff" height={20} width={20} />
                          )}
                        </button>
                        {validationError && validationError.whatnot &&
                          <div className="error-message">
                            {validationError.whatnot}
                          </div>
                          }
                      </div>
                    </div>
                  </div>

                  {/* Hi-Bid */}
                  <Hibid
                    user={user}
                    options={options}
                    setOption={setOption}
                    optionData={optionData}
                    showOptions={showOptions}
                    handleOptionChange={handleOptionChange}
                    errorMessage={errorMessage}
                    setOptionData={setOptionData}
                    setErrorMessage={setErrorMessage}
                    validationError={validationError}
                    setValidationError={setValidationError}
                  />

                  {/* Manifest */}
                  <div className=" col-sm-12">
                    <div className="profile-sec">
                      <div className="tp-label">Manifest</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="manifest"
                        type="radio"
                        id="manifestEnable"
                        htmlFor="manifestEnable"
                        value="enable"
                        checked={optionData.manifest === 'enable'}
                        onChange={handleOptionChange}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="manifest"
                        type="radio"
                        id="manifestDisable"
                        htmlFor="manifestDisable"
                        value="disable"
                        checked={optionData.manifest === 'disable'}
                        onChange={handleOptionChange}
                      />
                      <div className="mt-3 col-sm-12" style={{display:'flex',justifyContent:'space-between'}}>
                        <button 
                          type='button' 
                          onClick={(e) => handleAccountSaves(e, 'manifest', optionData.manifest)} 
                          className="custom-btn btn-3"
                          disabled={!showOptions.manifest}>
                          <span>Save</span>{" "}
                          {current == 'manifest' && (
                            <TailSpin color="#fff" height={20} width={20} />
                          )}
                        </button>
                        {validationError && validationError.manifest &&
                          <div className="error-message">
                            {validationError.manifest}
                          </div>
                          }
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
             </Col>
          </Row>
        </div>
      </AccountSettingStyle>
    </>
  );
};

export default AccountSetting;