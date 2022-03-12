import { apiGet, apiPost, apiPut, apiDelete } from 'vue-ldc-axios/api';

/**
 * Danh sách Nhân viên
 * 
 * */
 export const getEmployee = async (param) => {
    return await apiGet('/admin/v1/employee', param);
}
/**
 * Add Nhân viên
 * 
 * */
 export const addEmployee = async (param) => {
    return await apiPost('/admin/v1/employee', param);
}
/**
 * Import Nhân viên
 * 
 * */
 export const importEmployee = async (param) => {
    return await apiPost('/admin/v1/employee/import_excel', param);
}

/**
 * 
 * @param {*} param 
 * @returns 
 */
 export const exportSample = async () => {
    return await apiGet('/admin/v1/employee/export_excel_example');
}
/**
 * Chi tiết Nhân viên
 * 
 * */
 export const detailEmployee = async (id) => {
    return await apiGet(`/admin/v1/employee/${id}`);
}
/**
 * Update Nhân viên
 * 
 * */
 export const updateEmployee = async (id,form) => {
    return await apiPut(`/admin/v1/employee/${id}`, form);
}
/**
 * Xoá ảnh hợp đồng or quyết định lên lương
 * 
 * */
 export const deleteImage = async (id,form) => {
    return await apiPost(`/admin/v1/employee/${id}/delete_image`, form);
}
/**
 * upload file excel
 * 
 * */
 export const uploadFileExcel = async (form) => {
    return await apiPost(`/admin/v1/employee/import_excel`, form);
}
/**
 * Xóa Nhân viên
 * 
 * */

 export const deleteEmployee = async (id) => {
    return await apiDelete(`admin/v1/employee/${id}`);
}
