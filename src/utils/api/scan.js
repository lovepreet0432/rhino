import { makeRequest } from "./commonApi";
import { formatDateInDb,formatDate } from "../common";

export const scanProductNonLogin = async () => {
    return makeRequest('/scan-product', 'get', null, null);
};

export const scanProduct = async (barcodeNumber, planId) => {
    return makeRequest('/scan', 'post', { upc: barcodeNumber, planId: planId }, null);
};

export const checkUserCanScan = async (userId, planId) => {
    return makeRequest(`/checkUserCanScan/${userId}/${planId}`, 'get', null, null);
}

export const loadNewBatch = async (userId, startDate, accessToken) => {
    return makeRequest(`/scan-history-new-batch`, 'post', {'user_id':userId,'date': startDate}, accessToken);
}

export const deleteParticularScan = async (userId, scanId, date, accessToken) => {
    return makeRequest(`/scan-history-delete`, 'post', {'user_id':userId, 'scan_id': scanId, 'date': date}, accessToken);
}

export const filterScanByDate = async (formattedStartDate,currentDate, userId, accessToken) => {
    return makeRequest(`/filter-scan-history-by-date`, 'post',  { 'filterDate': formattedStartDate,'currentDate':currentDate,'userId':userId }, accessToken);
}

export const scanHistoryData = async (mainApiResponse, userId, accessToken) => {
    const currentDate=new Date();
    return makeRequest(`/scan-history`, 'post',  { 
            'scan_id': mainApiResponse.data.Identifier,
            'title': mainApiResponse.data.Title,
            'description':mainApiResponse.data.Desc,
            'price': mainApiResponse.data.AveragePrice,
            'qty': 1, 
            'user_id': userId, 
            'product_info': mainApiResponse.data, 
            'manually':false,
            'current_date':formatDateInDb(currentDate)
        }, accessToken);
}

export const scanEditing = async (filterdate,currentDate,formData, userID, accessToken) => {
    return makeRequest(`/scan-edit`, 'post',  { 
        'filterDate':filterdate, 
        'currentDate':currentDate,
        'scan_id': formData.identifier, 
        'user_id': userID,  
        'title': formData.title, 
        'price': formData.price, 
        'qty': formData.quantity }, accessToken);
}


export const manuallyEnterScanItem = async (formData, userId, accessToken) => {
    const currentDate=new Date();
    return makeRequest('/scan-history', 'post', { 
        'scan_id': formData.identifier, 
        'title': formData.title, 
        'price': formData.price, 
        'description':formData.description, 
        'qty': parseInt(formData.quantity), 
        'user_id': userId, 
        'product_info': { "Title": formData.title,"Identifier":formData.identifier,"Desc":formData.description }, 
        'manually':true,
        'current_date':formatDateInDb(currentDate) }, accessToken )
}

export const getFeatures = async (plan_id) =>{
    return makeRequest(`/get-features/${plan_id}`, 'get', null, null);
}

export const checkServicesForPlan = async (plan_id) =>{
    return makeRequest(`/check-services-for-plan/${plan_id}`, 'get', null, null);
}