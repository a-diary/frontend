import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexPersistState = new VuexPersistence({
    storage: window.localStorage,
    reducer: state => ({
        jwt: state.jwt,
        user: state.user,
        theme: state.theme,
        listMode: state.listMode,
    }),
});

const store = createStore({
    state() {
        return {
            jwt: null,
            user: {},
            theme: "light",
            listMode: window.innerWidth > 768 ? "waterfall" : "list",
        };
    },
    mutations: {
        setJwt(state, data) {
            state.jwt = data;
        },
        setUser(state, data) {
            state.user = data;
        },
        logout(state) {
            state.jwt = null;
            state.user = {};
        },
        changeTheme(state) {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setListMode(state, data) {
            state.listMode = data;
        },
    },
    getters: {
        loggedIn: state => state.jwt !== null,
    },
    plugins: [vuexPersistState.plugin],
});

export { store };
