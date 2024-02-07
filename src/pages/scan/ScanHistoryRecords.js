import React, { useEffect, useState } from "react"
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import Pagination from "react-paginate";
import Swal from "sweetalert2";
import EditScanHistory from "./EditScanHistory";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { formatDate } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import { loadNewBatch, filterScanByDate, deleteParticularScan } from "../../utils/api/scan";
import { TailSpin } from "react-loader-spinner";
import { formatDateInNumber } from "../../utils/common";
import { ScanHistoryRecordStyle } from "../../assets/css/scanStyle";
import { useSelector } from "react-redux";

export const ScanHistoryRecords = ({ isAuthenticated, exportCSV, showScanDetail, handleManuallyEnterItem, handleExportProducts, planFeatures, disableNewBatch, setDisableNewBatch, user, loadData, setLoadData, keys, setKeys, batchNumber, setBatchNumber, paginationKey, setPaginationKey, setStartDate, startDate, scanHistory, setScanHistory }) => {
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(1);
    const [showEditScanPopup, setEditScanPopup] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const currentDate = new Date();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.auth.token);

    const calculateTotalScanPrice = () => {
        const individualScanPrices = scanHistory.map(item => item.price * item.qty);
        return individualScanPrices.reduce((total, price) => total + price, 0).toFixed(2);
    };

    const calculateTotalScanQty = () => {
        return scanHistory.reduce((total, item) => total + item.qty, 0);
    };

    useEffect(() => {
        if (!isEdit) {
            setNumPages(Math.ceil(scanHistory.length / 10));
            setPaginationKey((prevKey) => prevKey + 1);
        }
        setIsEdit(false);
    }, [scanHistory]);

    const handleDateChange = async (date) => {
        setStartDate(date);
        if (date) {
            try {
                setLoading(true);
                const response = await filterScanByDate(formatDate(date), formatDate(currentDate), user.id, accessToken);
                if (response.status === 200) {
                    setLoading(false);
                    navigate(`/scandetail`, {
                        state: { 'filterDate': date },
                    });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        }
    }

    const handleCloseEditPopup = () => {
        setEditScanPopup(false);
    }

    const handleEditScan = (e, record) => {
        e.preventDefault();
        setEditRecord(record);
        setEditScanPopup(true);
    }

    const handleNewBatch = async (e) => {
        e.preventDefault();
        const isKeyZeroEmptyArray = loadData.hasOwnProperty('0') && Array.isArray(loadData['0']) && loadData['0'].length === 0;
        if (isKeyZeroEmptyArray) {
            setBatchNumber(keys[0]);
            setScanHistory(loadData[0]);
            return;
        }
        Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "Are you Sure you want to create New Batch ?",
            showCancelButton: true,
            confirmButtonText: "Yes Sure",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "btn",
                cancelButton: "btn cancel-btn"
            },
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const formattedStartDate = formatDate(startDate);
                        const response = await loadNewBatch(user.id, formattedStartDate, accessToken);
                        if (response.status === 200) {
                            navigate(`/scan`);
                        } else {
                            setError(response.data.message);
                            setTimeout(() => {
                                setError('');
                            }, 3000);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            })
            .catch((error) => {
                console.log(error, 'error');
            });
    }

    const handleDeleteClick = async (e, scan_id) => {
        e.preventDefault();
        Swal.fire({
            icon: "warning",
            title: "Warning!",
            text: "Are you Sure you want to delete this scan ?",
            showCancelButton: true,
            confirmButtonText: "Yes Sure",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "btn",
                cancelButton: "btn cancel-btn"
            },
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const formattedDate = formatDate(startDate);
                    try {
                        const response = await deleteParticularScan(user.id, scan_id, formattedDate, accessToken);
                        if (response.status === 200) {
                            setError('');
                            const groupedScanHistory = response.data.data;
                            if (groupedScanHistory.length != 0) {
                                if ("0" in groupedScanHistory) {
                                    setDisableNewBatch(false);
                                } else {
                                    setDisableNewBatch(true);
                                }
                                const formattedDate = formatDateInNumber(startDate);
                                const keysWithFormattedDate = Object.keys(groupedScanHistory).map(key => formattedDate + key);
                                setLoadData(groupedScanHistory);
                                setKeys(keysWithFormattedDate);
                                const hasBatchNumber = keysWithFormattedDate.includes(batchNumber);
                                let selectedBatch = '';
                                if (hasBatchNumber) {
                                    setBatchNumber(batchNumber);
                                    selectedBatch = batchNumber.substring(8);
                                }
                                else {
                                    setBatchNumber(keysWithFormattedDate[0])
                                    selectedBatch = keysWithFormattedDate[0].substring(8);
                                }
                                setPaginationKey((prevKey) => prevKey - 1);
                                setScanHistory(groupedScanHistory[selectedBatch]);
                            }
                            else {
                                setBatchNumber('');
                                setKeys([]);
                                setScanHistory([]);
                            }
                        }
                        else {
                            setError(response.data.message)
                            setTimeout(() => {
                                setError('');
                            }, 3000);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            })
    }

    const handleBatchNumber = async (e, selectedBatch) => {
        e.preventDefault();
        setBatchNumber(selectedBatch);
        setScanHistory(loadData[selectedBatch.substring(8)]);
    }

    return (
        <ScanHistoryRecordStyle>
            <Container>
                <Row>
                    <Col className="text-start"><h2>Scan History</h2></Col>
                </Row>
                <Row className="justify-content-center">
                    <Col sm={12} className="text-start p">
                        <Row className="align-items-center pb-2">
                            <Col col={6}>
                                <h3>Filter History by Date</h3>
                                <div className="date-picker">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        placeholderText="Select Date" className="form-control"
                                    />
                                    {" "}
                                    {loading && (
                                        <TailSpin height={25} width={25} />
                                    )}
                                </div>
                            </Col>
                            <Col className="text-end btn-row-r">
                                {(!showScanDetail && planFeatures.manuallyEnter == true && formatDate(startDate) == formatDate(currentDate)) && <Button className="custom-btn btn-3" onClick={handleManuallyEnterItem}>
                                    Manually Enter
                                </Button>}
                                {(!showScanDetail && planFeatures.export_options == true && scanHistory && scanHistory.length != 0) && <Button className="custom-btn btn-3" onClick={handleExportProducts}>
                                    Export Products
                                </Button>}
                                {(!showScanDetail && planFeatures.export_to_csv == true && scanHistory && scanHistory.length != 0) && <Button className="custom-btn btn-3" onClick={(e) => { e.preventDefault(); exportCSV(scanHistory) }}>
                                    Export Products
                                </Button>}
                                {isAuthenticated && formatDate(startDate) == formatDate(currentDate) && <Button disabled={scanHistory.length == 0} className="custom-btn btn-3" onClick={handleNewBatch}>
                                    New Batch
                                </Button>}
                            </Col>

                        </Row>
                        <div className="batch">
                            <Row className="align-items-center">
                                <Col sm={6}>
                                    <h4>Batch Number</h4>
                                    <div className="number">
                                        <select
                                            className="form-select"
                                            value={batchNumber}
                                            onChange={(e) => handleBatchNumber(e, e.target.value)}
                                        >
                                            {keys.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Col>
                                <Col sm={6} className="text-md-end">
                                    {error && <p className="error-message">{error}</p>}
                                </Col>
                            </Row>
                        </div>
                        <div className="over">
                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <th>UPC</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Action</th>
                                    </tr>
                                    {scanHistory.length === 0 ? (
                                        <tr>
                                            <td colSpan="5">No data found</td>
                                        </tr>
                                    ) : (
                                        scanHistory.slice((currentPage - 1) * 10, currentPage * 10).map((record) => (
                                            <tr key={record.scan_id}>
                                                <td>{record.scan_id}</td>
                                                <td>{record.title}</td>
                                                <td>${record.price}</td>
                                                <td>{record.qty}</td>
                                                <td>
                                                    <div className="icon-container d-flex">
                                                        <FaPenToSquare
                                                            title="Edit"
                                                            onClick={(e) => handleEditScan(e, record)} // Add the click event handler
                                                            style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        />
                                                        <FaTrash
                                                            title="Delete"
                                                            onClick={(e) => handleDeleteClick(e, record.scan_id)} // Add the click event handler
                                                            style={{ marginRight: '10px', cursor: 'pointer' }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <Col></Col>
                            <Col className="text-end w-t"><span className="space2"><strong>Batch Totals</strong></span><span className="value-totals">${calculateTotalScanPrice()}</span></Col>
                            <Col className="text-end w-t "><span className="space2 qty-t"><strong>Total Qty</strong></span><span className="value-totals">{calculateTotalScanQty()}</span></Col>
                        </div>
                        {showEditScanPopup && <EditScanHistory user={user} setLoadData={setLoadData} startDate={startDate} batchNumber={batchNumber} setIsEdit={setIsEdit} onClose={handleCloseEditPopup} setScanHistory={setScanHistory} record={editRecord} />}
                        {scanHistory.length ?
                            <div className="pagination-data1">
                                <Pagination
                                    key={paginationKey}
                                    className="pagination-data"
                                    pageCount={numPages}
                                    currentPage={currentPage}
                                    activeClassName="activePage"
                                    initialPage={0}
                                    onPageChange={(page) => setCurrentPage(page.selected + 1)}
                                /></div> : ''}
                    </Col>
                </Row>
            </Container>
        </ScanHistoryRecordStyle>
    )
}