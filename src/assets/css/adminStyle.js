import styled from "styled-components";

// ContactFormListStyle

export const ContactFormListStyle = styled.section`
ul.pagination-data {
  display: flex;
  justify-content: center;
  padding: 0;
}
table tr td{
    width:500px;
}
.table-scroll {
    overflow-y: hidden;
    width: 100%;
    margin-bottom:20px;
    table{
        width:1000px
    }
}
.pagination-data1 a:hover {
  color: #fff;
}
li.activePage a {
  color: #fff!important;
}
ul.pagination-data li {
  list-style: none;
}
 ul.pagination-data li a {
  text-decoration: none;
  padding: 6px 15px;
}
ul.pagination-data li:hover {
  background: #e99714;
  color:#fff;
  border-radius: 5px;
}
 li.activePage {
  background: #e99714;
  color: #fff;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 5px;
}
li.next.disabled {
  margin-left: 5px;
}
li.previous.disabled {
  margin-right: 5px;
}
.pagination-data1 a {
  color: #4b4b4b;
}
table{
  th{color:#b4b4b}
  td{color:#666}
  svg{cursor:pointer;}
}
* {
  scrollbar-width: 10px;
  scrollbar-color: #b4b4b;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 8px;
  height:8px;
}

*::-webkit-scrollbar-track {
  background: #e5e5e5;
  border-radius: 20px;
}

*::-webkit-scrollbar-thumb {
  background-color: #e99714;
  border-radius: 20px;
}
`;

// HomePageStyle

export const HomePageStyle = styled.section`
form button {
  background: #6f6c6c;
  border: navajowhite;
  border-radius: 20px;
  padding: 5px 15px;
  color: #fff;
  font-weight: 500;
}
.btn-addon button {
  margin-top: 30px;
}
.video-here {
  margin-top: 20px;
}
ul.list-ui {
  padding: 0;
  li {
    list-style: none;
    margin-bottom: 15px;
    display:flex;
  }
  input{
    width: 100%;
    outline: none;
    border: var(--bs-border-width) solid var(--bs-border-color);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: var(--bs-border-radius);
  }
  button{
    border-radius: 4px;
    padding:0;
    width:42px;
    margin-left: 10px;
}

}
.btn{margin:0 auto !important; padding:7px 30px;background-color: #E99714; border:1px solid #E99714;}
.btn-addon{
  button{
    border-radius: 4px;
    padding: 0;
    width: 35px;
    margin-left: 10px;
    text-align: center;
    height: 35px;
    margin-top: 8px;
  }
}
.add-btn{
    border-radius: 4px;
    padding: 0;
    width: 35px;
    text-align: center;
    height: 35px;

} 
.plus-btn{
  border-radius: 4px;
  padding: 0;
  width: 35px;
  text-align: center;
  height: 35px;
}

@media (max-width: ${({ theme }) => theme.breakpoints.small}){
  .service-row{
    position: relative;
    .add-btn{
      right: 0;
       bottom: 21px;
       position: absolute;
    }
  }
  .btn-addon{
    position:relative;
    button{
      margin-left: 0;
      text-align: center;
      height: 35px;
      margin-top: 0;
      margin-bottom:20px;
      
    }
  }
}

`;

// SubscriptionStyle

export const SubscriptionStyle = styled.section`
select {
  appearance: auto;
  background: url('path-to-your-arrow-icon.png') no-repeat right center;
  background-size: 20px; /* Adjust the size as needed */
  padding-right: 30px; /* Adjust the padding to make space for the arrow icon */
  cursor: pointer;
}
.subscription-plan-container:first-child {
  margin: 0px;
}
button{
    display: flex;
    justify-content: end;
    align-items: center;
    span{padding:0 5px}
}
.save-remove-btn.col {
  display: flex;
  justify-content: space-between;
}
.focus-btn{
  border: 1px solid #E7A83E;
  background:#E7A83E;
  color:#fff;
}
`;

// UserSubscriptionStyle

export const UserSubscriptionsStyle = styled.section`
table{
  th{color:#b4b4b}
  td{color:#666}
}`;

// UserListStyle.js

export const UserListStyle = styled.section`
ul.pagination-data {
  display: flex;
  justify-content: center;
  padding: 0;
}
.pagination-data1 a:hover {
  color: #fff;
}
li.activePage a {
  color: #fff!important;
}
ul.pagination-data li {
  list-style: none;
}
 ul.pagination-data li a {
  text-decoration: none;
  padding: 6px 15px;
}
ul.pagination-data li:hover {
  background: #e99714;
  color:#fff;
  border-radius: 5px;
}
 li.activePage {
  background: #e99714;
  color: #fff;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 5px;
}
li.next.disabled {
  margin-left: 5px;
}
li.previous.disabled {
  margin-right: 5px;
}
.pagination-data1 a {
  color: #4b4b4b;
}
table{
  th{color:#b4b4b}
  td{color:#666}
}
`;