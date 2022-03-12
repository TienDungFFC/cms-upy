import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * danh sách tài khoản admin 
 * @param {*} query 
 * @returns 
 */
export const getAccountAdmin = async (query) => {
    return await apiGet('/admin/v1/account_admin', query);
}

/**
 * thêm tài khoản admin
 * @param {*} form 
 * @returns 
 */

export const addAccountAdmin = async (form) => {
    return await apiPost('/admin/v1/account_admin', form);
}

/**
 * chi tiết tài khoản admin
 * @param {*} id
 * @returns 
 */

export const detailAccountAdmin = async (id) => {
    return await apiGet(`/admin/v1/account_admin/${id}`);
}

/**
 * sửa tài khoản admin
 * @param {*} id 
 * @param {*} form 
 * @returns 
 */

export const updateAccountAdmin = async (id, form) => {
    return await apiPut(`/admin/v1/account_admin/${id}`, form);
}