import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách giải ngân
 * @param {*} query 
 * @returns 
 */
export const getDisbursement = async (query) => {
    return await apiGet('/admin/v1/loan/disbursement', query);
}

/**
 * Chi tiết giải ngân
 * @param {*} id 
 * @returns 
 */

export const detailDisbursement = async (id) => {
    return await apiGet(`/admin/v1/loan/disbursement/${id}`);
}

/**
 * Update trạng thái
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */

export const updateStatus = async (id, query) => {
    return await apiPost(`/admin/v1/loan/disbursement/${id}/change_status`, query);
}
