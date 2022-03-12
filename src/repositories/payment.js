import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách thanh toán
 * @param {*} query 
 * @returns 
 */
export const getPayment = async (query) => {
    return await apiGet('/admin/v1/manager_payment', query);
}

/**
 * Export thanh toán
 * @param {*} query 
 * @returns 
 */
export const exportExcel = async (query) => {
    return await apiGet('/admin/v1/manager_payment/export_excel', query);
}

/**
 * Thống kê thanh toán
 * @param {*} query 
 * @returns 
 */
export const getStatistics = async (query) => {
    return await apiGet('/admin/v1/manager_payment/statistics', query);
}

/**
 * Chi tiết thanh toán
 * @param {*} id 
 * @returns 
 */

export const detailPayment = async (id) => {
    return await apiGet(`/admin/v1/manager_payment/${id}`);
}

/**
 * 
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */

export const updateStatus = async (id, query) => {
    return await apiPost(`/admin/v1/manager_payment/${id}/change_status`, query);
}
