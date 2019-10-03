import OAuthAPI from "../../api/OAuthAPI";


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
    UPDATE_ACCOUNT(state, data) {
        state.account = data;
    },
    UPDATE_USER(state, data) {
        state.user = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    LOGIN(context, account) {
        return new Promise((resolve, reject) => {
            OAuthAPI.login(account)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result.data.error) reject(result.data.error);
                    else {
                        context.commit("LOGIN", result.data.model);
                        resolve(result.data.model);
                    }
                }).catch((err) => {
                    reject(err);
                });
        })
    },
    LOGOUT(context) {
        console.log("Logging out...");
        context.commit("RESET");
    },
    SIGNUP(context, account) {
        return new Promise((resolve, reject) => {
            OAuthAPI.signup(account)
                .then((result) => {
                    console.log('result :', result.data);
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    REGISTRATION_CONFIRMATION(context, code) {
        return new Promise((resolve, reject) => {
            OAuthAPI.confirm(code)
                .then((result) => {
                    if (result.data.error) reject(result.data.error);
                    else resolve(result.data);
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    FACEBOOK_CONFIRMATION(context, code) {
        const retrieved_data = new Buffer(code, "base64").toString();
        try {
            const data = JSON.parse(retrieved_data);
            context.commit('LOGIN', data);
        } catch (error) {
            console.log('error :', error);
        }
    },
    GOOGLE_CONFIRMATION(context, code) {
        const retrieved_data = new Buffer(code, "base64").toString();
        try {
            const data = JSON.parse(retrieved_data);
            context.commit('LOGIN', data);
        } catch (error) {
            console.log('error :', error);
        }
    }
}

export default {
    state,
    mutations,
    actions
}