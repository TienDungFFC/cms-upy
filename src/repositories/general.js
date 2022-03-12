import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';
/**
 * Update general
 * @param {*} form 
 * @returns 
 */

 export const updateAuth = async ( form) => {
    return await apiPut('/admin/v1/general/configuration', form);
}
