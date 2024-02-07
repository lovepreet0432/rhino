
import { styled } from "styled-components";
import scanbg from '../../assets/images/scanbg.jpg';
import contentbg from "../../assets/images/barcode-banner.jpg"

// ContactFormStyle

export const ContactFormStyle = styled.section`
  width: 100%;
  text-align: left;
  background: url(${scanbg});
  background-repeat:no-repeat;
  background-position:center;
  background-size:cover;
  padding: 4rem 0;
  margin-top: 4rem;
  
  form{
    padding:40px;
    background:#fff;
    border-radius:10px;
    input{
      outline:none;
    }
    textarea.form-control{
      outline:none;
    }
  }
  h2 {
    text-align: center;
    font-size: 40px;
    font-weight: 300;

  }
  .error-message{margin-top:0px;}
  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    background-position: left;
    margin-top: 2.5rem;
  }
`;

// ContentStyle

export const ContentStyle = styled.div`
  width: 100%;
  text-align: left;
  background: #e7e7e7;
  padding-top: 7.75rem;
  margin-bottom: 4rem;
  background: url(${contentbg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position:relative;
  .container{
    position:relative;
    z-index:1;
    padding-bottom:40px;
    img{width:70%}
    h2 {
    text-align: left;
    color:#fff;
    font-weight:300;
    font-size:40px;
  }
  p{
    color:#fff;
  }
  }
  &:after{
    background: rgba(0,0,0,0.8);
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
  }
  

  
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding-top: 8.75rem;
    .container
         h2{
          margin:0;
          font-size:30px;
         }
  }
`;