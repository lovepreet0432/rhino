import { makeRequest } from "./commonApi";
 
export const buyFreePlan = async (userId, accessToken) => {
    return makeRequest('/buy-free-plan', 'post', {userId: userId}, accessToken);
};
 
export const buyPlan = async (formData, accessToken) => {
  return makeRequest('/buy-plan', 'post', formData, accessToken);
}

export const subscription_Plans = async () => {
  return makeRequest('/subscription-plans', 'get', null, null);
}

 
export const cancelPlan = async (userId, accessToken) => {
  return makeRequest('/cancel-subscription', 'post', {user_id: userId}, accessToken);
}