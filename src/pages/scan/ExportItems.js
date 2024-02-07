import React, { useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import Papa from 'papaparse';
import { useSelector } from 'react-redux';
import WhatNot from "./exports/WhatNot";
import CurrencyInput from 'react-currency-input-field';
import { calculateDiscountedPrice, currentDateInFormat } from "../../utils/common";
import ShopifyModal from "./exports/ShopifyModal";
import EbayModal from "./exports/EbayModal";
import EbayOptions from "./exports/EbayOptions";
import { ExportItemsStyle } from "../../assets/css/scanStyle";

const ExportItems = ({ batchNumber, scanHistory, onClose, userId, startDate }) => {
  const accessToken = useSelector((state)=> state.auth.token);
  const serviceOptions = useSelector((state) => state.accounts);
  const [selectedExportOption, setSelectedExportOption] = useState('');
  const [showShopifyModal, setShowShopifyModal] = useState(false);
  const [showEbayModal, setShowEbayModal] = useState(false);
  const [categoryId,setCategoryId]=useState('');

  const allServicesAreDisable = Object.entries(serviceOptions).every(
    ([key, value]) => key === 'seller' || key === 'sellerCode' || value === 'disable'
  );

  //Shopify Options
  const [shopifyData, setShopifyData] = useState({
    discount: 0
  });

  //Ebay Options
  const [ebayData, setEbayData] = useState({
    conditionOfItem: '1000',
    format: 'FixedPriceItem',
    auctionDuration: 'DAYS_1',
    startBid: 0,
    discount: 0,
    shipping:'free',
    return:'30_days'
    // freeShipping: false
  });

  //whatNot Options
  const [whatNotData, setwhatNotData] = useState({
    category: '',
    subCategory: '',
    shippingProfile: '',
    hazmat: '',
    type: '',
    discount: 0,
    startBid: 0
  });

  //Hibid Options
  const [hibidData, setHibidData] = useState({
    startBid: 0
  });


  const exportCSV = (name = '') => {
    try {

      let csvData = [];
      let headers = [];
      let filename = '';
      let newprice = '';

      const formattedDate = currentDateInFormat();

      if (name == 'whatNot') {
        let totalImageLength=0;
        csvData = scanHistory.map((record) => {
          let imageUrls = [];
          let images = record?.product_info?.Images||[];
            if(totalImageLength<images.length)
            {
              totalImageLength=images.length;
            }
          // Assuming you want to add URLs for the first two images, adjust the loop accordingly
          if(images){
            for (let i = 0; i < images.length; i++) {
                imageUrls.push(images[i]);
            }
          }
          if (whatNotData.type === 'Buy It Now') {
            newprice = calculateDiscountedPrice(record.price, whatNotData.discount);
            filename = `BuyItNow_Export_${formattedDate}`;
          } else if (whatNotData.type === 'Auction') {
            newprice = whatNotData.startBid;
            filename = `Auction_Export_${formattedDate}`;
          } else if (whatNotData.type === 'Giveaway') {
            filename = `Giveaway_Export_${formattedDate}`;
          }

          return [
            whatNotData.category,
            whatNotData.subCategory,
            record.title,
            record?.product_info?.Desc.substring(0, 999),
            1,
            whatNotData.type,
            whatNotData.type === 'Giveaway' ? '' : newprice ? Math.round(newprice) : Math.round(record.price),
            whatNotData.shippingProfile,
            false,
            false,
            whatNotData.hazmat,
            ...imageUrls
          ]
        });
        let dynamicHeaders = ["Category", "Sub Category", "Title", "Description", "Quantity", "Type", "Price", "Shipping Profile", "Gradable", "Offerable", "Hazmat"];
        for (let i = 1; i <= totalImageLength; i++) {
          dynamicHeaders.push(`Image URL ${i}`);
        }
        headers = dynamicHeaders;

      }  else if (name == 'hibid') {
        filename = `Hibid_Export_${formattedDate}`;
        csvData = scanHistory.map((record, index) => [
          index + 1,
          index + 1,
          1,
          record.title,
          record.product_info.Desc,
          serviceOptions.seller,
          serviceOptions.sellerCode,
          hibidData.startBid
        ]);
        headers = ["LotNumber", "SaleOrder", "Quantity", "Lead", "Description", "Seller", "SellerCode", "StartBidEach"];
      } else {
        filename = `Batch_${batchNumber}_Export`;
        csvData = scanHistory.map((record) => [
          record.scan_id,
          record.title,
          record.product_info.Desc,
          record.qty,
          record.price
        ]);
        headers = ["UPC", "Title", "Description", "Quantity", "Price"];
      }

      // Add the headers as the first row
      csvData.unshift(headers);
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Your browser does not support downloading CSV files.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: 'An error occurred while exporting CSV',
        customClass: {
          confirmButton: "btn",
        },
      })
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (selectedExportOption == '') {
      return;
    }
    if (selectedExportOption == 'shopify') {
      setShowShopifyModal(true);
    }
    else if (selectedExportOption == 'eBay') {
      if(categoryId=='')
      {
        return;
      }
      setShowEbayModal(true);
    }
    else {
      if (selectedExportOption == 'whatNot') {
        exportCSV('whatNot');
      } else if (selectedExportOption == 'hibid') {
        exportCSV('hibid');
      }
      else {
        exportCSV();
      }
      onClose();
    }
  }
let dynamicClass='';
if(selectedExportOption=='eBay'||selectedExportOption=='whatNot')
{
  dynamicClass='export-services-modal';
}
console.log(selectedExportOption,'werrrrrrr')
  return (
    <ExportItemsStyle className={`manually-section ${dynamicClass}`}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} className="text-start">
            <div className="items-row p-4">
              <Col sm={12}>
                <h2>Select Option to Export</h2>
                <button className="close-btn" onClick={onClose}>
                  <FaXmark />
                </button>
              </Col>
              <div>
                <ShopifyModal startDate={startDate} show={showShopifyModal} batchNumber={batchNumber} scanHistory={scanHistory} userId={userId} accessToken={accessToken} shopifyData={shopifyData} handleClose={() => setShowShopifyModal(false)} onClose={onClose} />
                <EbayModal categoryId={categoryId} ebayData={ebayData} startDate={startDate} show={showEbayModal} batchNumber={batchNumber} scanHistory={scanHistory} userId={userId} accessToken={accessToken} handleClose={() => setShowEbayModal(false)} onClose={onClose} />
              </div>
              {allServicesAreDisable ?
                <div className="text-center">
                  <p>Please enable your export services from Account settings.</p>
                </div>
                : <Form>
                  {serviceOptions.shopify === 'enable' && (
                    <>
                      <div className="export-options d-flex pb-2">
                        <Form.Check
                          name="export"
                          type="radio"
                          id="shopify"
                          value="enable"
                          checked={selectedExportOption == 'shopify'}
                          onChange={() => setSelectedExportOption('shopify')}
                        />
                        <label htmlFor="shopify">Shopify</label>
                      </div>
                      {selectedExportOption === 'shopify' && (
                        <div className="export-row">
                          <Row>
                            <Col sm="6" className="mb-2"><p>Set Discount</p>
                              <select
                                className="form-select"
                                value={shopifyData.discount}
                                onChange={(e) =>
                                  setShopifyData({
                                    ...shopifyData,
                                    discount: e.target.value
                                  })}
                              >
                                <option value="0">Select</option>
                                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
                                  <option key={value} value={value}>
                                    {value}%
                                  </option>))}
                              </select>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </>
                  )}
                  {serviceOptions.ebay === 'enable' && (
                    <>
                      <div className="export-options d-flex pb-2">
                        <Form.Check
                          name="export"
                          type="radio"
                          id="eBay"
                          value="enable"
                          checked={selectedExportOption == 'eBay'}
                          onChange={() => setSelectedExportOption('eBay')}
                        />
                        <label htmlFor="eBay">eBay</label>
                      </div>
                      {selectedExportOption === 'eBay' &&
                        <EbayOptions setCategoryId={setCategoryId} ebayData={ebayData} setEbayData={setEbayData} />
                      }
                    </>
                  )}

                  {serviceOptions.whatnot === 'enable' && (
                    <>
                      <div className="export-options d-flex pb-2">
                        <Form.Check
                          id="whatNot"
                          name="export"
                          type="radio"
                          value="enable"
                          checked={selectedExportOption == 'whatNot'}
                          onChange={() => setSelectedExportOption('whatNot')}
                        />
                        <label htmlFor="whatNot">WhatNot</label>
                      </div>
                      {selectedExportOption === 'whatNot' &&
                        <WhatNot whatNotData={whatNotData} setwhatNotData={setwhatNotData} />
                      }
                    </>
                  )}
                  {serviceOptions.hibid === 'enable' && (
                    <>
                      <div className="export-options d-flex pb-2">
                        <Form.Check
                          id="hibid"
                          name="export"
                          type="radio"
                          value="enable"
                          checked={selectedExportOption == 'hibid'}
                          onChange={() => setSelectedExportOption('hibid')}
                        />
                        <label htmlFor="hibid">Hibid</label>
                      </div>
                      {selectedExportOption === 'hibid' &&
                        <div className="export-row">
                          <Row>
                            <Col sm="6" className="mb-2"><p>Starting Bid</p>
                              <CurrencyInput
                                className="form-control"
                                prefix="$"
                                name="hibidStartBid"
                                decimalsLimit={2}
                                allowNegativeValue={false}
                                defaultValue={0}
                                onValueChange={(value) => {
                                  if (value == undefined) {
                                    setHibidData({
                                      ...hibidData,
                                      startBid: 0
                                    })
                                  }
                                  if (value <= 1000) {
                                    setHibidData({
                                      ...hibidData,
                                      startBid: value
                                    })
                                  }
                                }}
                                value={hibidData.startBid}
                              />
                            </Col>
                          </Row>
                        </div>
                      }
                    </>
                  )}
                  {serviceOptions.manifest === 'enable' && (
                    <div className="export-options d-flex pb-2">
                      <Form.Check
                        id="manifest"
                        name="export"
                        type="radio"
                        value="enable"
                        checked={selectedExportOption == 'manifest'}
                        onChange={() => setSelectedExportOption('manifest')}
                      />
                      <label htmlFor="manifest">Manifest</label>
                    </div>
                  )}
                  <div className="loader-export">
                    <Button type="submit" onClick={submitHandler} className="mt-4" style={{ background: '#E99714', border: 'none', color:'#fff' }}>
                      Submit
                    </Button>
                  </div>
                </Form>}
            </div>
          </Col>
        </Row>
      </Container>
    </ExportItemsStyle>
  );
};

export default ExportItems;