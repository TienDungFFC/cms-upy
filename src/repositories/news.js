import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách bài viết điều khoản, hướng dẫn sử dụng, hướng dẫn chụp ảnh, ưu đãi tất toán, chương trình ưu đãi (TYPE)
 * @param {*} query 
 * @returns 
 */
 export const getNews = async (query) => {
    return await apiGet('/admin/v1/new', query);
}

export const detailNew = async (id) => {
    return await apiGet(`/admin/v1/new/${id}`);
}
export const addNew = async (query) => {
    return await apiPost(`/admin/v1/new`, query);
}
export const updateNew = async (id, query) => {
    return await apiPut(`/admin/v1/new/${id}`, query);
}
export const deleteNew = async (id) => {
    return await apiDelete(`/admin/v1/new/${id}`);
}