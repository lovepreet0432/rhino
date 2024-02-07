import React, { useState } from "react";
import { useFormik } from "formik";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { FaXmark } from "react-icons/fa6";
import CurrencyInput from 'react-currency-input-field';
import { TailSpin } from "react-loader-spinner";
import { formatDate } from "../../utils/common"; 
import { scanEditing } from "../../utils/api/scan";
import { EditScanHistoryStyle } from "../../assets/css/scanStyle";
import { useSelector } from "react-redux";
import { EditScanHistorySchema } from "../../utils/validations";
const EditScanHistory = ({ user, startDate,setLoadData, onClose, batchNumber, record, setScanHistory, setIsEdit }) => {
  const [errorApi, setErrorApi] = useState('');
  const accessToken = useSelector((state)=> state.auth.token);
  const currentDate=new Date();

  const formik = useFormik({
    initialValues: {
      identifier: record.scan_id,
      title: record.title,
      price: record.price,
      quantity: record.qty,
    },
    validationSchema: EditScanHistorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await scanEditing(formatDate(startDate),formatDate(currentDate), values, user.id, accessToken);
        if (response.status === 200) {
          setErrorApi('');
          const groupedScanHistory = response.data.data;
          setIsEdit(true);
          setLoadData(groupedScanHistory);
          setScanHistory(groupedScanHistory[batchNumber.substring(8)]);
          onClose();
        } else {
          setErrorApi(response.data.message);
          setTimeout(() => {
            setErrorApi('');
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <EditScanHistoryStyle className="manually-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6}>
            <div className="items-row p-3 p-sm-5">
              <Col sm={12}>
                <h2>Edit Scan</h2>
                <button className="close-btn" onClick={onClose}>
                  <FaXmark />
                </button>
              </Col>
              {errorApi && <div><p className="error-message">{errorApi}</p></div>}
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <Form.Label>Identifier </Form.Label>
                    <Form.Control
                      type="text"
                      name="identifier"
                      placeholder="Identifier"
                      value={formik.values.identifier}
                      onChange={formik.handleChange}
                      readOnly
                    />
                    {formik.touched.identifier && formik.errors.identifier && <p className="text-start error-message">{formik.errors.identifier}</p>}
                  </Form.Group>

                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <Form.Label>Title </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.title && formik.errors.title && <p className="text-start error-message">{formik.errors.title}</p>}
                  </Form.Group>
                </Row>
  

                <Form.Group className="mb-2" controlId="formBasic">
                <label className="mb-2">Qty</label>
                <div className="counter">
                    <button type="button" onClick={() => formik.setFieldValue('quantity', formik.values.quantity - 1)} className="btn">
                    -
                    </button>{" "}
                    <div className="value">
                    <input
                        type="text"
                        className="value"
                        value={formik.values.quantity}
                        onChange={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched('quantity', true, false);
                        }}
                    />
                    </div>
                    <button type="button" onClick={() => formik.setFieldValue('quantity', formik.values.quantity + 1)} className="btn">
                    +
                    </button>
                </div>
                {formik.touched.quantity && formik.errors.quantity && <p className="text-start error-message">{formik.errors.quantity}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Price </Form.Label>
                <CurrencyInput
                    className="form-control"
                    prefix="$"
                    name="price"
                    decimalsLimit={2}
                    allowNegativeValue={false}
                    defaultValue={0}
                    onValueChange={(value) => {
                    if (value == undefined) {
                        formik.setFieldValue('price', 0);
                    }
                    if (value <= 10000) {
                        formik.setFieldValue('price', value);
                    }
                    }}
                    value={formik.values.price}
                    onKeyDown={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && <p className="text-start error-message">{formik.errors.price}</p>}
                </Form.Group>

                <div className="dblock">
                  <Button
                    variant="primary"
                    type="submit"
                    className="custom-btn btn-3 d-flex"
                  >
                    <span>Submit</span>{" "}
                    {formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}
                  </Button>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={onClose}
                    className="custom-btn btn-3 secondary"
                  >
                    <span>Cancel</span>
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </EditScanHistoryStyle>
  );
}

export default EditScanHistory;