import { apiGet, apiPut } from 'vue-ldc-axios/api';

/**
 * Danh sách step
 * @param {*} query 
 * @returns 
 */
 export const getSteps = async (query) => {
    return await apiGet('/admin/v1/step_loan_contract', query);
}

export const detailStep = async (id) => {
    return await apiGet(`/admin/v1/step_loan_contract/${id}`);
}
export const updateStep = async (id, query) => {
    return await apiPut(`/admin/v1/step_loan_contract/${id}`, query);
}