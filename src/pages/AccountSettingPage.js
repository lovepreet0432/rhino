import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { AccountSettingStyle } from "../assets/css/pagesStyle";

const AccountSettingPage = () => {
  document.title = "Account Settings - Rhinolister";
  return (
    <AccountSettingStyle className="accountsettings">
      <Container>
        <Row>
          <Col sm="12">
            <h2>Account Setting</h2>
          </Col>
        </Row>

        <Row className="align-items-center justify-content-center text-start">
          <Col sm="6">
            <div className="account-seeting p-4">
              <Form className="row">
                {["radio"].map((type) => (
                  <>
                    <div key={`inline-${type}`} className="mb-3 col-sm-6">
                      <div className="tp-label">Shopify</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>

                    <div key={`inline-${type}`} className="mb-3 col-sm-6">
                      <div className="tp-label">Ebay</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>

                    <div key={`inline-${type}`} className="mb-3 col-sm-6">
                      <div className="tp-label">Whatnot</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>

                    <div key={`inline-${type}`} className="mb-3 col-sm-6">
                      <div className="tp-label">Hi-Bid</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>

                    <div key={`inline-${type}`} className="mb-3 col-sm-6">
                      <div className="tp-label">Manifest</div>
                      <Form.Check
                        inline
                        label="Enable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Disable"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  </>
                ))}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </AccountSettingStyle>
  );
};

export default AccountSettingPage;