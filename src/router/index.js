import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { getToken, messageAuthorization, messageNotPermission } from '@/config/functions';
import { information } from '@/repositories/profile';
import { setActiveDashboard, setdefaultNameRoute } from '@/config/dashboard';

const key_access_token = process.env.VUE_APP_KEY_ACCESS_TOKEN;

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err=>err);
}

const requireModule = require.context('../modules', true,  /\/.*\/router\/index\.js$/);
let moduleName = [];
let oneRoute = [];
requireModule.keys().forEach(filename => {
    oneRoute = requireModule(filename).default || requireModule(filename);
    for (const key in oneRoute) {
        moduleName.push(oneRoute[key]);
    }
})

const routes = [...moduleName];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    const redirect = to.query.redirect || null;
    $store.commit('general/setRedirect', redirect);
    const showIconSearch = to.meta.showIconSearch;
    $store.commit('general/setShowIconSearch', showIconSearch);
    let user = $store.state.profile.user;
    let defaultNameRoute = $store.state.profile.defaultNameRoute;
    let token = getToken(key_access_token);
    let login = to.meta.login;
    if(login === false){
        if(token) next({name: defaultNameRoute});
    }else if(login === true){
        if(!token){
            messageAuthorization();
            next({name: 'login'});
        }else{
            if(Object.keys(user).length == 0){
                await getUser();
            }
        }
    }
    next();
})

router.afterEach((to, from, next) => {
    let meta = to.meta;
    let layout = meta.layout;
    if(!layout) layout = 'default-layout';
    setActiveDashboard(to.name)
    $store.commit('general/setLayoutMain', layout);
    if(!Vue.prototype.$myCanWatch() && to.name != 'profile' && to.name != 'login' && process.env.VUE_APP_CHECK_PERMISSION == true) {
        messageNotPermission();
        // check thêm default route là gì
        let defaultNameRoute = $store.state.profile.defaultNameRoute;
        if(from.name != defaultNameRoute){
            router.push({
                name: defaultNameRoute
            })
        }
    }
})

let getUser = async () => {
    await information().then(res => {
        let data = res.data;
        $store.commit('profile/setUser', data.user);
        $store.commit('profile/setdefaultNameRoute', data.user.default_route);
        $store.commit('general/setDashboard', data.dashboard);
        setdefaultNameRoute(data.dashboard);
    }).catch(err => {});
}

export default router
