import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách PaymentGuide
 * 
 * */
 export const getPaymentGuide = async (param) => {
    return await apiGet('/admin/v1/payment_guide', param);
}

/**
 * Thêm mới PaymentGuide
 * 
 * */
 export const addPaymentGuide = async (param) => {
    return await apiPost('/admin/v1/payment_guide', param);
}

/**
 * Chi tiết PaymentGuide
 * 
 * */

 export const inforPaymentGuide = async (id) => {
    return await apiGet(`/admin/v1/payment_guide/${id}`);
}

/**
 * Update PaymentGuide
 * 
 * */

 export const updatePaymentGuide = async (id,form) => {
    return await apiPut(`/admin/v1/payment_guide/${id}`,form);
}

/**
 * Xóa PaymentGuide
 * 
 * */

 export const deletePaymentGuide = async (id) => {
    return await apiDelete(`/admin/v1/payment_guide/${id}`);
}
