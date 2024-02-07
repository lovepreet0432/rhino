import { makeRequest } from "./commonApi";

export const adminLoginApi = async (formData) => {
    return makeRequest('/admin/login', 'post', formData );
};

export const loginApi = async (formData) => { 
    return makeRequest('/login', 'post', formData );
}

export const registerApi = async (formData) => {
    return makeRequest('/signup', 'post', formData );
}
 
export const UserProfileApi = async (formData, accessToken) => {
    return makeRequest('/userprofile', 'post', formData , accessToken,true);
}

export const PaymentProfileApi = async (formData, accessToken) => {
    return makeRequest('/paymentprofile', 'post', formData , accessToken,true);
}

export const ChangePasswordApi = async (formData,accessToken) => {
    return makeRequest('/change-password', 'post', formData,  accessToken);
}

export const resetPasswordApi = async (email, password, confirmPassword, token, ) => {
    return makeRequest('/reset-password', 'post', { email: email, password: password, confirmPassword:confirmPassword, token: token,} );
}

export const forgotPasswordApi = async (email) => {
    return makeRequest('/forgot-password', 'post', { email: email});
}

export const getHomePageData = async () => {
    return makeRequest('/getHomepage', 'get', null);
}


export const getUser = async (accessToken) => {
    return makeRequest('/user', 'get', null, accessToken);
}
