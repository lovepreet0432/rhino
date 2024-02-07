import { makeRequest } from "./commonApi";

// 
export const getShopifyData = async (userId, accessToken) => {
    return makeRequest('/get-shopify-data', 'post', { user_id: userId }, accessToken);
};

//not tested(not found)
export const getEbayData = async (userId, accessToken) =>{
    return makeRequest('/get-ebay-data', 'post', { user_id: userId }, accessToken);
};
// 
export const saveServices = async (exportName, exportValue, userId, accessToken) =>{
    return makeRequest('/account-settings', 'post', { exportName, exportValue, user_id: userId }, accessToken);
};
// 
export const saveShopifyData = async (formData, shopify, userId, accessToken) => {
    return makeRequest('/shopify-store-api', 'post', { shopify_url: formData.shopify_url, shopify: shopify, access_token: formData.access_token, user_id: userId}, accessToken);
}
// 
export const sendToShopifyStore = async (scanHistory, userId, discount, accessToken) =>{
    return makeRequest('/shopify-store', 'post', { scanHistory: scanHistory, user_id: userId, discount: discount }, accessToken);
}

// in progress
export const sendToEbayStore = async (scanHistory,ebayData,categoryId,userId, accessToken) => {
    return makeRequest('/send-products-to-ebay', 'post', { scanHistory, ebayData, categoryId, userId }, accessToken);   
}

//not tested(not found)
export const refreshEbay = async (userId, accessToken) => {
    return makeRequest('/ebay-refresh-token', 'post', { userId }, accessToken);   
}
// in progress
export const getCategories = async (userId, accessToken) => {
    return makeRequest('/get-categories', 'post', { userId }, accessToken);
}
// 
export const checkTokenExpiry = async (userId, accessToken) => {
    return makeRequest('/check-token-expiry', 'post', { user_id:userId }, accessToken);
}
// in progress
export const subCategories = async (userId, catId, accessToken) => {
    return makeRequest('/sub-categories', 'post', { userId:userId, catId:catId }, accessToken);
}

//not tested
export const authorizeEbay = async (userId, accessToken) => { 
    return makeRequest('/ebay-account-authorize', 'post', { user_id: userId }, accessToken);
}
// 
export const saveEbayData = async ( userId, ebay, accessToken) => {
    return makeRequest('/ebay-store', 'post', { user_id: userId, ebay: ebay }, accessToken);   
}

export const saveHibidData = async (optionData, hibid, userId, accessToken) => {
    return makeRequest('/hibid-store', 'post', { user_id: userId, seller: optionData.seller, sellerCode: optionData.sellerCode, hibid: hibid }, accessToken);   
}
