import { apiGet, apiPost } from 'vue-ldc-axios/api';

/**
 * Danh sách hồ sơ thẩm định 1
 * @param {*} query 
 * @returns 
 */
export const getExpertise2 = async (query) => {
    return await apiGet('/admin/v1/loan/expertise2', query);
}

/**
 * Chi tiết hồ sơ thẩm định
 * @param {*} query 
 * @returns 
 */
export const detailExpertise2 = async (id) => {
    return await apiGet(`/admin/v1/loan/expertise2/${id}`);
}

/**
 * Check CIC
 * @param {*} id 
 * @returns 
 */
export const checkCIC = async (id) => {
    return await apiGet(`/admin/v1/loan/expertise2/${id}/check_cic`);
}

/**
 * Duyệt hồ sơ
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const passLoan = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise2/${id}/browser_loan`, query)
}

/**
 * Từ chối hồ sơ
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const failLoan = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise2/${id}/refuse_loan`, query)
}

/**
 * Yêu cầu cập nhật
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
export const backToExpertise1 = async (id, query) => {
    return await apiPost(`/admin/v1/loan/expertise2/${id}/back_expertise1`, query)
}