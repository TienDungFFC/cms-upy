export default { 
    state: () => ({
        user: {},
        defaultNameRoute: 'layout',
        listAction: [],
    }),
    mutations: {
        setUser(state, data) {
            state.user = data;
        },
        setdefaultNameRoute(state, data) {
            state.defaultNameRoute = data;
        },
        setAction(state, data) {
            state.listAction = data;
        },
    }
}