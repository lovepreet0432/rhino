import React, { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { setHomepage } from "../../../redux/slices/homeSlice";
import { TailSpin } from "react-loader-spinner";
import { HomePageStyle } from "../../../assets/css/adminStyle";
import { getHomePage, homepage } from "../../../utils/api/admin";
import { useFormik } from "formik";
import { adminHomePageSchema } from "../../../utils/validations";

const HomePage = () => {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      heading: '',
      content: '',
      scanContent: '',
      services: [{ servicesHeading: '', servicesContent: '' }],
      featureContent: '',
      shopify: [''],
      ebay: [''],
      hibid: [''],
      amazon: [''],
      whatnot: [''],
    },
    validationSchema: adminHomePageSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await homepage(values, access_token);
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your Homepage data is saved successfully.',
          customClass: {
            confirmButton: 'btn',
          },
        });
        const decodedData = {
          ...response.data.data,
          services: response.data.data.services
            ? JSON.parse(response.data.data.services)
            : [],
          shopify: response.data.data.shopify
            ? JSON.parse(response.data.data.shopify)
            : [''],
          ebay: response.data.data.ebay
            ? JSON.parse(response.data.data.ebay)
            : [''],
          hibid: response.data.data.hibid
            ? JSON.parse(response.data.data.hibid)
            : [''],
          amazon: response.data.data.amazon
            ? JSON.parse(response.data.data.amazon)
            : [''],
          whatnot: response.data.data.whatnot
            ? JSON.parse(response.data.data.whatnot)
            : [''],
        };

        formik.setValues(decodedData);
        dispatch(setHomepage(decodedData));
      } catch (error) {
        setLoading(false);
        console.error('API Error:', error);
      }
    },
  });


  const addServiceRow = (e) => {
    e.preventDefault();
    if (formik.values.services.length < 5) {
      formik.setValues({
        ...formik.values,
        services: [
          ...formik.values.services,
          { servicesHeading: '', servicesContent: '' },
        ],
      });
    }
  };

  const removeServiceRow = (index) => {
    const updatedServices = [...formik.values.services];
    updatedServices.splice(index, 1);
    formik.setValues({
      ...formik.values,
      services: updatedServices,
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getHomePageDetails();
  }, []);

  const getHomePageDetails = async () => {
    try {
      setDataLoading(true);
      const response = await getHomePage(access_token);
      const decodedData = {
        ...response.data.data,
        services: response.data.data.services ? JSON.parse(response.data.data.services) : [],
        shopify: response.data.data.shopify
          ? JSON.parse(response.data.data.shopify)
          : [''],
        ebay: response.data.data.ebay
          ? JSON.parse(response.data.data.ebay)
          : [''],
        hibid: response.data.data.hibid
          ? JSON.parse(response.data.data.hibid)
          : [''],
        amazon: response.data.data.amazon
          ? JSON.parse(response.data.data.amazon)
          : [''],
        whatnot: response.data.data.whatnot
          ? JSON.parse(response.data.data.whatnot)
          : [''],
      };
      setDataLoading(false);
      formik.setValues(decodedData);
    } catch (error) {
      setDataLoading(false);
    }
  };

  const addFeature = (e, category) => {
    e.preventDefault();
    const updatedFeatures = [...formik.values[category], ''];
    formik.setValues({
      ...formik.values,
      [category]: updatedFeatures,
    });
  }

  const removeFeature = (index, fieldName) => {
    if (formik.values[fieldName].length > 1) {
      const updatedFeatures = [...formik.values[fieldName]];
      updatedFeatures.splice(index, 1);

      formik.setValues({
        ...formik.values,
        [fieldName]: updatedFeatures,
      });
    }
  };

  const handleFeatureChange = (value, index, category) => {
    const updatedFeatures = [...formik.values[category]];
    updatedFeatures[index] = value;

    formik.setValues({
      ...formik.values,
      [category]: updatedFeatures,
    });
  };

  if (dataLoading) {
    return (
      <div className="loader-container">
        <TailSpin height={40} width={40} />
      </div>
    );
  }

  return (
    <HomePageStyle>
      <Form onSubmit={formik.handleSubmit}>
        {/* Home */}
        <div className="profile-sec">
          <Row>
            <Col sm={12} className="text-start">
              <h4>Home Banner</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3 text-start">
              <Form.Label htmlFor="heading">Heading</Form.Label>
              <Form.Control
                type="text"
                id="heading"
                {...formik.getFieldProps('heading')}
              />
              {formik.touched.heading && formik.errors.heading && (
                <div className="error-message">{formik.errors.heading}</div>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3 text-start">
              <Form.Label htmlFor="content">Content</Form.Label>
              <Form.Control
                as="textarea"
                id="content"
                {...formik.getFieldProps('content')}
              />
              {formik.touched.content && formik.errors.content && (
                <div className="error-message">{formik.errors.content}</div>
              )}
            </Col>
          </Row>
        </div>

        {/* ScanProduct */}
        <div className="profile-sec">
          <Row>
            <Col sm={12} className="text-start">
              <h4>Scan Product</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3 text-start">
              <Form.Label htmlFor="scanContent">Content</Form.Label>
              <Form.Control
                type="textarea"
                id="scanContent"
                name="scanContent"
                as="textarea"
                value={formik.values.scanContent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.scanContent && formik.errors.scanContent
                    ? 'is-invalid'
                    : ''
                  }`}
              />
              {formik.touched.scanContent && formik.errors.scanContent && (
                <div className="error-message">{formik.errors.scanContent}</div>
              )}
            </Col>
          </Row>
        </div>


        {/* Our Services */}
        <div className="profile-sec">
          <Col sm={12} className="text-start">
            <h4>Our Services</h4>
          </Col>
          {formik.values.services.map((service, index) => (
            <Row key={index} className="btn-addon">
              <Col sm={5} className="mb-3 text-start">
                <Form.Label htmlFor={`servicesHeading${index}`}>Heading </Form.Label>
                <Form.Control
                  type="text"
                  id={`servicesHeading${index}`}
                  name={`services[${index}].servicesHeading`}
                  value={formik.values.services[index].servicesHeading}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.services &&
                      formik.touched.services[index]?.servicesHeading &&
                      formik.errors.services &&
                      formik.errors.services[index]?.servicesHeading
                      ? 'is-invalid'
                      : ''
                    }`}
                />
                {formik.touched.services &&
                  formik.touched.services[index]?.servicesHeading &&
                  formik.errors.services &&
                  formik.errors.services[index]?.servicesHeading && (
                    <div className="error-message">
                      {formik.errors.services[index]?.servicesHeading}
                    </div>
                  )}
              </Col>
              <Col sm={6} className="mb-3 text-start">
                <Form.Label htmlFor={`servicesContent${index}`}>Content </Form.Label>
                <Form.Control
                  type="text"
                  id={`servicesContent${index}`}
                  name={`services[${index}].servicesContent`}
                  value={formik.values.services[index].servicesContent}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.services &&
                      formik.touched.services[index]?.servicesContent &&
                      formik.errors.services &&
                      formik.errors.services[index]?.servicesContent
                      ? 'is-invalid'
                      : ''
                    }`}
                />
                {formik.touched.services &&
                  formik.touched.services[index]?.servicesContent &&
                  formik.errors.services &&
                  formik.errors.services[index]?.servicesContent && (
                    <div className="error-message">
                      {formik.errors.services[index]?.servicesContent}
                    </div>
                  )}
              </Col>
              <Col sm={1} style={{ minHeight: '52px' }}>
                <Form.Label></Form.Label>
                {formik.values.services.length > 1 && (
                  <button onClick={() => removeServiceRow(index)}>
                    <FaCircleMinus />
                  </button>
                )}
              </Col>
            </Row>
          ))}
          {formik.values.services.length < 5 && (
            <button onClick={addServiceRow} className="add-btn">
              <FaCirclePlus />
            </button>
          )}
        </div>

        {/* Feature Content */}
        <div className="profile-sec">
          <Row>
            <Col sm={12} className="text-start">
              <h4>Feature Content</h4>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3 text-start pb-4">
              <Form.Label htmlFor="featureContent">Content</Form.Label>
              <Form.Control
                as="textarea"
                id="featureContent"
                name="featureContent"
                value={formik.values.featureContent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.featureContent &&
                    formik.errors.featureContent
                    ? 'is-invalid'
                    : ''
                  }`}
              />
              {formik.touched.featureContent &&
                formik.errors.featureContent && (
                  <div className="error-message">
                    {formik.errors.featureContent}
                  </div>
                )}
            </Col>
          </Row>
        </div>
        <div className="profile-sec">
          <Row>
            {['shopify', 'ebay', 'whatnot', 'amazon', 'hibid'].map((category,catIndex) => (
              <Col sm={6} key={category+catIndex}>
                <div className="profile-sec pb-4" key={category+catIndex}>
                  <h6>{`${category.charAt(0).toUpperCase()}${category.slice(1)} Features`}</h6>
                  <ul className="list-ui">
                    {formik.values[category].map((feature, index) => (
                      <React.Fragment key={category + catIndex + index}>
                        <li>
                          <Form.Control
                            type="text"
                            name={`${category}[${index}]`}
                            value={feature}
                            onChange={(e) => handleFeatureChange(e.target.value, index, category)}
                            onBlur={formik.handleBlur}
                            className={`form-control ${formik.touched[category] &&
                                formik.touched[category][index] &&
                                formik.errors[category] &&
                                formik.errors[category][index]
                                ? 'is-invalid'
                                : ''
                              }`}
                          />
                          {Array.isArray(formik.values[category]) &&
                            formik.values[category].length > 1 && (
                              <button onClick={() => removeFeature(index, category)}>
                                <FaCircleMinus />
                              </button>
                            )}
                        </li>
                        {formik.touched[category] &&
                          formik.touched[category][index] &&
                          formik.errors[category] &&
                          formik.errors[category][index] && (
                            <div className="error-message">
                              {formik.errors[category][index]}
                            </div>
                          )}
                      </React.Fragment>
                    ))}
                  </ul>
                  {Array.isArray(formik.values[category]) &&
                    formik.values[category].length < 3 && (
                      <button
                        onClick={(e) => addFeature(e, category)}
                        className="plus-btn"
                      >
                        <FaCirclePlus />
                      </button>
                    )}
                </div>
              </Col>
            ))}
          </Row>
        </div>
        {/* Submit */}
        <div className="text-center">
          <Button type="submit" className="custom-btn d-flex btn-3 mb-2" disabled={loading}>
            <span className="d-flex align-items-center" style={{ marginRight: loading ? "5px" : "0" }}>
              Submit
            </span>{" "}
            {loading && <TailSpin color="#fff" height={18} width={18} />}
          </Button> 
        </div>
      </Form>
    </HomePageStyle>
  );
};

export default HomePage;




