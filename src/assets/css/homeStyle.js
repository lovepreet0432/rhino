import styled from "styled-components";
import videoBg from '../../assets/images/vido-bg.jpg'; // Import the videoBg image
import Scanbg from "../../assets/images/scan-bg.jpg";

// HomeBannerStyle.js
export const HomeBannerStyle = styled.section`
  width: 100%;
  padding-top: 11.125rem;
  padding-bottom: 7rem;

  video{
    border-radius: 10px;
    border:none;
    padding:0px;
  }

  a {
  text-decoration: none;
  font-size: 1rem;

  svg {
    path {
      fill: #E7A83E;
    }
  }

  &:hover {
    color: #fff;

    svg {
      path {
        fill: #fff; 
      }
    }
  }
}
  p {
    font-size: 18px;
    color: #4E4E4E;
    line-height: 30px;
    padding:0 0 30px
  }
  h1 {
          font-size: 40px;
          color:#000000;
          font-weight:700;
          font-family:inter;
          span {
          color: #E7A83E;
          }
    }

  
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}){
    padding-top: 7.625rem;
    padding-bottom:3rem;
        h1 {
          font-size: 30px;
          line-height: 2.188rem;
        }
        img{margin:0 0 30px}
    }
  
`;

// FeatureStyle.js
export const FeatureStyle = styled.section`
  width: 100%;
  padding: 4rem 0;
  background: url(${videoBg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .featured-product p:last-child {
    margin: 0;
  }
  h2 {
    padding: 0 0 1.5rem;
    margin: 0;
    color: #323232;
    font-family: Roboto;
    font-size: 40px;
    font-style: normal;
    font-weight: 300;
  }
  video {
    border-radius: 20px;
  }
  .card {
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.10);
    border: none;
    .price {
      color: #e99714;
    }
    p {
      margin: 0;
      padding: 0.3125rem 0 0;
      line-height: 1.5625rem;
    }
    span {
      font-family: 'Poppins';
      font-weight: 600;
      display: block;
      padding: 0.3125rem 0;
    }
    .size-row {
      display: flex;
      border-bottom: 0.0625rem solid #ccc;
      padding: 0.3125rem 0;
      span.spcol {
        padding-right: 3.5rem;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    h2 {
      font-size: 30px;
    }
    video {
      margin: 0 0 20px;
    }
  }
`;

// IntegrationStyle.js
export const IntegrationStyle = styled.section`
  background: #fff;
  padding: 4rem 0;

  h2 {
    color: #323232;
    font-family: Roboto;
    font-size: 40px;
    font-style: normal;
    font-weight: 300;
    line-height: 20px; /* 50% */
    text-align: center;
    padding-bottom: 20px;
  }

  .col-md-2 {
    width: 20%;
  }

  ul {
    padding-left: 0rem;
  }

  ul li {
    text-align: left;
    margin-bottom: 5px;
    position: relative;
    list-style:none;
    position:realtive;
  }

  .logo-shop img {
    width: 67px;
  }

  .logo-shop {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-row {
    padding: 30px 15px 15px;
    border-radius: 10px;
    background: #fff;
    box-shadow:0px 0px 19px 0px rgba(0, 0, 0, 0.08);
    transition: transform 250ms;
    border: none;
    p{
      padding:0;
      margin:0;
    }
    &:hover {
      transform: translateY(-10px);
    }
  }

  .card-row ul {
    padding: 0 0 0 22px;
    margin: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    .col-md-2 {
      flex: 0 0 auto;
      width: 50%;
      margin-bottom:20px
    }

    .col-md-1 {
      flex: 0 0 auto;
      width: 8.33333333%;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
   h2{font-size:30px;}
   .col-md-2 {
    width: 100%;
  }

}`;

// ScannerStyle.js
export const ScannerStyle = styled.section`
width: 100%;
padding:4rem 0;
background: url(${Scanbg});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
.container {max-width:1000px;
  h2{font-size:40px; font-weight:300;color:#fff}
  p{color:#fff; font-size:16px;line-height: 28px;}
  p.leftcontent {padding-right: 50px;}
  .upc {border: 0.0625rem solid #51504A;border-radius: 1.0625rem;background: linear-gradient(180deg, rgba(231,168,62,1) 0%, rgba(208,138,27,1) 100%);padding: 3.0625rem 1.75rem;
  h2{
    font-size:16px;
    font-weight:bold;
  }
  p{padding: 0 0 4px; font-weight:bold;}
  span {display: block; font-size:16px}
  .use-camera {
  border: none;
  background: none;
  padding: 0;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.use-camera {
  text-decoration: underline;
}
.custom-btn{border:1px solid #fff; color:#fff; font-weight:400;
&:hover{
  border:1px solid #E99714; 
}
}
}
}
.error-ms {
  color: red;
  font-size: 0.7rem; 
  font-weight: 500;
  position: relative;
  top: 0.3125rem;
}

.padd-0 {
  margin: 0;
}
a {
  text-decoration: none;
}


.hidePopup {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}
.cam-row {
  background: #f2f2f2;
  padding: 4rem 0;
  width: 100%;
  .padd-0 {
    padding-bottom: 0.625rem;
  }
  
  p {
    font-size: 0.875rem;
    line-height: 1.3125rem;
    margin: 0;
    padding: 0 0 1.875rem;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
  }
}
.cam-row {
  background: #f2f2f2;
  padding: 4rem 0;
  width: 100%;
  .padd-0 {
    padding-bottom: 0.625rem;
  }
  
}
p {
  font-size: 0.8rem;
   line-height: 2.125rem;
}
input {
  width: 100%;
  margin: 0 0 1rem;
}


@media (max-width: ${({ theme }) => theme.breakpoints.large}){
.cam-row{
 margin-top:0;
}
p{
  font-size:1rem;
}
}

@media (max-width: ${({ theme }) => theme.breakpoints.small}){
.cam-row{
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
  padding-left: 0rem;
  padding-right: 0rem;
  .container 
  h2{
    font-size: 30px ;
    line-height: 2.3125rem;
  }
}
  .banner{
    p {
      font-size: 1rem;
    }
}
}
video{width:100% !important}
}`;

// ServiceStyle.js
export const ServiceStyle = styled.section`
padding:4rem 0;
h2 {
  font-weight: 300;
  font-size: 40px;
  text-align: center;
  padding: 0 0 1.5rem;
}
.card-row{
  border-radius: 15px;
  background: #FFF;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.09);
  padding:18px;
  text-align:center;
  transition: transform 250ms;
  &:hover{
    transform: translateY(-10px);
  }
    .product-img 
      img {
        width: 100%;
        margin:0 0 20px;
        border-radius:15px;
        object-fit: cover;
        height: 164px;
      }
      h4{
      color: var(--black, #43423E);
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px; /* 111.111% */
      }
}

.singup {
    background: #ffff;
    box-shadow: 0px 0.0625rem 0.625rem rgba(96, 96, 96, 0.10); 
    border-radius: 0.625rem; 
    border: 0.0625rem solid #e5e5e5; 
    padding: 1.875rem; 
    h2{padding:0}
      svg {
        font-size: 1.3125rem; margin-right: 0.3125rem; 
      }
    p{text-align:center}
}

p.accout-txt {border-top: 0.0625rem solid #D9D9D9;padding-top: 1rem;}

input { background: #F5F5F5;}

      .btn[type="submit"] {
        background-color: #E99714;
        color: #fff;
        padding: 0.625rem 1.875rem; 
        border: none;
        font-size: 0.875rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        border-radius: 0.3125rem; 
        margin: 0 0 0.5625rem;
      }

      .btn-3 {
        width: 100%;
        line-height: 2.625rem; 
        padding: 0;
        border: none;
        margin: 0 0 0.625rem;
        border-radius: 0.25rem; 
      }

      .accout-text, p.accout-txt {
          text-align: center
      }

      label {
          font-weight: 500;
          margin: 0
      }

      .btn {
        border: 0.0625rem solid #D9D9D9;
        background: #fff;
        color: #000;
        width: 100%;
      
        span {
          padding: 0.625rem;
        }
      }
      p {
        font-weight: 400;
        position: relative;
      
        span {
          background: #fff;
          position: relative;
          z-index: 1;
          padding: 0 0.5625rem; 
          color: #9F9F9F;
        }
      }

      span.border-row {
          border-bottom: 0.0625rem solid #ccc;
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          z-index: 0;
      }

    a {
        color: #E99714;
        text-decoration: none;
        font-weight: 600;
    }

@media (max-width: ${({ theme }) => theme.breakpoints.medium}){
         width: 100%;
          background:#fff;
          padding:4rem 0 3rem;
    h4,p{
      text-align: center;
    }
    .singup {
    background: #ededed;
    padding: 1.25rem;
    border-radius: 0.625rem;
    }
    h2 {
    margin: 0;
    font-size:30px;
    
    }
}`;