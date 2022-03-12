import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách banner khoản vay
 * @param {*} query 
 * @returns 
 */
 export const getBanner = async (query) => {
    return await apiGet('/admin/v1/banner', query);
}

export const updateBanner = async (query) => {
    return await apiPost('/admin/v1/banner', query);
}