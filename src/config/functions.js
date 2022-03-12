import Vue from "vue";

export const getToken = (nameToken) => {
    let dataToken = document.cookie.split(';');
    nameToken += '=';
    let token = '';
    for(var i = 0; i <dataToken.length; i++) {
        if(dataToken[i].includes(nameToken) == true){
            token = dataToken[i];
        }
    }
    if(token != ''){
        token = token.split('=')[1];
        return token;
    }else{
        return '';
    }
}

export const saveToken = (nameToken, data) => {
    let exp = data.expire * 1000;
    let time = new Date(exp);
    let token = data.token;
    document.cookie = nameToken + '=' + token +'; expires=' + time + '; path=/;';
}

export const messageAuthorization = () => {
    Vue.prototype.$message({
        message: 'Vui lòng đăng nhập',
        type: 'warning',
    });
}
export const messageNotPermission = () => {
    Vue.prototype.$message({
        message: 'Bạn không có quyền vào trang này',
        type: 'warning',
    });
}

export const logout = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios.defaults.headers.common['Authorization'] = null;

    window.location.href = process.env.VUE_APP_BASE_URL + 'login';
}
export const btoaRefactor = (val) => {
    val = btoa(encodeURIComponent(val))
    return val
}

export function formatNumber(number) {
    number = number.toString().replace(/\./g, '');
    number = number.replace(/[^0-9]/g, '');
    number = number.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return number;
}

export const stringToNumber = (number) => {
    number = number.toString().replace(/\./g, '');
    number = number.replace(/[^0-9]/g, '');
    if(number === '') number = 0;
    number = parseInt(number);
    return number;
}

export const formatNumberPhone = (phone) => {
    if(typeof phone == "undefined") return '';
    phone = phone.toString();
    if(phone.substr(0, 2) == '+84'){
        phone = '0' + phone.substr(3);
    }
    phone = phone.replace(/[^0-9]/g, '');
    if(phone.length != 10){
        return phone;
    }
    return phone.substr(0, 4) + ' ' + phone.substr(4, 3) + ' ' + phone.substr(7, 3);
}

export const getPhoneNumber = (phone) => {
    if(typeof phone == "undefined") return '';
    phone = phone.toString();
    if(phone.substr(0, 2) == '+84'){
        phone = '0' + phone.substr(3);
    }
    phone = phone.replace(/[^0-9]/g, '');
    return phone;
}

export const returnFieldForm = (field) => {
    if (field !== '' && field !== null && field !== undefined){
        return field;
    }
    return '';
}

export const checkUrlIsImage = (url) => {
    if(!url) return '';
    if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
        return 'image';
    }
    if(url.match(/\.(mp4)$/) != null){
        return 'video';
    }
    return '';
}

export const showMenu = (dom) => {
    let addEvent = () => {
        dom.classList.remove('show-menu');
    }
    dom.classList.add('show-menu');
    dom.addEventListener('webkitAnimationEnd', addEvent, false);
}

export const getUrlLogin = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    axios.defaults.headers.common['Authorization'] = null;

    if(window.location.pathname.slice(0, 6) != Vue.prototype.$getEnv('VUE_APP_BASE_URL') + 'login'){
        let href = location.href;
        window.location.href = Vue.prototype.$getEnv('VUE_APP_BASE_URL') +  'login?redirect=' + btoa(href);
    }
}

export const getUrlHome = () => {
    let defaultNameRoute = $store.state.profile.defaultNameRoute;
    $router.push({
        name: defaultNameRoute
    });
}