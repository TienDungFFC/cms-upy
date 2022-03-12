import { apiPost, apiGet } from 'vue-ldc-axios/api';
export const upload = async (file, type = null) => {
    let form = new FormData();
    form.append('file', file);
    if(type) form.append('type', type);

    return await apiPost('/upload/v1', form);
}

export const list = async (params = {}) => {
    return await apiGet('/upload/v1', params);
}
