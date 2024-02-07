import { makeRequest } from "./commonApi";

export const getContactForm = async (accessToken) => {
    return makeRequest("/contact-form", 'get', null, accessToken );
};

export const deleteContactForm = async (id, accessToken) => {
    return makeRequest(`/contact-form-record/${id}`, 'delete', null, accessToken)
}

export const getHomePage = async (accessToken) => {
    return makeRequest(`/admin-getHomepage`, 'get', null, accessToken)
}

export const homepage = async (formData, accessToken) => {
    return makeRequest("/admin-homepage", 'post', formData, accessToken)
}

export const subscriptionPlans = async () => {
    return makeRequest("/subscription-plans", 'get', null, null)
}

export const deleteSubscriptionPlans = async (plan_id, title, accessToken) => {
    return makeRequest(`/subscription-plan-delete`, 'post',{'planId':plan_id,'title':title}, accessToken)
}

export const addSubscription_Plan = async (updatedSubscription, accessToken) =>{
    return makeRequest("/subscription-plans", 'post', updatedSubscription, accessToken)
}

export const fetchUserList = async (accessToken) =>{
    return makeRequest("/fetch-users", 'get', null, accessToken)
}

export const user_subscription = async (accessToken) =>{
    return makeRequest("/user-subscription", 'get', null, accessToken)
}