import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

export const information = async () => {
    return await apiGet('/admin/v1/profile', {
        dashboard: true
    });
}

/**
 * login
 * 
 * @param {} param 
 */
export const getProfile = async (query) => {
    return await apiGet('/admin/v1/profile', query);
}
export const updateProfile = async (query) => {
    return await apiPut(`/admin/v1/profile`, query);
}
export const updatePassword = async (query) => {
    return await apiPost(`/admin/v1/profile/change_password`, query);
}
export const login = async (param) => {
    return await apiPost('/admin/v1/login', param);
}