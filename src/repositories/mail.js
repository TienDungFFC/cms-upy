import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách mail
 * @param {*} query 
 * @returns 
 */
 export const getMails = async (query) => {
    return await apiGet('/admin/v1/category-mail', query);
}

export const detailMail = async (id) => {
    return await apiGet(`/admin/v1/category-mail/${id}`);
}
export const addMail = async (query) => {
    return await apiPost(`/admin/v1/category-mail`, query);
}
export const updateMail = async (id, query) => {
    return await apiPut(`/admin/v1/category-mail/${id}`, query);
}
export const deleteMail = async (id) => {
    return await apiDelete(`/admin/v1/category-mail/${id}`);
}