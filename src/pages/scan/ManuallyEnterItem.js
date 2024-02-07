import React,{useState}  from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { FaXmark } from "react-icons/fa6";
import CurrencyInput from 'react-currency-input-field';
import Swal from "sweetalert2";
import { TailSpin } from "react-loader-spinner";
import { manuallyEnterScanItem } from "../../utils/api/scan";
import { formatDateInNumber } from "../../utils/common";
import { ManuallyEnterItemSchema } from "../../utils/validations";
import { useFormik } from "formik";
import { ManuallyEnterItemStyle } from "../../assets/css/scanStyle";
import { useSelector } from "react-redux";

const ManuallyEnterItem = ({ userId, setDisableNewBatch, setPaginationKey, setBatchNumber, setKeys, setLoadData,startDate, setStartDate, onClose, setScanHistory }) => {
  const accessToken = useSelector((state)=> state.auth.token);
  const [validationError,setValidationError]=useState('');
  const formik = useFormik({
    initialValues: {
      identifier: "",
      title: "",
      price: 0,
      description: "",
      quantity: 1
    },
    validationSchema: ManuallyEnterItemSchema,
    onSubmit: async (values) => {
      setValidationError('');
      const response = await manuallyEnterScanItem(values, userId, accessToken);

      if (response.status == 201) {
        setStartDate(new Date());
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
          setPaginationKey((prevKey) => prevKey + 1);
          setScanHistory(groupedScanHistory[firstKey]);
        }
        else {
          setScanHistory([]);
        }
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product has been added Manually",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn",
          },
        }).then(() => {
          onClose();
        }).catch((error) => {
          console.log(error, 'errorr')
        })
      } else {
        setValidationError(response.data.message);
      }
    }
  });


  const plusHandler = (event) => {
    event.preventDefault();
    const currentQuantity = formik.values.quantity;
    const newQuantity = Math.min(currentQuantity + 1, 100);
    formik.setFieldValue('quantity', newQuantity);
    formik.setFieldTouched('quantity', true);
  };

  const minHandler = (event) => {
    event.preventDefault();
    const currentQuantity = formik.values.quantity;
    const newQuantity = Math.max(currentQuantity - 1, 1);
    formik.setFieldValue('quantity', newQuantity);
    formik.setFieldTouched('quantity', true);
  };

  return (
    <ManuallyEnterItemStyle className="manually-section">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6}>
            <div className="items-row p-4">
              <Col sm={12}>
                <h2>Manually Enter item</h2>
                <button className="close-btn" onClick={onClose}>
                  <FaXmark />
                </button>
              </Col>
              <form onSubmit={formik.handleSubmit}>
              {validationError && <div className="error-message">{validationError}</div>}
                <Row>
                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <Form.Label>Identifier </Form.Label>
                    <Form.Control
                      type="text"
                      name="identifier"
                      placeholder="Identifier"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.identifier && formik.errors.identifier && <p className=" text-start error-message">{formik.errors.identifier}</p>}
                  </Form.Group>

                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <Form.Label>Title </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && <p className=" text-start error-message">{formik.errors.title}</p>}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <label className="mb">Qty</label>
                    <div className="counter">
                      <button onClick={minHandler} className="btn">
                        -
                      </button>{" "}
                      <div className="value">

                        <input
                          type="text"
                          className="value"
                          name='quantity'
                          value={formik.values.quantity}
                          onChange={(e) => {
                            const newQuantity = e.target.value;
                            if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 100) {
                              formik.handleChange(e);
                            }
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <button onClick={plusHandler} className="btn">
                        +
                      </button>
                    </div>
                    {formik.touched.quantity && formik.errors.quantity && <p className=" text-start error-message">{formik.errors.quantity}</p>}

                  </Form.Group>
                  <Form.Group className="mb-2 col" controlId="formBasic">
                    <Form.Label>Price </Form.Label>
                    <CurrencyInput
                      className="form-control"
                      prefix="$"
                      name="price"
                      decimalsLimit={2}
                      allowNegativeValue={false}
                      defaultValue={0}
                      value={formik.values.price}
                      onValueChange={(value) => {
                        if (value == undefined) {
                          formik.setFieldValue('price', 0);
                        } else if (value <= 10000) {
                          formik.setFieldValue('price', value);
                        }
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.price && formik.errors.price && <p className=" text-start error-message">{formik.errors.price}</p>}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && <p className=" text-start error-message">{formik.errors.description}</p>}
                  </Form.Group>
                </Row>
                <div className="dblock">
                  <Button
                    variant="primary"
                    type="submit"
                    className="custom-btn btn-3 main-btns"
                    disabled={formik.isSubmitting}
                  >
                    <span>Submit{" "} {formik.isSubmitting && (
                      <TailSpin color="#fff" height={18} width={18} />
                    )}</span>
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={onClose}
                    className="custom-btn secondary btn-3"
                  >
                    <span>Cancel</span>
                  </Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </ManuallyEnterItemStyle>
  );
};

export default ManuallyEnterItem;