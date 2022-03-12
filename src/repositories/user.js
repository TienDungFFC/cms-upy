import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách tài khoản
 * @param {*} query 
 * @returns 
 */
export const getUsers = async (query) => {
    return await apiGet('/admin/v1/user', query);
}

export const detailUser = async (id) => {
    return await apiGet(`/admin/v1/user/${id}`);
}
export const updateUser = async (id, query) => {
    return await apiPut(`/admin/v1/user/${id}`, query);
}
export const deleteUser = async (id) => {
    return await apiDelete(`/admin/v1/user/${id}`);
}

