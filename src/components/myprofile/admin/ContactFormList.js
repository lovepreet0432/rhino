import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Pagination from "react-paginate";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa6";
import { ContactFormListStyle } from '../../../assets/css/adminStyle';
import { getContactForm, deleteContactForm } from "../../../utils/api/admin";
import { useSelector } from "react-redux";

const ContactFormList = () => {
  const [contactFormlist, setContactFormList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const numPages = Math.ceil(contactFormlist.length / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = useSelector((state)=> state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getContactForm(accessToken);
  
      if (response.status === 200) {
        setDataLoading(false);
        setContactFormList(response.data.data);
      } else {
        setDataLoading(false);
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setDataLoading(false);
      console.error('An error occurred:', error.message);
    }
  };
  
  if (dataLoading) {
    return (
      <div className="loader-container">
        <TailSpin height={40} width={40} />
      </div>
    );
  }

  const deleteHandler = async (e, id) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Are you sure you want to delete it?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        customClass: {
          confirmButton: "btn",
          cancelButton: "btn cancel-btn"
        },
      });
  
      if (result.isConfirmed) {
        const response = await deleteContactForm(id, accessToken);
        setContactFormList(response.data.data);
  
      } else {
        console.log('Deletion canceled');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  if (contactFormlist.length === 0) {
    return (
      <div className="loader-container">
        <h3>No data found</h3>
      </div>
    );
  }

  return (
    <>
      <ContactFormListStyle>
        <div className="profile-sec">
          <h4>Contact Form List </h4>
          <div className="table-scroll">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th style={{ width: '10%' }}>Name</th>
                  <th>Email</th>
                  <th style={{ width: '20%' }}>Company</th>
                  <th style={{ width: '40%' }}>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {contactFormlist && contactFormlist.slice((currentPage - 1) * 10, currentPage * 10).map((list, index) => (
                  <tr key={list.id}>
                    <td>{index + 1}</td>
                    <td style={{ width: '10%' }}>{list.name}</td>
                    <td>{list.email}</td>
                    <td style={{ width: '20%' }}>{list.company}</td>
                    <td style={{ width: '40%' }}>{list.description}</td>

                    <td style={{ textAlign: 'center', color: '#4b4b4b' }}><FaTrash
                      title="Delete"
                      onClick={(e) => deleteHandler(e, list.id)} // Add the click event handler
                    /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {contactFormlist.length != 0 ?
            <div className="pagination-data1">
              <Pagination
                className="pagination-data"
                pageCount={numPages}
                currentPage={currentPage}
                activeClassName="activePage"
                onPageChange={(page) => setCurrentPage(page.selected + 1)}
              />
            </div> : ''}
        </div>
      </ContactFormListStyle>
    </>
  );
};

export default ContactFormList;