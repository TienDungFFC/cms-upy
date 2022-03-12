import { apiGet, apiPut } from 'vue-ldc-axios/api';

/**
 * Danh sách cài đặt
 * @returns 
 */
export const getConfiguration = async () => {
    return await apiGet('admin/v1/general/configuration');
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
export const updateConfiguration = async (query) => {
    return await apiPut('admin/v1/general/configuration', query);
}
