import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * danh sách tài khoản đối tác
 * @param {*} query 
 * @returns 
 */
export const getPartner = async (query) => {
    return await apiGet('/admin/v1/partner', query);
}

/**
 * thêm tài khoản đối tác
 * @param {*} form 
 * @returns 
 */

export const addPartner = async (form) => {
    return await apiPost('/admin/v1/partner', form);
}

/**
 * chi tiết tài khoản đối tác
 * @param {*} id
 * @returns 
 */
export const detailPartner = async (id) => {
    return await apiGet(`/admin/v1/partner/${id}`);
}


/**
 * sửa tài khoản đối tác
 * @param {*} id 
 * @param {*} form 
 * @returns 
 */

export const updatePartner = async (id, form) => {
    return await apiPut(`/admin/v1/partner/${id}`, form);
}
/**
 * chi tiết đối tác quản lý
 * @returns 
 */
 export const detailMyPartner = async () => {
    return await apiGet('/admin/v1/partner/my_partner');
}

/**
 * sửa tài khoản đối tác quản lý
 * @param {*} form 
 * @returns 
 */

 export const updateMyPartner = async ( form) => {
    return await apiPut('/admin/v1/partner/', form);
}