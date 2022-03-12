import Vue from 'vue';

import { getToken, logout } from './functions';

Vue.prototype.$socket = io.connect(process.env.VUE_APP_SOCKET + '?detect=web&token=' + getToken('access_token'), {
    transports : ['websocket'],
});

Vue.prototype.$socket.on('notification', data => {
    $store.commit('setPushNotification', data);
});
Vue.prototype.$socket.on('joined', data => {
    // console.log('bạn đã vào zoom ' + data)
});

Vue.prototype.$socket.on('refresh_list_td1', id => {
    let user = $store.state.profile.user;
    if(user && user.id != id) {
        Vue.prototype.$eventBus.$emit('refresh_list_td1', id);
    }
});
Vue.prototype.$socket.on('refresh_list_td2', id => {
    let user = $store.state.profile.user;
    if(user && user.id != id) {
        Vue.prototype.$eventBus.$emit('refresh_list_td2', id);
    }
});

Vue.prototype.$socket.on('new_td1', () => {
    Vue.prototype.$eventBus.$emit('new_td1', null);
});

Vue.prototype.$socket.on('new_td2', () => {
    Vue.prototype.$eventBus.$emit('new_td2', null);
});

Vue.prototype.$socket.on('refresh_expertise', data => {
    const expertise_detail = ['expertise-1-show', 'expertise-2-show'];
    let user = $store.state.profile.user;
    let current_router = $router.currentRoute.name;
    
    if(Object.keys(user).length == 0) return;

    let user_id = user.id;

    if(user_id === data.data.user_expertise) {
        // check đang ở 2 router chi tiết thẩm định & đang ở đúng hồ sơ thẩm định
        if(expertise_detail.includes(current_router) && data.data.loan_contract_id === $router.currentRoute.params.id) {
            // alert
            Vue.prototype.$confirm(data.message, "Thông báo", {
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Quay lại",
                type: "warning",
            }).then(() => {
                if(current_router === 'expertise-1-show') {
                    Vue.prototype.$eventBus.$emit('refresh_expertise1', null);
                } else {
                    Vue.prototype.$eventBus.$emit('refresh_expertise2', null);
                }
            }).catch(() => {
                if(current_router === 'expertise-1-show') {
                    Vue.prototype.$eventBus.$emit('refresh_expertise1', null);
                } else {
                    Vue.prototype.$eventBus.$emit('refresh_expertise2', null);
                }
            });
        } else {
            Vue.prototype.$showMessage(data.message, 'warning', 4000);
        }
    }else {
        // check đang ở 2 router danh sách thẩm định thì call mới
        if(current_router === 'expertise-1') {
            Vue.prototype.$eventBus.$emit('new_td1', null);
        } else if (current_router === 'expertise-2') {
            Vue.prototype.$eventBus.$emit('new_td2', null);
        }
    }
});


Vue.prototype.$socket.on('logout', async data => {
    await Vue.prototype.$confirm(data, 'Thông báo', {
        confirmButtonText: 'Đăng nhập lại',
        cancelButtonText: 'Đăng xuất',
        type: 'error',
    }).then(() => {}).catch(() => {});
    logout();
});