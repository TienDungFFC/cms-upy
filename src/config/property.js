import {
    btoaRefactor, formatNumber, stringToNumber, formatNumberPhone,
    checkUrlIsImage, returnFieldForm, logout
} from './functions';
import { isMobile, isAndroid } from 'mobile-device-detect';
import { upload } from '@/repositories/upload';
import Vue from 'vue';

Vue.prototype.$encodeRedirect = (query) => {
    query = JSON.stringify(query)
    query = Vue.prototype.$btoa(query);
    return query;
}

Vue.prototype.$btoa = (val) => {
    return btoaRefactor(val);
}

Vue.prototype.$urlImage = (image) => {
    if(image.slice(0, 1) == '/'){
        image = image.slice(1);
    }
    return process.env.VUE_APP_BASE_ASSETS + image;
}

Vue.prototype.$defaultImage = (image) => {
    if(!image){
        return null;
    }
    return process.env.VUE_APP_BASE_ASSETS + 'image/' + image;
}

Vue.prototype.$formatNumber = (number) => {
    return formatNumber(number);
}

Vue.prototype.$stringToNumber = (number) => {
    return stringToNumber(number);
}

Vue.prototype.$formatNumberPhone = (phone) => {
    return formatNumberPhone(phone);
}

Vue.prototype.$returnFieldForm = (field) => {
    return returnFieldForm(field);
}

Vue.prototype.$checkUrlIsImage = (url) => {
    return checkUrlIsImage(url);
}

Vue.prototype.$getEnv = (key, isNumber = false) => {
    if(isNumber){
        return process.env[key] * 1;
    }
    return process.env[key];
}

Vue.prototype.$showMessage = (message, type = 'success', timeOut = 2000) => {
    Vue.prototype.$message({
        message: message,
        type: type,
        timeOut: timeOut
    })
}

Vue.prototype.$isAdmin = () => {
    return $store.state.profile.user.classify === 'ADMIN_CMS';
}
Vue.prototype.$isPartner = () => {
    return $store.state.profile.user.classify === 'PARTNER';
}
Vue.prototype.$myCan = (action) => {
    const listAction = [
        UPY_ACTION_WATCH,
        UPY_ACTION_CREATE,
        UPY_ACTION_DELETE,
        UPY_ACTION_UPDATE,
        UPY_ACTION_EXPERTISE,
        UPY_ACTION_UPLOAD_EXCEL,
    ];
    if(listAction.includes(action) === false) {
        throw {
            data:{
                message: 'Hành động không tồn tại'
            }
        };
    }
    let myAction = $store.state.profile.listAction;
    return myAction.includes(action);
}

Vue.prototype.$myCanWatch = () => {
    return Vue.prototype.$myCan(UPY_ACTION_WATCH)
}
Vue.prototype.$myCanCreate = () => {
    return Vue.prototype.$myCan(UPY_ACTION_CREATE)
}
Vue.prototype.$myCanDelete = () => {
    return Vue.prototype.$myCan(UPY_ACTION_DELETE)
}
Vue.prototype.$myCanUpdate = () => {
    return Vue.prototype.$myCan(UPY_ACTION_UPDATE)
}
Vue.prototype.$myCanExpertise = () => {
    return Vue.prototype.$myCan(UPY_ACTION_EXPERTISE)
}
Vue.prototype.$myCanUploadExcel = () => {
    return Vue.prototype.$myCan(UPY_ACTION_UPLOAD_EXCEL)
}

Vue.prototype.$detect = isMobile ? 'mobile' : 'web';
Vue.prototype.$isAndroid = isAndroid ? true : false;
Vue.prototype.$textLoadingFull = 'UPY';
Vue.prototype.$titleMessage = 'UPY thông báo';

Vue.prototype.$errorAvatar = (e) => {
    if(e.target){
        e.target.src = '/images/women.svg';
    }else{
        e.src = '/images/women.svg'
    }
}
Vue.prototype.$errorImage = (e) => {
    if(e.target){
        e.target.src = '/images/no-image.png';
    }else{
        e.src = '/images/no-image.png'
    }
}

Vue.prototype.$getUrlImage = (url) => {
    if(!url) return '/images/no-image.png';
    return url;
}

Vue.prototype.$overflowHidenBody = () => {
    window.addEventListener('scroll', stopScoll, false);
    document.querySelector('#app').style.overflow = "hidden";
}
Vue.prototype.$removeOverflowHidenBody = () => {
    window.removeEventListener('scroll', stopScoll, false)
    document.querySelector('#app').removeAttribute('style');
}

Vue.prototype.$urlImage = (url) => {
    return url;
}

Vue.prototype.$uploadFile = async (file, type = null, allData = false) => {
    if(!file) {
        Vue.prototype.$showMessage('Vui lòng chọn file', 'warning');
        throw('Vui lòng chọn file');
    } else {       
        let data = {}
        await upload(file, type).then(res => {
            data = res.data.data;
        }).catch(err => {
            if(err.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
                Vue.prototype.$showMessage('Vui lòng chọn file', 'warning');
            }
        });

        if(!allData) return data.name_file;
        return data;
    }    
}

Vue.prototype.$returnForm = (form) => {
    let data = {};
    for (const key in form) {
        if (form[key] !== null && form[key] !== '' && form[key] !== undefined) {
            data[key] = form[key];
        }
    }
    return data;
}

Vue.prototype.$logout = () => {
    return logout();
}

Vue.prototype.$fileIsImage = (type) => {
    if(type.indexOf('image/') != -1) {
        return true;
    }
    return false;
}
Vue.prototype.$fileIsVideo = (type) => {
    if(type.indexOf('video/') != -1) {
        return true;
    }
    return false;
}

Vue.prototype.$makeUrlFile = (file) => {
    return URL.createObjectURL(file);
}