import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * customer-care
 * @param {*} query 
 * @returns 
 */
export const getIdUser = async (query) => {
    return await apiGet('/admin/v1/user/search-user', query);
}

export const getCustomerCare= async (query) => {
    return await apiGet(`/admin/v1/customer-care-history`, query);
}
export const addCustomerCare= async (query) => {
    return await apiPost(`/admin/v1/customer-care-history`, query);
}