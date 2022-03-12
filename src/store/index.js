import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const requireModule = require.context('../modules', true,  /\/.*\/store\/index\.js$/);
const modules = {};
requireModule.keys().forEach(filename => {
    const moduleName = filename
        .replace(/(\.\/|\.js)/g, '')
        .split('/')[0];
    modules[moduleName] = requireModule(filename).default || requireModule(filename);
    modules[moduleName].namespaced = true;
});


modules['general'] = {
    namespaced: true,
    state: () => ({
        layout_main: 'default-layout',
        redirect: null,
        dashboard:  [],
        activeDashboard: '0',
        breadcrumbs: [],
        title: 'Trang Admin CMS',
        showIconSearch: false,
    }),
    mutations: {
        setLayoutMain(state, data) {
            state.layout_main = data ? data : 'default-layout';
        },
        setRedirect(state, data){
            if(data === null){
                state.redirect = '';
            }else{
                try{
                    let redirect = JSON.parse(atob(data));
                    state.redirect = redirect;
                }catch(e){
                    state.redirect = '';
                }
            }
        },
        setActiveDashboard(state, data){
            state.activeDashboard = data;
        },
        setDashboard(state, data) {
            state.dashboard = data;
        },
        setBreadcrumbs(state, data){
            state.breadcrumbs = [];
            for (const key in data) {
                state.breadcrumbs.push(data[key]);
            }
        },
        setTitle(state, data) {
            state.title = data;
        },
        setShowIconSearch(state, data) {
            state.showIconSearch = data ? true : false;
        },
    },
}

export default new Vuex.Store({
    modules: modules,
})
