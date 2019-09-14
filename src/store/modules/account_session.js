function initialState() {
    return {
        account: {},
        user: {},
        token: "",
        is_authenticated: false
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, data) {
        state.account = data.account;
        state.user = data.user;
        state.token = data.token;
        state.is_authenticated = true;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    LOGIN(context, account) {
    },
    LOGOUT(context) {
        console.log("Logging out...");
        context.commit("RESET");
    }
}

export default {
    state,
    mutations,
    actions
}