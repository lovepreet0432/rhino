import { styled } from "styled-components";

// AccountSettingStyle

export const AccountSettingStyle = styled.section`
.tp-label{
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img{
    order:2;
    width:60px;
  }
}
button{
  display: flex;
  margin: 0;
  svg {
    margin-left: 10px;
}
}
`;

// ChangePasswordStyle

export const ChangePasswordStyle =styled.section`
hr{
  margin-top:0px;
}
h3{
  font-size:1.25rem;
}

.pass-ab {
  position: relative;
}
.pass-ab1 {
  position: relative;
}
.pass-ab2 {
  position: relative;
}
.pass-ab .password-icon {
  position: absolute;
  top: 2.375rem;
  right: 1.5rem;
}
.pass-ab1 .password-icon {
  position: absolute;
  top: 2.375rem;
  right: 1.5rem;
}
.pass-ab2 .password-icon {
  position: absolute;
  top: 2.375rem;
  right: 1.5rem;
}

button{
  margin: 0;
  display:flex
}
`;

// ProfileStyle

export const ProfileStyle = styled.section`
  h3 {
    font-size: 3.25rem;
  }
  .form-check-inline {
    margin-right: 4rem;
  }
  .profile-submit button {
    display: flex;
    margin: 0;
}
.profile-submit span {
  margin-right: 10px;
}
`;

// SubscriptionPlanStyle
export const SubscriptionPlanStyle = styled.section`
  .profile-sec {
    .btn-3 {
      &:hover {
        color: #fff;
      }
    }
  }

  .swal2-actions {
    justify-content: space-between;
    width: 40%;
  }

  .bass-row {
    .btn {
      &:hover {
        color: #fff;
      }
    }
  }

  .deactivate-load {
    display: flex;
    span {
      margin-right: 8px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    .col-sm-2 {
      width: 100%;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.small}) {
    .bass-row {
      border: none !important;
      padding: 0 !important;
    }
    .container {
      .ex-btn {
        display: inline;
      }
    }
}`;