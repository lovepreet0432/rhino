import styled from "styled-components";
import scanbg from '../images/scanbg.jpg';
// AccountSettingPage

export const AccountSettingStyle = styled.section`
  width: 100%;
  padding: 10.75rem 0 6.25rem; 

  h2 {
    padding: 0 0 1.25rem; 
    text-align: center;
  }

  .account-seeting {
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1); 
    border: none;
    border-radius: 0.3125rem; 

    .form-check-input[type="radio"] {
      border-radius: 50%;
      border: 0.0625rem solid #ccc; 
    }

    .tp-label {
      padding: 0 0 0.625rem; 
      font-weight: bold;
      font-size: 1rem; 

      img {
        padding-right: 0.3125rem; 
      }
    }
  }
`;

// EmailVerifyStyle

export const EmailVerifyStyle = styled.section`
  padding: 12.5rem 0; 
  text-align: center;
  
  a:hover {
    color: #fff;
  }

  .email-verify {
    border: 0.0625rem solid #d2cccc; 
    width: 50%;
    text-align: center;
    display: block;
    border-radius: 0.9375rem; 
    padding: 2.5rem 5px; 
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 10.5rem 0;
     .email-verify {
      width: 95%;
      padding: 2.5rem 5px;
  }
  
  }
`;

// HomePageStyle

export const HomePageStyle = styled.section`
  min-height:400px;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader-container{    position: static;    transform: inherit;}
`;

// MyProfileStyle

export const MyProfileStyle = styled.section`
  width: 100%;
  padding: 6.75rem 0 5.75rem; 
  background: url(${scanbg});
  background-repeat:no-repeat;
  background-position:center;
  background-size:cover;
  background-attachment: fixed;

  
  .active-link {
    color: #E99714; 
    font-weight: bold; 
  }
  .container .left-sidebar .nav-link:hover {
    background: rgb(233, 151, 20);
    color: rgb(255, 255, 255);
}
.container .left-sidebar a.active {
  background: rgb(233, 151, 20);
  color: rgb(255, 255, 255);
}
  .container {
    padding: 3.125rem; 
    border-radius: 0.625rem; 

    .bass-row {
      padding: 0.875rem; 
      border-radius: 0.625rem; 
    }

    .nav-link span {
      padding-right: 0.625rem;
      font-size: 1.125rem;
    }

    .rgt-row {
      background: #fff;
      padding: 1.875rem; 
      border-radius: 0.625rem; 
      box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1); 

      .nav-pills {
        background: #ededed;
      }
    }

    h2 {
      padding: 0 0 1.875rem; 
      font-size: 1.5625rem;
      font-weight: 600;
      color: #4b4b4b;
      text-align: center;
    }
    h4 {
      font-size: 1.125rem;
      font-weight: 500;
      font-size: 18px;
      padding: 0 0 12px;
      margin:0px;
}

    .left-sidebar {
      background: #ffffffd6;
      padding: 0.875rem; 
      border: 0.0625rem solid #e7e7e7; 
      box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1); 

      a{text-decoration:none;
        padding:7px 10px;
        display:block;
        &:hover {
          background: #E99714;
          color:#fff;
          span{
            color:#fff;
          }
        }
        span{padding-right:10px;
          font-size: 17px;
          color: #5a5a5a;
        }
      }
      a.active {
        background: #e99714;
        color: #fff;
        span{
          color:#fff;
        }
      }

      .nav-link {
        color: #4b4b4b;
        border-radius: 0px;
        padding: 12px 12px;
        background:#f1f1f1;
        border-bottom:1px solid #fff;
      }

      .nav-link:hover {
        background: #e99714;
        color: #fff;
      }
    }

    .tab-content {
      background: #fff;
      border-radius: 0.625rem; 
      padding: 1.875rem; 
      box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1); 
    }
    .profile-sec {
        background:#ffffffd6;
        padding:30px;
        box-shadow:0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1);
        margin:0 0 30px;
    }

    .profile-pic {
      .profile-row {
        display: flex;
        align-items: center;
        button {
          margin: 0px 0.3125rem; 
        }

        .imgprofile {
          width: 9.125rem; 
          height: 9.125rem; 
          margin-right: 1.875rem; 
          border: 0.0625rem solid #cccc; 
          border-radius: 6.25rem; 
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 0;
        }

        img {
          max-width: 100%;
        }
      }
    }

    .account-setting {
      text-align: left;
    }

    .tp-label {
      padding: 0 0 0.625rem; 
    }

    .accountCard {
      border: 0.0625rem solid #e6e6e6; 
      padding: 1.25rem; 
      box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1); 
      border-radius: 0.3125rem; 
    }
  }

  .btn {
    margin: 0 0.625rem !important;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints. large}) {
    .container{
 
      .tab-content{
      margin-top: 15px;
    }

    .col-sm-3{
      width: 100%
    }
    .col-sm-9{
      width: 100%
    }
    .col-sm-6{
      width: 100%
    }
    .custom-btn {
      justify-content: start!important;
      margin: unset!important;
    }

  .profile-row button {
    padding: 10px 17px;
}
    .left-sidebar{margin: 0 0 26px;}
    }
    
}
  @media (max-width: ${({ theme }) => theme.breakpoints. medium}) {   
    padding: 7.75rem 0 2.25rem;
    
    .container{
      padding: 2.125rem;
      .tab-content{
      padding: 1rem;
    }
      .profile-pic {
        .remove-bt {
          position: relative;
          top: 15px;
      }
        button{
          width: 240px;
            display: flex;
            justify-content: center!important;
        
        }
        .remove-bt1 {
          position: relative;
          top: 5px;
      }
      
      .profile-row{
        display:block;
        .btn{
          margin:auto!important;
        }
      }
      .imgprofile{
        margin:10px  auto!important;
      }
     
    }
  }
 
  }

  @media (max-width: ${({ theme }) => theme.breakpoints. small}) {
    .container {
      padding: 1rem;
  }
  }
`;

// NotFoundStyle

export const NotFoundStyle = styled.section`
  padding: 12.5rem 0;
  text-align: center;

  a:hover {
    color: #fff;
  }
`;

// PaymentStyle

export const PaymentStyle = styled.section`
width: 100%;
padding: 9.75rem 0 6.25rem; 
width: 100%;
padding: 130px 0 70px;
background: url(${scanbg});
background-repeat:no-repeat;
background-position:center;
background-size:cover;
background-attachment: fixed;

h2 {
  padding: 0 0 1.25rem; 
  font-size: 40px;
  font-weight: 300;
}
.free-btn {
  text-align: end;
}
.payment-profile-btn {
  text-align: right;
  display:flex;
  justify-content: end;
  align-items: start;
}

.payment-profile-btn .btn-3{
width:auto;
display: flex;
margin:inherit;
}
.payment-row {
  padding:0; 
  border: 0.0625rem solid #e3e3e3;
  border-radius: 0.625rem; 
  background: #fff;
  box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.10);
  h2{font-weight:bold;}
  ul{
    list-style: none;
  padding: 0px;
  margin: 22px 0 3.75rem;
  position: relative;
  li {
    list-style: none;
  margin: 0 0 0.875rem;
  display: flex;
  span{
    svg{
      color: #e99714;
  font-size: 1.125rem;
  margin-right: 0.625rem;
    }
  }
  }
  }
  h2 {
    font-size: 1.125rem; 
    color: #666;
    padding: 0 0 0.625rem; 
    margin-bottom: 0.875rem;
  }
  .persanl.absyello {
  background: #faf5ed;
  height: 100%;
  padding: 36px;
 }
 .persanl {
  padding: 31px;
 }
 .subtotal {
  font-weight: 600;
}
.btn-row {
  text-align: right;
}
}

.imgpayment {
  width: 100%;
  height: 16.75rem; 
  background: #e3e3e3;
}

.subtotalrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid #959595;
  border-bottom: 1px solid #959595;
  margin-bottom: 30px;

  .card-image {
    background: url([../card-image.png]);
  }
  

}

.btn-3 {
  width: 100%;
  margin-top: 0.625rem; 
}

.form-control {
  font-size: 0.875rem; 
}
.btn-row{
button {
  margin: 29px 0 0;
  &:hover{
    background: #bf7500;
    color: #fff;
    }
}
}
.StripeElement.StripeElement--empty {
  border: 1px solid #959595;
  padding: 10px;
  border-radius: 6px;
  background: #fff;
}

@media (max-width: ${({ theme }) => theme.breakpoints.small}) {
  padding-top: 8.75rem;
}
`;

// ServerErrorStyle

export const ServerErrorStyle = styled.section`
width: 100%;
padding: 10.75rem 0 6.25rem;
text-align: center;

h2 {
  font-size: 3.125rem;
  text-align: center;
}

p {
  margin: 0;
}

span {
  font-size: 4.75rem;
  color: #e99714;
  display: block;
  padding: 3.125rem 0;
}

.payment-row {
  padding: 3.125rem;
  background: #f1f1f1;
}

.imgpayment {
  width: 100%;
  height: 18.75rem;
  background: #fff;
}

.subtotalrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.btn {
  margin-top: 0.625rem;
}

.btn:hover {
  background: #e99714;
  color: #fff;
  background: #bd7400;
}

.form-control {
  font-size: 0.875rem;
}
`;

// SubscriptionPlanStyle
export const SubscriptionPlanStyle = styled.section`
width: 100%;
padding: 0;
position: relative;

.plan.current-plan {
  background: #fff1db;
}
h2 {
  padding: 0 0 1.25rem;
}
.loader-contain {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.plan {
  background: #fff;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.09);
  border: none;
  padding: 1.75rem;
  height: 100%;
  border-radius: 16px;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
  p {
    color: #4b4b4b;
    padding: 0 0 0.625rem;
    margin: 0px;
    font-weight: 400;
  }
  .price-row {
    margin: 0 -1.75rem 0.875rem;
    padding: 0.9375rem 1.75rem;
    display: flex;
    background: #fff0d7;
    h2 {
      text-align: left;
      font-weight: bold;
      font-size: 1.875rem;
      margin: 0px;
      padding: 0;
      color: #e99714;
    }
    p {
      margin: 0px;
      padding: 0;
      color: #4e4e4e;
      margin-left: 0.2rem;
      padding-bottom: 0rem;
      margin-top: 0.4rem;
      font-weight: bold;
    }
  }
  .del-text p {
    font-weight: 600;
  }
  ul {
    list-style: none;
    padding: 0px;
    margin: 0px 0 3.75rem;
    position: relative;
    li {
      list-style: none;
      margin: 0 0 0.875rem;
      display: flex;
      span svg {
        color: #e99714;
        font-size: 1.125rem;
        margin-right: 0.625rem;
      }
    }
  }

  .btn-3 {
    width: 100%;
  }

  .del-text {
    min-height: 19.875rem;
  }
}
.loader-container {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.swal2-cancel {
  padding: 6px 17px;
}
@media (max-width: ${({ theme }) => theme.breakpoints.small}) {
  video {
    width: 100% !important;
  }
}
`;

// ThankyouStyle

export const ThankyouStyle = styled.section`
width: 100%;
padding: 10.75rem 0 6.25rem;
text-align: center;

h2 {
  font-size: 3.125rem;
  text-align: center;
}

p {
  margin: 0;
}

span {
  font-size: 4.75rem;
  color: #e99714;
  display: block;
  padding: 3.125rem 0;
}

.payment-row {
  padding: 3.125rem;
  background: #f1f1f1;
}

.imgpayment {
  width: 100%;
  height: 18.75rem;
  background: #fff;
}

.subtotalrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.btn {
  margin-top: 0.625rem;
}

.btn:hover {
  background: #e99714;
  color: #fff;
  background: #bd7400;
}

.form-control {
  font-size: 0.875rem;
}
`;

// PrivacyPolicyStyle

export const PrivacyPolicyStyle = styled.section`
  padding: 10.75rem 0 3.75rem;
`;