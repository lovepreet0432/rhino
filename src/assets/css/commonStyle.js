import styled from "styled-components";
import footerbg from '../../../src/assets/images/footer-bg.jpg';

// Header style
export const HeaderStyle = styled.section`
   width: 100%;
   padding:0;
   top:0;
   z-index: 2;
 
   img{
    transition:all 0.5s;
   }
   .isActive{
    color: #E99714 !important;
   }
   .navbar-toggler-icon {
    width: 2.4rem;
    height: 2.4rem;
  }
   nav{
    width:100%;
    background:#fff !important;
    text-transform:uppercase;
    box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
}
.navbar-nav{
a:before,
 a:after {
  position: absolute;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
 a:before {
  bottom: 0;
  display: block;
  height: 2px;
  width: 0%;
  content: "";
  background-color: #E99714;
}
a:after {
  left: 0;
  top: 0;
  padding: 0.5em 0;
  position: absolute;
  content: attr(data-hover);
  color: #ffffff;
  white-space: nowrap;
  max-width: 0%;
  overflow: hidden;
}
a:hover:before,
 .current a:before {
  opacity: 1;
  width: 100%;
}
 a:hover:after,
 .current a:after {
  max-width: 100%;
}
}
    .login-btn a{
     text-decoration:none;
     margin: 0 1.625rem;
    }
    .login-btn
      a{
        line-height: 1.688rem;
        text-algin:left;
        color:#070707;
        letter-spacing: 0.5px;
        font-weight:400;
        cursor: pointer;
        img {
          width: 15px;
          margin: -5px 3px 0;
      }
      }
    button{
      background-color: #E99714;
        color: #fff;
        padding: 0.625rem  1.875rem;
        border: none;
        font-size: 0.875rem;
        font-family: 'Poppins',sans-serif;
        font-weight: 700;
        border-radius: 3.125rem;
        text-decoration:none;
        margin-right: 0.625rem;
        text-transform:uppercase;
        width: 9.063rem;
       
        &:hover{background:#bd7400;}
    }
    a:last-child{
          margin:0px;
    }
   
    .navbar-nav a{
      text-decoration:none;
      color:#070707;
      margin: 0px 1.625rem;
      font-weight: 400;
      font-size: 16px;
      letter-spacing:0.5px;
      position:relative;  
      }
    
    img {
    width: 99px;
   }
  }
   .cancel-btn {
    margin: 0px 0.5rem !important;
}
.offcanvas-md{
    max-width:80%
  }
  
@media (max-width: ${({ theme }) => theme.breakpoints.large}){
 
  .offcanvas-header{
    img{
      max-width:80px;
      width:80px;
    }
   }
   .offcanvas-body .navbar-collapse {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    align-items: flex-start;
    .login-btn {
        background:#FFF7EA;
        width: 100%;
        border-radius: 10px;
        padding: 12px;
     }
      a{
        display:block;
        text-decoration: none;
        color: #070707;
        font-weight: 400;
        font-size: 16px;
        margin:0px;
        letter-spacing: 0.5px;
        position: relative;
        padding: 8px 0;
        img{
          margin-right:5px;
        }
      }
    }
  .sticky-header {
    .navbar-collapse{
      border-top: 0.063rem solid #ccc;
      margin-top: 1.125rem;
    .navbar-nav{
    a{
      padding:0.400rem 0;
    }
  }

}
button:focus:not(:focus-visible) {
  outline: 0;
  border: none;
  box-shadow: none;
}
    nav {
      button {
        background: none;
        width: auto;
        padding: 0;
        margin: 0;
        color:#010101;
        &:hover {
          background-color: transparent;
        }
      }
      .login-btn {
        margin:0px;
        position:relative;
        top:-10px;
        a{
          background-color: transparent;
          color: #010101;
          padding:0.400rem 0;
          margin:0px;
          display:block;
          text-align:left;
         
        }
      }
    }
  }
}

@media (max-width: ${({ theme }) => theme.breakpoints.small}){
  .sticky-header{
    img{width:6.25rem;}
  }
  .sticky-header.active{
    img{width:6.25rem;}
}
}`;

//Footer Style
export const FooterStyle = styled.section`
background: url(${footerbg});
padding: 4rem 0 0;
background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
p {
  font-weight: 400;
  position: relative;
  color: #bdbdbd;
}

form {
  position: relative;

  .btn {
    position: absolute;
  right: 0px;
  padding: 0rem 0.625rem;
  background: #E7A83E;
  border: none;
  border-radius: 0px;
  height: 1.875rem;
  margin: 0!important;
  color: #fff;
}
  }

  input {
    width: 100%;
    border: none;
    height: 1.875rem; 
  }
}

.ft-heading {
  font-weight: 600;
  color: #ffff;
  padding: 0 0 0.625rem;
}


ul {
  padding: 0;
  margin: 0;
  list-style: none;

  li a {
    color: #bdbdbd;
    text-decoration: none;
    display: block;
    padding: 0.3125rem 0;
    font-weight:400;
  }
}

.social-icon li a {
  padding-left: 0.3125rem;
  font-size: 1.125rem;
}

.copywrite {
  border-top: 0.0625rem solid #707070;
  padding: 1.25rem 0 0;
  margin-top: 1.25rem;
}
@media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
  ul {
    padding-bottom: 1.875rem;
  }
}
@media (max-width: ${({ theme }) => theme.breakpoints. small}) {
  padding: 2rem 0 0;
}
`;


