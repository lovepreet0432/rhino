import styled from "styled-components";
import scanbg from '../../assets/images/scanbg.jpg';
import passwordIcon from "../../assets/images/password.svg";
import username from "../../assets/images/user.svg";
import emailicon from "../../assets/images/email.svg";
import password from "../../assets/images/password.svg";


// Shared Background Styling
const backgroundStyling = `
    width: 100%;
    padding: 130px 0 70px;
    background: url(${scanbg});
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    background-attachment: fixed;
`;

// LoginStyle
export const LoginStyle = styled.section`
  ${backgroundStyling}

  h2 {
    padding: 0 0 20px;
    text-align: center;
  }
  .icon {
    position: absolute;
    top: 8px;
    left: 15px;
}
  .login {
    box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
    border: none;
    border-radius: 5px;
    background: #ffffffd6;

    label {
      font-weight: 600;
    }
    input#formPlaintextEmail {
      padding-left: 42px;
    }
    input#formPlaintextPassword {
      padding-left: 42px;
    }
    button {
         width: 100%;
        display: flex;
        justify-content: center;
        opacity: 1;
        border: 1px solid #e99714;
        &:hover{
          color:#fff;
        }
    }

    .forgotPassword {
      text-align: end;
      position: relative;
      top: -18px;
      font-size: 14px;
    }
    p {
      position: relative;
      margin-bottom: 5px;
      text-align: center;
      font-size:14px;
      font-weight:bold;
      margin-top:0px;
    }

    span.border-row {
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index: 0;
    }
  }
  span.or {
    background: #fff;
    z-index: 1;
    position: relative;
  }
  .pass-log {
    position: relative;
  }
  .pass-log .password-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  #formPlaintextEmail::placeholder {
    font-size: 13px;
  }
  #formPlaintextPassword::placeholder {
    font-size: 13px;
  }

  a {
    color: #E99714;
    text-decoration: none;
    font-weight: 600;
}
 .btn:first-child:active{color:#E7A83E !important;}

  @media (max-width: ${({ theme }) => theme.breakpoints.small}){
    padding: 6.75rem 0 2.25rem;
    .login {
      padding: 21px;
  }

`;

// RegisterStyle

export const RegisterStyle = styled.section`
  ${backgroundStyling}

  h2 {
    padding: 0 0 20px;
    text-align: center;
  }
  .icon {
    position: absolute;
    top: 8px;
    left: 15px;
}
.login .ps-1 {
  position: absolute;
  top: 10px;
  right: 14px!important;
}
a {
  color: #E99714;
  text-decoration: none;
  font-weight: 600;
}
  .login {
    box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
    border: none;
    border-radius: 5px;
    background: #ffffffd6;
    label {
      font-weight: 600;
    }
    input#formPlaintextEmail {
      padding-left: 42px;
    }
    input#formPlaintextPassword, input#formPlaintextConfirmPassword {
      background-image: url(${passwordIcon});
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    input#formPlaintextName {
      background-image: url(${username});
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    #formPlaintextConfirmPasswordIcon {
      background-image: url(${passwordIcon});
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    .password-toggle {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      cursor: pointer;
    }

  
    .password-icon {
      position: absolute;
      top: 10px;
      right: 25px;
    }

    Button {
      border: 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      opacity: 1;
      border: 1px solid #e99714;
        &:hover{
          color:#fff;
        }
    }
    p {
      position: relative;
      margin-bottom: 5px;
      font-size:13px;
      font-weight:bold;
      line-height:20px;
   
    }
    span.or {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 0 9px;
      color: #9f9f9f;
    }
    span.border-row {
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index: 0;
    }
  }
  .password-icon {
    position: absolute;
    top: 5px;
    right: 21px;
  }
  #formPlaintextConfirmPassword {
    position: relative;
    padding-left:42px;
  }
  #formPlaintextName::placeholder {
    font-size: 13px;
  }
  #formPlaintextEmail::placeholder {
    font-size: 13px;
  }
  #formPlaintextConfirmPassword::placeholder {
    font-size: 13px;
  }
  #formPlaintextPassword::placeholder {
    font-size: 13px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.small}){
    padding: 6.75rem 0 2.25rem;

    .login {
      padding: 21px;
  }
  }
 
`;

// AdminLoginStyle

export const AdminLoginStyle = styled.section`
  ${backgroundStyling}
  h2 {
    padding: 0 0 20px;
    text-align: center;
  }
  .icon {
    position: absolute;
    top: 8px;
    left: 15px;
}
 .password-icon {
  position: absolute;
  top: 10px;
  right: 25px;
}

  .login {
    box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
    border: none;
    border-radius: 5px;
    background: #fff;
    label {
      font-weight: 600;
    }
    input#formPlaintextEmail {
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    input#formPlaintextPassword {
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    button {
        width: 100%;
       display: flex;
       justify-content: center;
       opacity: 1;
       border: 1px solid #e99714;
       &:hover{
         color:#fff;
       }
   }
    p {
      position: relative;
      margin-bottom: 5px;
      text-align: center;
    }

    span.border-row {
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index: 0;
    }
  }
  span.or {
    background: #fff;
    z-index: 1;
    position: relative;
  }
`;

// ForgotPasswordStyle

export const ForgotPasswordStyle = styled.section`
  ${backgroundStyling}
  h3 {
    padding: 0 0 20px;
    text-align: center;
  }
  .form-control.is-invalid {
    background: none;
}
  .icon {
    position: absolute;
    top: 8px;
    left: 15px;
}
  .login {
    box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
    border: none;
    border-radius: 5px;
    background: #ffffffd6;
    label {
      font-weight: 600;
    }
    input#formPlaintextEmail {
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
  

    p {
      position: relative;
      margin-bottom: 5px;
      text-align: center;
    }

    span.border-row {
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index: 0;
    }
    button{display:flex; align-items:center;
    svg{margin-left:10px;}
    }
  }
  span.or {
    background: #fff;
    z-index: 1;
    position: relative;
  }
  .sc-dmRblv button {
    width: auto;
    margin: auto;
    border: none;
  }
  .loader-bt {
    display: flex;
  }
  .loader-bt {
    svg {
      margin-left: 10px;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.small}){
    .login {
      padding: 21px;
  }
  
`;

// ResetPaddwordStyle

export const ResetPasswordStyle = styled.section`
  ${backgroundStyling}
  h3 {
    padding: 0 0 20px;
    text-align: center;
  }
  .login {
    box-shadow: 0px 1px 10px rgba(96, 96, 96, 0.1);
    border: none;
    border-radius: 5px;
    background: #fff;
    label {
      font-weight: 600;
    }
    input#formPlaintextEmail {
      background-image: url(${emailicon});
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }
    input#formPlaintextPassword {
      background-image: url(${password});
      background-repeat: no-repeat;
      background-position: 14px center;
      padding-left: 42px;
    }

    p {
      position: relative;
      margin-bottom: 5px;
      text-align: center;
    }

    span.border-row {
      border-bottom: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      z-index: 0;
    }
  }
  span.or {
    background: #fff;
    z-index: 1;
    position: relative;
  }
  .sc-dmRblv button {
    width: auto;
    margin: auto;
    border: none;
  }
  .loader-bt {
    display: flex;
  }
  .loader-bt {
    svg {
      margin-left: 10px;
    }
  }
  .pass-ab {
    position: relative;
}

 .pass-ab .password-icon {
  position: absolute;
  top: 45px;
  right: 21px;
}
.pass-ab2 {
  position: relative;
}
.pass-ab2 .password-icon {
  position: absolute;
  top: 10px;
  right: 21px;
}
`;