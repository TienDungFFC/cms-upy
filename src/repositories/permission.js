import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * danh sách nhóm quyền
 * @param {*} query 
 * @returns 
 */
export const getPermission = async (query) => {
    return await apiGet('/admin/v1/permission', query);
}

/**
 * chi tiết nhóm quyền
 * @param {*} id 
 * @returns 
 */

export const detailPermission = async (id) => {
    return await apiGet(`/admin/v1/permission/${id}`);
}

/**
 * danh sách quyền
 * @param {*} query 
 * @returns 
 */

export const getListPermission = async (query) => {
    return await apiGet('/admin/v1/permission/list_permissions', query);
}

/**
 * thêm nhóm quyền
 * @param {*} form 
 * @returns 
 */

export const addPermission = async (form) => {
    return await apiPost('/admin/v1/permission', form);
}

/**
 * sửa nhóm quyền
 * @param {*} id 
 * @param {*} form 
 * @returns 
 */

export const updatePermission = async (id, form) => {
    return await apiPut(`/admin/v1/permission/${id}`, form);
}

/**
 * xoá nhóm quyền
 * @param {*} id 
 * @returns 
 */

export const deletePermission = async (id) => {
    return await apiDelete(`/admin/v1/permission/${id}`);
}