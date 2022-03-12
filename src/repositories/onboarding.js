import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * Danh sách Onboarding
 * 
 * */
export const getOnboarding = async (param) => {
    return await apiGet('/admin/v1/onboarding', param);
}

/**
 * thêm mới Onboarding
 * 
 * */

export const addOnboarding = async (param) => {
    return await apiPost('/admin/v1/onboarding', param);
}

/**
 * lọc Onboarding
 * 
 * */

export const filterOnboarding = async (param) => {
    return await apiPut('/admin/v1/onboarding/sort', param);
}

/**
 * Chi tiết onboarding
 * @param {*} id 
 * @returns 
 */
export const detailOnboarding = async (id) => {
    return await apiGet(`/admin/v1/onboarding/${id}`);
}

/**
 * thông tin Onboarding
 * 
 * */

export const inforOnboarding = async (id) => {
    return await apiGet(`/admin/v1/onboarding/${id}`);
}

/**
 * Update Onboarding
 * 
 * */

export const updateOnboarding = async (id , form) => {
    return await apiPut(`/admin/v1/onboarding/${id}` , form);
}

export const deleteOnboarding = async (id , form) => {
    return await apiDelete(`/admin/v1/onboarding/${id}` , form);
}

