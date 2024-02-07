import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import Pagination from "react-paginate";
import { UserListStyle } from '../../../assets/css/adminStyle';
import { useSelector } from "react-redux";
import { fetchUserList } from "../../../utils/api/admin";
import {formatStringDate} from '../../../utils/common';

const UserList = () => {
  const [userlist, setUserList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const numPages = Math.ceil(userlist.length / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const access_token = useSelector((state) => state.auth.token);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetchUserList(access_token);
      if (response.status === 200) {
        setDataLoading(false);
        const data = await response.data;
        setUserList(data?.users);
      } else {
        setDataLoading(false);
        console.error("Failed to fetch data. Status:", response.status);
      }
    } catch (error) {
      setDataLoading(false);
      console.error("An error occurred while fetching data:", error);
    }
  }

  if (dataLoading) {
    return (
      <div className="loader-container">
        <TailSpin height={40} width={40} />
      </div>
    );
  }

  return (
    <>
      <UserListStyle>
        <div className="profile-sec">
          <h4>User List </h4>
          {userlist.length > 0 && (
            <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {userlist.slice((currentPage - 1) * 10, currentPage * 10).map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatStringDate(user.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <div className="pagination-data1">
              <Pagination
                className="pagination-data"
                pageCount={numPages}
                currentPage={currentPage}
                activeClassName="activePage"
                onPageChange={(page) => setCurrentPage(page.selected + 1)}
              />
            </div>
            </>
            )}
        </div>
      </UserListStyle>
    </>
  );
};

export default UserList;