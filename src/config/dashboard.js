export const setActiveDashboard = (nameRoute) => {
    const dashboards = $store.state.general.dashboard;
    dashboards.map(item => {
        if(item.name === nameRoute) {
            setBreadcrumbs(item.breadcrumb);
            setTitle(item.title);
            if(item.show) {
                activeDashboard(nameRoute);
            }else {
                activeDashboard(item.same);
            }
            setAction(item.action);
        }else if(item.sub_menu) {
            item.children.map(one => {
                if(one.name === nameRoute) {
                    setBreadcrumbs(item.breadcrumb);
                    setTitle(item.title);
                    setAction(one.action);
                    if(!one.show){
                        activeDashboard(one.same);
                    }else{
                        activeDashboard(one.name);
                    }
                }
            });
        }
    });  
}

const setBreadcrumbs = (breadcrumb) => {
    $store.commit('general/setBreadcrumbs', breadcrumb)
}
const activeDashboard = (activeDashboard) => {
    $store.commit('general/setActiveDashboard', activeDashboard)
}
const setTitle = (title) => {
    document.querySelector('title').setAttribute('content', title);
    document.querySelector('title').innerText = title;
    $store.commit('general/setTitle', title)
}

const setAction = (action) => {
    if(!Array.isArray(action)) action = [];
    $store.commit('profile/setAction', action);
}

export const setdefaultNameRoute = (dashboards) => {
    let default_name = 'layout';
    dashboards.map(item => {
        if(item.default) {
            default_name = item.name;
        }
    });
    $store.commit('profile/setdefaultNameRoute', default_name);
}