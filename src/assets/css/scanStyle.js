import styled from "styled-components";
import scanbg from '../../assets/images/scanbg.jpg'

// ScanHistoryRecordStyle

export const ScanHistoryRecordStyle = styled.section`
.batch {
    margin:10px 0px 20px;
    select{width:150px}
    h4{
        margin:0px;
        padding-right:20px;
        font-weight:normal;
        padding-bottom:4px;
        font-size: 16px;
        font-weight: 500;
    }
  
    .btn{    border-radius: 0;
        padding: 5px 12px;
        margin-right: 3px;}
         .active-batch {
            background: #E7A83E;
            color: white;
        }
}
.qty-t {
  position: relative;
  right: 7px;
}
@media (max-width: ${({ theme }) => theme.breakpoints.small}) {
     .react-datepicker-wrapper{width:100%;}
`;

// ScanDetailPageStyle

export const ScanDetailPageStyle = styled.section`
  width: 100%;
  padding: 4.75rem 0 0 ;
  .History-sec .btn-row-r button:focus {
    background: none;
  }

  .History-sec .btn-row-r button{margin-bottom:10px !important;}

  video{
    border: 1px solid #b5b5b5;
    padding: 20px;
    border-radius: 20px;
    }
  .pagination-data1{
    ul li.activePage a{color:#fff; font-weight:500;}
    a{
      color: #4E4E4E;
    }
  }
  .camera-scan p.padd-0 {
    order: 2;
    width: 100%;
    text-align: center;
}
.upc {
    display: flex;
    justify-content: center;
}
  .react-datepicker-wrapper{
      width:50%;
      padding-right:8px;
      .btn{
        height:36px;
        padding: 0rem 1.875rem;
      }
      input[type="text"] {
        width: 100%;
        outline:none;
   }
  }
  .w-t {
    padding: 5px 14px;
   }

  Table{
    tr{
      th{color:#4b4b4b}
      td{color:#4b4b4b}
    }
  }
  .History-sec {
    background: #FFF7EA;
    padding: 80px 0;
    h3{
      font-size:16px;
    }
    .btn-row-r{
     
    button{border:none; font-size:16px;border-bottom:1px solid;border-radius:0; padding:0;     margin: 0 12px;
    &:hover{
      background:none;
      color:#4b4b4b;
    }
    }
  }
    .date-picker {
    display: flex;
    align-items: center;
    
}
}
  h3{
    font-size: 20px;
  }
  span.value-totals {
    width: 120px;
    display: inline-block;
}
  .carousel-root {
    background: #fffc;
    padding: 50px;
    border-radius: 20px;
    border: 1px solid #e1e1e1;
}
  .scan-deatils {
      padding:80px 0 60px;
   }
  .scan-display {
      padding:40px 0 80px;
  }
  .error-message.mb-3.mobile {
    display: none;
  }
  .scan-row .error-message {
    color: #dc3545;
    font-size: 16px;
    margin-top: 0.5rem;
    display:block;
    text-align: center;
    .error-message{
      margin-top:0px;
    }
  }
  .or-line {
    position: relative;
    width: 8%;
    margin: 24px auto 24px;
    border-top: 1px solid #ccc;
  }
  .use-camera-btn {
    border: none;
    padding: 10px 18px;
    background: #666666;
    color: #ffffff;
    border-radius: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    margin-top:10px;
    font-size: 14px;
    margin-left: 8px;
  }
  .or-line span {
    display: inline-block;
    position: absolute;
    top: 50%;
    background: #fff;
    padding: 0 5px;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%,-50%);
}
  .icon-container svg {
    margin: 4px;
    color: #E99714;
  }
  body.bodyfixed {
    position: fixed;
  }
  .space2 {
    margin: 0px;
    width: 200px;
    display: inline-block;
    text-align: right;
}
.pagination-data1 {
  margin-top: 20px;
}
.eror-cam {
  position: relative;
  top: -30px;
}
  .pagination-data1 a:hover {
    color: #fff;
  }
  .carousel.carousel-slider .control-arrow:hover {
    background: rgba(0,0,0,0.2);
    z-index: -1;
}
.cov {
  display: flex;
  justify-content: space-between;
}

ul.pagination-data {
  display: flex;
  justify-content: center;
  padding: 30px 0 0;
}
  ul.pagination-data li {
    list-style: none;
  }
   ul.pagination-data li a {
    text-decoration: none;
    padding: 6px 17px;
    text-align:center;
    font-weight:bold;
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
  .carousel{
    .slide{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .control-dots {
      .dot.selected {
          background: #E99714;
          opacity: 1;
      }
    }
  }
  .scan-row {
    .btn-3 {
    margin: 0 5px 0px;
    display: flex;
    justify-content: center;
    font-size:16px;
}
.cameraText {
  display: flex;
  flex-direction: column;
}
.cover-area svg {
  margin-left: 5px;
}
}
.image-size img {
  max-width: 150px;
}
.cov .cover {
  width:90%;
  display: flex;
  align-items: center;
  .form-control{
    outline:none;
    box-shadow:none;
  }
}
  .items-row {
  h2 {
    padding: 0 0 0.625rem; 
    text-align:center;  
    font-weight:300;
    font-size:30px;
  }

}
.scan-card6 {
  button {
  margin: 28px 0px 0px 0px;
  
}
svg {
  margin-left: 8px;
  width: 15px;
  height: 15px;
}
}
.sale-price {
  display: flex;
  input{
      margin-left: 10px;
  }
  }
  .apple-arirport{ p {
    margin: 0 0 30px;
    color: #4b4b4b;
    font-size: 18px;
    line-height: 37px;
    padding-left:0px}
}
.images-text {
  color: red;
  font-size: 16px;
  font-weight: 600;
}

  .counter {
    width: 6.25rem; 
  }



  h2 {
     text-align:  center;
     margin-bottom: 60px;
     font-weight:300;
     font-size:40px;
  }

  h4 {
    font-weight: bold;
    color: #4b4b4b;
  }

  p.batch {
    span{
      font-weight: 600;
      padding-left:0px;
      color:#43423E
    }
    margin: 0 0 30px;
    color: #4b4b4b;
  }

  .cover p {
    width: 260px;
    padding: 0;
    margin: 0;
    font-weight: 400;
    color: #43423E;
    font-size: 20px;
  }
  .scan-row video {
    width:100%;
    margin: 0 0 20px;
    border:none;
    padding:0px;
}

  .apple-arirport {
    span{
      font-weight:600;
      padding-left:0px;
      color:#4b4b4b;
    }

    h3 {
      font-weight: bold;
      margin: 0 0 0.75rem; 
      color: #4b4b4b;
    }

    p {
      color: #4b4b4b;
    }
  }

  .average {
    h4 {
      font-weight: bold;
      color: #4b4b4b;
    }
  }
  .cov{
  .btn-3 {
    span {
      width: 95px;
  }
  }
}

  .carousel.carousel-slider {
    padding: 0 0 3.5rem; 
  }

  .carousel .control-dots .dot {
    transition: opacity 0.25s ease-in;
    opacity: 0.3;
    background: #bababa;
    border-radius: 50%;
    width: 0.75rem; 
    height: 0.75rem;
    cursor: pointer;
    display: inline-block;
    margin: 0 0.5rem; 
  }
  .items-row{
  .btn-3{
    margin:0px 5px;
  }
}
.space {
    margin: 0px 30px;
    display: inline-block;
    text-align: left;
    width: 200px
}

@media (max-width: ${({ theme }) => theme.breakpoints.large}) {
      .items-row{
      width: 90%;
      }
    .scan-card6 {
      button {
      margin: 14px 0px 36px 0px;
      justify-content: center;
    }
    }
}
@media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  .export-services-modal .items-row{height:94%; overflow:scroll;}
  .apple-arirport {
      padding: 0 0 32px;
    }
  .featured-product{position:realtive}
  .featured-product .container {
    position: relative;
    z-index: 1;
}
  .History-sec {
               padding: 46px 0;
  }
  .scan-display{padding: 40px 0 30px;}
  .btn-row .btn {
    width: 100%;
}
  .btn-3{    margin: 0;}
            h2 {
              text-align: left;
              margin-bottom: 24px;
              font-size: 30px;
           }
            .scan-deatils {
                padding: 40px 0 0;
            }
         
          .btn-3 {
            margin: 1.25rem 0;
            padding: 0.5rem 1.5rem;
          }
          .apple-arirport p{
              margin:0px;
            }
            .featured-product:after {
            background: #f6f8fad4;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            content: "";
}

}
@media (max-width: ${({ theme }) => theme.breakpoints.small}) {
            padding: 4.75rem 0 0;
            .react-datepicker-wrapper{width:100%;}
            .subbanner {
              h2{
                text-align:center;
              }
            }
            .value-totals {
              width: 20%;
              display: inline-table;
          }
            .History-sec{
              table{}
              padding: 44px 0;
              .btn-row-r {
               padding-top: 20px;
             }
             .space2{
              width: auto;
             }
             .space{
              width: auto;
             }
            }
           
            .or-line {
              margin: 0 auto 24px;
          }
         .qty-t {
            position: relative;
            right: 0px;
        }
            .use-camera-btn{margin-left: 0;}
            .scan-display {
               padding:0;
            }
            p.batch{
              margin: 0 0 30px;
            }
           
            .btn-row {
              margin: 0 0 57px;
            .custom-btn {
              width: 232px;
              margin: 0 auto 22px;
             }
            }
            .btn-3 {
                margin: 1.25rem 0;
            }
            .scan-row {
                margin: 0 0 20px;
            }
            .items-row {
                .btn-3 {
                    margin: 0 5px 10px;
                }
            }
           
            .cov {
                display: block;
                .btn-3{
                  margin:0 auto;
                }
            }
            .cov .cover {
              p{width:100%}
                width: 100%;
                display:block;
                text-align:center;
                margin:0 0 20px;
            }
           
            .error-message.mb-3.desktop {
                display: none;
            }
            .error-message.mb-3.mobile {
                display: block;
            }
            .over {
                overflow-x: scroll;
            }
           
        }
`;

// ManuallyEnter 

export const ManuallyEnterItemStyle = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  height: 100%;
  .items-row button.close-btn{
   border-radius:4px;
  svg{
    width: 0.555em;
    position: absolute;
    top: 0;
    left:5px;
  }
  }
  h2 {
    padding: 0 0 1.25rem; 
  }
  .counter .value {
    border: none;
    outline: none;
}

  .items-row {
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1);
    background: #fff;
    border-radius: 1.25rem;
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    width: 530px;
    .custom-btn{width:auto;}
   .secondary{
    color: #4E4E4E;
    border: 1px solid #4E4E4E;
    &:hover{
      background:#4E4E4E;
      border:1px solid transparent;
      color:#fff;
    }
   }
   

    .dblock {
    display: flex;
    justify-content: center;

    button{
      width:auto;
      span{
        display:flex;
      }
    }
}

    h2{
      padding: 0;
      margin-bottom: 26px;
      font-size: 30px;
    }

    p {
      font-weight: 600;
      line-height: 20px;
      padding: 6px;
      display: flex;
      align-items: center;
      border-radius: 10px;
    }

    .counter {
      margin: 0 0 0.25rem; 
      align-items: center;
    }

    button.close-btn {
      position: absolute;
      right: 0.75rem;
      top: 0.875rem;
      font-size: 1.5rem;
      background: #e99714;
      width: 1.375rem;
      height: 1.375rem;
      text-align: center;
      color: #fff;
      border: none;

      input {
        margin: 0;
      }
    }

    .counter {
      display: flex;

      .btn {
        background-color: #e99714;
        color: #fff;
        padding: 0.375rem 0.75rem;
        border: none;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        border-radius: 0.125rem; 
        line-height: 1.375rem; 
        font-size: 1.375rem;
      }

      .value {
        padding: 0.375rem 0;
        width: 1.875rem; 
        text-align: center;
      }
    }
  }

  label {
    font-weight: 600;
    width: 100%;
  }
  .dblock svg {
    margin-left: 10px;
}
  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    .items-row{
      width: 90%;
      h2{
        font-size: 24px;
      }
    }
    .dblock{disply:block;}
  }
`;

// ExportItemsStyle

export const ExportItemsStyle = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  display:flex;
  align-items:center;
  z-index: 9;
  height: 100%;
  .modal-footer>* {
    margin: calc(var(--bs-modal-footer-gap) * .5);
    color: red;
}
  .export-row {
    margin-bottom: 10px;
    align-items: center;
    background: #efefef;
    padding: 16px;
    border-radius: 16px;
}
 .export-row.ebay-row {
    overflow: auto;
    height: 245px;
}

  h2 {
    padding: 0 0 1.25rem; 
    margin:0;
  }
  .ebayLoader{
    justify-content:center;
    display:flex;
  }
  .items-row {
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1);
    background: #fff;
    border-radius: 1.25rem;
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    width: 530px;
   h2{
    margin-bottom: 20px;
   }
    p {
      font-weight: 500;
      margin:0px;
    }
    .loader-export svg {
      margin: 0px 0px 5px 9px
  }

    .counter {
      margin: 0 0 1.25rem;
    }
    .export-options label {
      padding-left: 5px;
  }

    button.close-btn {
      position: absolute;
      right: 0.75rem;
      top: 0.875rem; 
      font-size: 1.5rem;
      background: #e99714;
      text-align: center;
      color: #fff;
      border: none;

      input {
        margin: 0;
      }
    }
    .loader-export span {
      display: flex;
      align-items:center;
      color:#fff;
  }
    .counter {
      display: flex;

      .btn {
        background-color: #e99714;
        color: #fff;
        padding: 0.375rem 0.75rem; 
        border: none;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        border-radius: 0.125rem; 
        line-height: 1.375rem; 
        font-size: 1.375rem;
      }

      .value {
        padding: 0.375rem 0; 
        width: 1.875rem; 
        text-align: center;
      }
    }
  }

  label {
    font-weight: 500;
    width: 100%;
  }

    @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
      .items-row
      {
        width:90%!important;
        overflow: scroll;
      }
      .export-row.ebay-row{height:auto}
      .text-start.col-sm-6 {
        width: 80%;
    }
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
      .text-start.col-sm-6 {
        width: 100%;
    }
    }
`;

// EditScanHistoryStyle

export const EditScanHistoryStyle = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  z-index: 9;
  height: 100%;
  .items-row button.close-btn{
   border-radius:4px;
  svg{
    width: 0.555em;
    position: absolute;
    top: 0;
    left:5px;
  }
  }
  h2 {
    padding: 0 0 1.25rem; 
  }
  .counter .value {
    border: none;
    outline: none;
}

  .items-row {
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.1);
    background: #fff;
    border-radius: 1.25rem;
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    width: 530px;
    .custom-btn{width:auto;}
   .secondary{
    color: #4E4E4E;
    border: 1px solid #4E4E4E;
    &:hover{
      background:#4E4E4E;
      border:1px solid transparent;
      color:#fff;
    }
   }
   

    .dblock {
    display: flex;
    justify-content: center;
        svg{
            margin-left:10px;
        }
    }

    h2{
      padding: 0;
      margin-bottom: 26px;
      font-size: 30px;
    }

    p {
      font-weight: 600;
      line-height: 20px;
    }

    .counter {
      margin: 0 0 0.25rem; 
      align-items: center;
    }

    button.close-btn {
      position: absolute;
      right: 0.75rem;
      top: 0.875rem;
      font-size: 1.5rem;
      background: #e99714;
      width: 1.375rem;
      height: 1.375rem;
      text-align: center;
      color: #fff;
      border: none;

      input {
        margin: 0;
      }
    }

    .counter {
      display: flex;

      .btn {
        background-color: #e99714;
        color: #fff;
        padding: 0.375rem 0.75rem;
        border: none;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        border-radius: 0.125rem; 
        line-height: 1.375rem; 
        font-size: 1.375rem;
      }

      .value {
        padding: 0.375rem 0;
        width: 1.875rem; 
        text-align: center;
      }
    }
  }

  label {
    font-weight: 600;
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    .items-row{
      width: 90%;
      h2{
        font-size: 24px;
      }
    }
  }
`;

// BarcodeScanPageStyle

export const BarcodeScanPageStyle = styled.section`
width: 100%;
padding:11.75rem 0 6.75rem;
text-align: center;
background: url(${scanbg});
background-repeat:no-repeat;
background-position:center;
background-size:cover;
background-attachment: fixed;
.or-line {
  position: relative;
  width: 60%;
  margin: 24px auto 24px;
  border-top: 1px solid #ccc;
  span{
    display: inline-block;
    position: absolute;
    top: 50%;
    background: #fff;
    padding: 0 5px;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%,-50%);

  }
}
.loading-scan {
  background: #fff;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  transform: translate(-50%,-50%);
  left: 50%;
  z-index: 1;
}
.react-datepicker-wrapper{display:block;}

.date-picker {
  align-items: center;
  max-width: 60%;
  margin: auto;
  h3{
    display: flex;
    svg{
      margin-left:10px;
    }
  }
}

.btn-row {
    display: flex;
    justify-content: center;
}
  .scan-input {
    width: 60%;
    margin:0 auto 20px;
  }
  h2{
    margin: 0 0 30px;
  }
  h3 {
    font-size: 15px;
    color: var(--bs-heading-color);
    text-align: center;
    margin: 0px 0 4px;
    font-weight: 500;
    text-align:left;
   
  }
  .error-message{
    margin-top: 0.5rem;
    display: block;
  }
.scan0-row {
  background:#ffffffd6;
  padding: 40px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius:5px;
  box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
  
}

}

.scan-input-form button {
  display: flex;
  justify-content: center;
  margin-left: 10px;
  height: 40px;
  margin:0 auto;

}

.use-camera-btn {
  border: none;
  padding: 10px 18px;
  background: none;
  color: #666666;
  border-radius: 20px;
  font-weight: 700;
  border:1px solid #666666;
  border-radius:50px;
  &:hover{
    background:#666666;
    color:#fff;
  }
}
.scan-main3s {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

  video {
    border: 0.125rem solid #c9c9c9; 
    border-radius: 2.5rem; 
    padding: 2.5rem;
    width:100%;
  }
  p{padding:10px 0;}

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 7.75rem 0 2.75rem;

  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    h2{font-size:30px;}
    video {
      width: 100% !important;
    }
    form.scan-input-form {
      display: block;
  }
  .scan-input-form button{margin: 0 auto; width:auto}
  .scan-input {
    width: 100%;
    margin: 0 0 20px;
}
.scan0-row{padding: 30px!important;}
  }
`;