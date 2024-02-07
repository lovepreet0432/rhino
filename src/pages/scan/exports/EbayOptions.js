import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { getCategories, subCategories } from "../../../utils/api/accountSetting";

const EbayOptions = ({
  ebayData,
  setEbayData,
  setCategoryId
}) => {

  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  const accessToken = useSelector((state)=> state.auth.token);

  //Primary Category
  const [primaryCategories, setPrimaryCategories] = useState([]);
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('');

  const [condition, setCondition] = useState([]);
  const [validationError, setValidationError] = useState('');

  //Sub Categories
  const [subCategoryArray, setSubCategoryArray] = useState({});
  const [subCategoryValues, setSubCategoryValues] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getCategories(user.id, accessToken);
      if (response.status == 200) {
        setLoading(false);
        setPrimaryCategories(response.data.categories);
      }else if (response.status == 401) {
        setLoading(false);
        setValidationError(response.data.error);
      } else {
        setLoading(false);
        setValidationError(response.data.error);
      }
    }
    fetchData();
  }, []);

  const handleCategoryChange = async (e) => {
    if (e.target.value) {
      setSelectedPrimaryCategory(e.target.value);
      setLoading(true);
      const response = await subCategories(user.id, e.target.value, accessToken);
      if (response.status == 200) {
        setLoading(false);
        setSubCategoryArray({});
        setSubCategoryValues({});
        setCondition([]);
        setSubCategoryArray(prevState => ({
          ...prevState,
          [response.data.categoryName]: response.data.categories
        }));
      } else if (response.status == 401) {
        setLoading(false);
        setValidationError(response.data.error);
      }else{
        setLoading(false);
        setValidationError(response.data.error);
      }
    }

  }

  const handleSubCategoryChange = async (index, name, val) => {
    if (val) {
      setLoading(true);
      const response = await subCategories(user.id, val,accessToken);
      if (response.status == 200) {
        setLoading(false);
        setCondition([]);
        if (response.data.condition) {
          setCondition(response.data.condition);
        }

        // Remove keys for indices above the current index
        for (let i = index + 1; i < Object.keys(subCategoryValues).length; i++) {
          const keyToRemove = Object.keys(subCategoryValues)[i];
          setSubCategoryValues((prevState) => {
            const { [keyToRemove]: valueToRemove, ...rest } = prevState;
            return rest;
          });
          setSubCategoryArray((prevState) => {
            const { [keyToRemove]: valueToRemove, ...rest } = prevState;
            return rest;
          });
        }

        setSubCategoryValues(prevState => ({
          ...prevState,
          [name]: val
        }));
        const categories = response.data.categories;
        setCategoryId(val);
        if (categories.length > 0) {
          setSubCategoryArray(prevState => ({
            ...prevState,
            [response.data.categoryName]: response.data.categories
          }));
          setCategoryId('');
        }
      } else {
        setLoading(false);
        setValidationError(response.data.error);
      }
    }
  }

  return (
    <div className="export-row ebay-row">
      <Row>

        <Col sm="6" className="mb-2">
          <p>Format</p>
          <select
            className="form-select"
            value={ebayData.format}
            onChange={(e) => setEbayData({
              ...ebayData,
              format: e.target.value
            })}
          >
            {/* <option value="AUCTION">Auction</option> */}
            <option value="FixedPriceItem">Buy It Now</option>
          </select>
        </Col>
        {ebayData.format == "FixedPriceItem" && (
          <Col sm="6" className="mb-2">
            <p>Set Discount</p>
            <select
              className="form-select"
              value={ebayData.discount}
              onChange={(e) =>
                setEbayData({
                  ...ebayData,
                  discount: e.target.value
                })}
            >
              <option value="0">Select</option>
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((value) => (
                <option key={value} value={value}>
                  {value}%
                </option>
              ))}
            </select>
          </Col>
        )}
      </Row>
      <Row>
        {/* {ebayData.format == "AUCTION" && (
          <>
            <Col sm="6" className="mb-2">
              <p>Auction Duration</p>
              <select
                className="form-select"
                value={ebayData.auctionDuration}
                onChange={(e) => 
                  setEbayData({
                    ...ebayData,
                    auctionDuration:e.target.value
                  })}
              >
                {[1, 3, 5, 7, 10, 30].map((value) => (
                  <option key={value} value={`DAYS_${value}`}>
                    {value} Days
                  </option>
                ))}
              </select>
            </Col>
            <Col sm="6" className="mb-2">
              <p>Starting Bid</p>
              <CurrencyInput
                className="form-control"
                prefix="$"
                name="ebayStartBid"
                decimalsLimit={2}
                allowNegativeValue={false}
                defaultValue={0}
                onValueChange={(value) => {
                  if (value == undefined) {
                    setEbayData({
                      ...ebayData,
                      startBid:0
                    })
                  }
                  if (value <= 1000) {
                    setEbayData({
                      ...ebayData,
                      startBid:value
                    })
                  }
                }}
                value={ebayData.startBid}
              />
            </Col>
          </>
        )} */}

        <Col sm="6" className="mb-2">
          <p>Shipping</p>
          <select
            className="form-select"
            value={ebayData.conditionOfItem}
            onChange={(e) => setEbayData({
              ...ebayData,
              shipping: e.target.value
            })}
          >
            <option value="free">Free</option>
          </select>
        </Col>
        <Col sm="6" className="mb-2">
          <p>Return Policy</p>
          <select
            className="form-select"
            value={ebayData.return}
            onChange={(e) => setEbayData({
              ...ebayData,
              return: e.target.value
            })}
          >
            <option value="30_days">Return Accepted within 30 days</option>
            <option value="false">Not Accepted</option>
          </select>
        </Col>
      </Row>
      {/* <Row>
        <Col sm="6" className="mb-2">
        <p>Shipping</p>
          <select
            className="form-select"
            value={ebayData.conditionOfItem}
            onChange={(e) => setEbayData({
              ...ebayData,
              shipping:e.target.value
            })}
          >
            <option value="free">Free</option>
          </select>
        </Col>
      </Row> */}
      {/* <Row>
        <div className="mt-2">
          <label>
            <input
              type="checkbox"
              checked={ebayData.freeShipping}
              onChange={() => 
                setEbayData({
                  ...ebayData,
                  freeShipping:!ebayData.freeShipping
                })}
            />
            {" Free Shipping"}
          </label>
        </div>
      </Row> */}
      <Row>
        <Col sm="6" className="mb-2">
          <p>Select a Category</p>
          <select
            className="form-select"
            value={selectedPrimaryCategory}
            onChange={handleCategoryChange}
          >
            <option value=""> Select a Category </option>
            {
              primaryCategories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))
            }
          </select>
        </Col>



        {Object.entries(subCategoryArray).map(([name, subCategories], index) => {

          return (
            <Col key={name} sm="6" className="mb-2">
              <div >
                <p>{name}</p>
                <select
                  className="form-select"
                  value={subCategoryValues[name] || ''}
                  onChange={(e) => handleSubCategoryChange(index, name, e.target.value)}
                >
                  <option value="" >Select a category</option>
                  {subCategories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          )
        }
        )}
        {condition.length > 0 && <Col sm="6" className="mb-2">
          <p>Condition of item</p>
          <select
            className="form-select"
            value={ebayData.conditionOfItem}
            onChange={(e) => setEbayData({
              ...ebayData,
              conditionOfItem: e.target.value
            })}
          >
            {condition.map((conditionOption) => (
              <option key={conditionOption.conditionId} value={conditionOption.conditionId}>
                {conditionOption.conditionDescription}
              </option>
            ))}
          </select>
        </Col>
        }
      </Row>
      <div className="ebayLoader">
        {validationError && <div className="error-message">{validationError}</div>}
        {
          loading && (
            <TailSpin color="#E7A83E" height={22} width={22} />
          )}
      </div>

    </div>
  );
};

export default EbayOptions;