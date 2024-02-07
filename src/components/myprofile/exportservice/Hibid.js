import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Col, Row, Form } from 'react-bootstrap';
import hibid from '../../../assets/images/hibid.png';
import Swal from 'sweetalert2';
import { TailSpin } from "react-loader-spinner";
import { useDispatch,useSelector } from 'react-redux';
import { saveHibidData } from "../../../utils/api/accountSetting";
import { hibidValidationSchema } from "../../../utils/validations";
const Hibid = ({ user,options, setOption,showOptions, optionData ,handleOptionChange,validationError,setValidationError}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const formik = useFormik({
    initialValues: {
      seller:'',
      sellerCode:'',
    },
    validationSchema: optionData.hibid === 'enable' ? hibidValidationSchema : null,
    onSubmit: async (values, { setSubmitting }) => {
        setSubmitting(true);
        const response = await saveHibidData(values, optionData.hibid, user.id, accessToken);

        if (response.status === 200) {
          dispatch(setOption({...options, 'hibid': optionData.hibid,'seller':values.seller,'sellerCode':values.sellerCode}));
          
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Data saved successfully.',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn',
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong. Please try again.',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn',
            },
          });
        }
    },
  });

  useEffect(() => {
        formik.setValues({'seller':optionData['seller'],'sellerCode':optionData['sellerCode']});
  }, [optionData]);

  return (
    <div className="col-sm-12">
      <div className="profile-sec">
        <div className="tp-label"><img src={hibid} alt="hibid" /><span>Hi-Bid</span></div>
          <Form.Check
            inline
            label="Enable"
            name="hibid"
            type="radio"
            value="enable"
            id="hibidEnable"
            htmlFor="hibidEnable"
            checked={optionData.hibid === 'enable'}
            onChange={handleOptionChange}
          />
          <Form.Check
            inline
            label="Disable"
            name="hibid"
            type="radio"
            value="disable"
            id="hibidDisable"
            htmlFor="hibidDisable"
            checked={optionData.hibid === 'disable'}
            onChange={handleOptionChange}
          />
         {optionData.hibid === 'disable' ? '' :
            <Row>
              <Col sm={6} className="mt-2">
                <Form.Label htmlFor="inputText">Seller</Form.Label>
                <Form.Control
                  type="text"
                  id="seller"
                  name="seller"
                  aria-describedby="textHelpBlock"
                  value={formik.values.seller}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.seller && formik.errors.seller && <p className="text-start error-message">{formik.errors.seller}</p>}
              </Col>
              <Col sm={6} className="mt-2">
                <Form.Label htmlFor="inputText">
                  Seller Code
                </Form.Label>
                <Form.Control
                  type="text"
                  id="sellerCode"
                  name="sellerCode"
                  aria-describedby="textHelpBlock"
                  value={formik.values.sellerCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.sellerCode && formik.errors.sellerCode && <p className="text-start error-message">{formik.errors.sellerCode}</p>}
              </Col>
            </Row>}
          <div className="mt-3 col-sm-12 " style={{display:'flex',justifyContent:'space-between'}}>
            <button
              type="button"  
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting || !showOptions.hibid}
              className="custom-btn btn-3"
            >
              <span>Save</span>{" "}
              {formik.isSubmitting && (
                <TailSpin color="#fff" height={20} width={20} />
              )}
            </button>
            {validationError && validationError.hibid &&
              <div className="error-message">
                {validationError.hibid}
              </div>
               }
          </div>
      </div>
    </div>
  );
}

export default Hibid;