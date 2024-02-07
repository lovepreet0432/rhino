import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { TailSpin } from "react-loader-spinner";
import { formatDate } from "../../../utils/common";
import { sendToEbayStore } from "../../../utils/api/accountSetting";

const EbayModal = ({
  categoryId,
  show,
  ebayData,
  scanHistory,
  batchNumber,
  userId,
  accessToken,
  handleClose,
  onClose,
  startDate,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {

    setLoading(true);
    const response = await sendToEbayStore(scanHistory, ebayData, categoryId, userId, accessToken);
    if (response.status == 200) {

      const xmlString = response.data;
      // Parse the XML string
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
  
      // Find the ItemId element
      const ack = xmlDoc.querySelector("Ack");
      const ackValue = ack.textContent;
      if (ackValue == 'Success' ) {
       const itemIdElement = xmlDoc.querySelector("ItemID");
       const itemIdValue = itemIdElement.textContent;
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product Successfully Imported " + itemIdValue,
          customClass: {
            confirmButton: "btn",
          },
        })
          .then(() => {
            onClose();
          })
          .catch((err) => {
            console.log(err, "err");
          });
      }else if (ackValue == 'Warning') {
        setLoading(false);
        const shortMessageElement = xmlDoc.querySelector("LongMessage");
        const shortMessageValue = shortMessageElement.textContent;
        const itemIdElement = xmlDoc.querySelector("ItemID");
        const itemIdValue = itemIdElement.textContent;
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: shortMessageValue + 'Item ID : ' + itemIdValue,
          customClass: {
            confirmButton: "btn",
          },
        });
      } else if (ackValue == 'Failure') {
        setLoading(false);
        const shortMessageElement = xmlDoc.querySelector("ShortMessage");
        const shortMessageValue = shortMessageElement.textContent;
    
        Swal.fire({
          icon: "error",
          title: "Error",
          text: shortMessageValue,
          customClass: {
            confirmButton: "btn",
          },
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
          customClass: {
            confirmButton: "btn",
          },
        });
      }
    }else
    {
      setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid Data. Please check again.",
          customClass: {
            confirmButton: "btn",
          },
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} className="shopify-modal">
      <Modal.Header closeButton>
        <Modal.Title>Please Confirm Ebay Import</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover className="modal-open">
          <tbody>
            <tr>
              <td>Date</td>
              <td>{formatDate(startDate)}</td>
            </tr>
            <tr>
              <td>Batch Number</td>
              <td>{batchNumber}</td>
            </tr>

            <tr>
              <td>No of Products imported </td>
              <td>{scanHistory.length}</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleConfirm} disabled={loading}>
          Confirm {loading && <TailSpin color="orange" height={18} width={18} />}
        </Button>
        <Button
          variant="primary"
          className="custom-btn secondary btn-3"
          onClick={handleClose}
          disabled={loading}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EbayModal;