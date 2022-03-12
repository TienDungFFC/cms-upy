import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách chính sách cho vay
 * @param {*} query 
 * @returns 
 */
 export const getLoanPolicies = async (query) => {
    return await apiGet('/admin/v1/tenor_packages', query);
}

export const detaiLoanPolicy = async (id) => {
    return await apiGet(`/admin/v1/tenor_packages/${id}`);
}
export const addLoanPolicy = async (query) => {
    return await apiPost(`/admin/v1/tenor_packages`, query);
}
export const updateLoanPolicy = async (id, query) => {
    return await apiPut(`/admin/v1/tenor_packages/${id}`, query);
}
export const deleteLoanPolicy = async (id) => {
    return await apiDelete(`/admin/v1/tenor_packages/${id}`);
}