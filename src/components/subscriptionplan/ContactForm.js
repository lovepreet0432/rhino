import React from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_BASE_URL } from '../../Constants';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { useFormik } from 'formik';
import { contactFormValidationSchema } from '../../utils/validations';
import { ContactFormStyle}  from '../../assets/css/subscriptionStyle';

const ContactForm = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      description: '',
    },
    validationSchema: contactFormValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post(API_BASE_URL + '/contact-form', {
          user_id: user?.id,
          ...values,
        });

        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Form is submitted Successfully.',
            customClass: {
              confirmButton: 'btn',
            },
          });
          resetForm();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Something went wrong.',
            customClass: {
              confirmButton: 'btn',
            },
          });
        }
      } catch (error) {
        console.error('Submission failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ContactFormStyle className="contact-form">
      <Container>
        <Row className="justify-content-center text-center">
          <Col sm={12} lg={6}>
            <h2>Have a question?</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={12} lg={6}>
            <Form className="text-center" onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Form.Group className="mb-2 col-sm-6" controlId="formGridAddress1">
                  <Form.Control
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-start error-message">{formik.errors.name}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 col-sm-6" controlId="formGridEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formik.values.email}
                    disabled={isAuthenticated}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-start error-message">{formik.errors.email}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-2 col-sm-12" controlId="formGridAddress1">
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.company && formik.errors.company && (
                    <p className="text-start error-message">{formik.errors.company}</p>
                  )}
                </Form.Group>
                <Col sm={12}>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '200px' }}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="text-start error-message">{formik.errors.description}</p>
                  )}
                </Col>
              </Row>
              <Button className="d-flex align-items-center " variant="primary" type="submit" disabled={formik.isSubmitting}>
                <span className="d-flex align-items-center">Submit</span>{' '}
                {formik.isSubmitting && <TailSpin color="#fff" height={18} width={18} />}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </ContactFormStyle>
  );
};

export default ContactForm;