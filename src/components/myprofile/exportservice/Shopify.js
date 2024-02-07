import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import shopify from "../../../assets/images/shopify.png"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { shopifyValidationSchema } from "../../../utils/validations";
import {
  getShopifyData,
  saveShopifyData,
} from "../../../utils/api/accountSetting";

const Shopify = ({ options,user, setOption, showOptions,optionData, handleOptionChange,validationError,setValidationError }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const [shopifyLoading, setShopifyLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      shopify_url: "",
      access_token: "",
    },
    validationSchema: optionData.shopify === 'enable' ? shopifyValidationSchema : null,
    onSubmit: async (values) => {
      setShopifyLoading(true);
      setValidationError((prevErrors) => ({
        ...prevErrors, 
        'shopify': ""
      }));
      const response = await saveShopifyData(
        values,
        optionData.shopify,
        user.id,
        accessToken
      );
      setShopifyLoading(false);
      if (response.status === 201) {
        dispatch(setOption({...options, 'shopify': optionData.shopify}));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Shopify Enabled Successfully.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn",
          },
        });
      } else if (response.status === 401) {
        setValidationError((prevErrors) => ({
          ...prevErrors, 
          'shopify': response.data.message
        }));
      } else if (response.status === 200) {
        dispatch(setOption(optionData));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Shopify Disable Successfully.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn",
          },
        });
      } else {
        setValidationError((prevErrors) => ({
          ...prevErrors, 
          'shopify': "Something went wrong, please try again."
        }));
      }
    }
  });

  useEffect(() => {
    const ShopifyData = async () => {
      const response = await getShopifyData(user.id, accessToken);
      if (response.status === 200) {
        formik.setValues(response.data.data);
      } 
    };
    ShopifyData();
  }, []);

  return (
    <>
      <div className="col-sm-12">
        <div className="profile-sec">
          <div className="tp-label">
            <img src={shopify} alt="Shopify" />
            <span>Shopify</span>
          </div>
          <Form.Check
            inline
            label="Enable"
            name="shopify"
            type="radio"
            id="shopifyEnable"
            htmlFor="shopifyEnable"
            value="enable"
            checked={optionData.shopify === "enable"}
            onChange={handleOptionChange}
          />
          <Form.Check
            inline
            label="Disable"
            name="shopify"
            type="radio"
            id="shopifyDisable"
            htmlFor="shopifyDisable"
            value="disable"
            checked={optionData.shopify === "disable"}
            onChange={handleOptionChange}
          />
          <Row>
            {optionData.shopify === "disable" ? (
              ""
            ) : (
              <>
                <Col sm={6} className="mt-2">
                  <Form.Label htmlFor="inputText">Shopify Url</Form.Label>
                  <Form.Control
                    type="text"
                    id="shopify_url"
                    name="shopify_url"
                    aria-describedby="textHelpBlock"
                    value={formik.values.shopify_url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.shopify_url && formik.errors.shopify_url && (
                    <p className="text-start error-message">
                      {formik.errors.shopify_url}
                    </p>
                  )}
                </Col>
                <Col sm={6} className="mt-2">
                  <Form.Label htmlFor="inputText">Access Token</Form.Label>
                  <Form.Control
                    type="text"
                    id="access_token"
                    name="access_token"
                    aria-describedby="textHelpBlock"
                    value={formik.values.access_token}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.access_token && formik.errors.access_token && (
                    <p className="text-start error-message">
                      {formik.errors.access_token}
                    </p>
                  )}
                </Col>
              </>
            )}
            <div className="mt-3 col-sm-12" style={{display:'flex',justifyContent:'space-between'}}>
              <button
                type="button"
                onClick={formik.handleSubmit}
                disabled={shopifyLoading || !showOptions.shopify}
                className="custom-btn btn-3"
              >
                <span>Save</span>{" "}
                {shopifyLoading && (
                  <TailSpin color="#fff" height={20} width={20} />
                )}
              </button>
              {validationError && validationError.shopify &&
              <div className="error-message">
                {validationError.shopify}
              </div>
               }
            </div>  
          </Row>
        </div>
      </div>
    </>
  );
};

export default Shopify;