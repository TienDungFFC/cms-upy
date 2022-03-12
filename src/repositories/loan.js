import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách khoản vay
 * @param {*} query 
 * @returns 
 */

export const getInfoDetail = async (id) => {
    return await apiGet(`/admin/v1/manager_loan_contract/${id}/loan-info`);
}
export const getLoans = async (query) => {
    return await apiGet('/admin/v1/manager_loan_contract', query);
}

export const detailLoans = async (query) => {
    return await apiGet(`/admin/v1/manager_loan_contract/payment-period`, query);
}