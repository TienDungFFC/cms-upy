import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách hồ sơ thẩm định 1
 * @param {*} query 
 * @returns 
 */
export const getExpertise1 = async (query) => {
    return await apiGet('/admin/v1/loan/expertise1', query);
}

/**
 * Chi tiết hồ sơ thẩm định
 * @param {*} query 
 * @returns 
 */
export const detailExpertise1 = async (id) => {
    return await apiGet(`/admin/v1/loan/expertise1/${id}`);
}

/**
 * Danh sách khoản vay
 * @param {*} query 
 * @returns 
 */
export const getDoneLoan = async (query) => {
    return await apiGet(`/admin/v1/loan/expertise1/list_paying_done`, query);
}

/**
 * Duyệt hồ sơ
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const passLoan = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise1/${id}/browser_loan`, query)
}

/**
 * Từ chối hồ sơ
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const failLoan = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise1/${id}/refuse_loan`, query)
}

/**
 * Yêu cầu cập nhật
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const updateLoan = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise1/${id}/update_loan`, query)
}