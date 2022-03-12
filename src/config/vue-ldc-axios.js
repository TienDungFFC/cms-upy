import { saveToken, getUrlLogin, getUrlHome } from '@/config/functions';
import { apiPost } from 'vue-ldc-axios/api';

export const callRefreshToken = async (refreshToken) => {
    return new Promise((res, rej) => {
        apiPost('/v1/refresh_token', {
            refresh_token: refreshToken,
        }).then(response => {
            if(response.data.success === API_STATUS_SUCCESS){
                const data = response.data.data;
                saveToken(Vue.prototype.$getEnv('VUE_APP_KEY_ACCESS_TOKEN'), data.access_token);
                saveToken(Vue.prototype.$getEnv('VUE_APP_KEY_REFRESH_TOKEN'), data.refresh_token);
                return res(data.access_token.token);
            }
            return rej();
        }).catch(error => {
            return rej();
        });
    })
}

export const actionCatchApi = (error) => {
    // xử lý catch defaut
    const response = error.response;
    if(!response) {
        Vue.prototype.$showMessage('Hệ thống đang bảo trì, Vui lòng thử lại sau', 'warning');
    }
    const status = response.status;
    switch (status) {
        case HTTP_CODE_NOT_FOUND:
        case HTTP_CODE_SERVER_ERROR:
            Vue.prototype.$showMessage('Lỗi hệ thống, Vui lòng thử lại sau', 'error');
            break;
        case HTTP_CODE_BAD_REQUEST:
        case HTTP_CODE_UNPROCESSABLE_ENTITY:
            let url = error.response.config.url.split('/');
            url = url[url.length -1];
            if(url === 'update_loan' || url === 'back_expertise1') {                
                return
            }
            Vue.prototype.$showMessage('Vui lòng kiểm tra lại dữ liệu truyền lên', 'warning');
            break;
        case HTTP_CODE_UNAUTHORIZED:
            getUrlLogin();
            break;
        default:
    }
}

