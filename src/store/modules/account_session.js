import OAuthAPI from "../../api/OAuthAPI";
import UserAPI from "../../api/UserAPI";
import UploadAPI from "../../api/UploadAPI";
import ReferenceAPI from "../../api/ReferenceAPI";


function initialState() {
    return {
        account: {},
        user: {},
        token: "",
        is_authenticated: false,
        mode: '',
        admin_user: ""
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, data) {
        state.account = data.account;
        state.user = data.user;
        state.token = data.token;
        state.is_authenticated = true;
        state.mode = data.account.status === 0 ? 'INACTIVE' :
            data.account.status === 1 ? 'SETUP' : 'ACTIVE';
    },
    LOGIN_ADMIN(state, username){
        state.admin_user = username;
    },
    UPDATE_ACCOUNT(state, data) {
        state.account = data;
    },
    UPDATE_USER(state, data) {
        state.user = data;
    },
    UPDATE_SESSION_MODE(state) {
        state.mode = state.account.status === 0 ? 'INACTIVE' :
            state.account.status === 1 ? 'SETUP' : 'ACTIVE';
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
                })
                .catch((err) => {
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
    },
    ACCOUNT_SETUP(context, data) {
        return new Promise((resolve, reject) => {
            const { details, form_data } = data;
            var result = {};
            new UploadAPI(context.rootState.account_session.token)
                .uploadAvatar({
                    account_id: context.rootState.account_session.account.account_id,
                    form_data: form_data
                })
                .then((res) => {
                    if (res) {
                        console.log('res :', res.data);
                        details.user.avatar = res.data.model;
                    }
                    return new UserAPI(context.rootState.account_session.token).updateByAccountID(details.user)
                })
                .then((user) => {
                    result.user = user.data.model;
                    // if(context.rootState.account_session.user.tin){
                    //     console.log('Updating taxpayer ...');
                    //     return context.dispatch("UPDATE_TAXPAYER", { id: details.taxpayer._id, data: details.taxpayer }, { root: true });
                    // }
                    // else {
                    console.log('creating taxpayer ...');
                    return context.dispatch("CREATE_TAXPAYER", details.taxpayer, { root: true });
                    // }
                })
                .then((taxpayer) => {
                    result.taxpayer = taxpayer;
                    if (details.taxpayer.individual_details.civil_status === "M" && !details.spouse_details.is_exist) return context.dispatch("CREATE_TAXPAYER", details.spouse_details, { root: true });
                })
                .then((spouse) => {
                    result.spouse = spouse;
                    if (details.taxpayer.individual_details.civil_status === "M") {
                        const connection = {
                            relationship: 'spouse',
                            to: result.spouse.tin,
                            from: result.taxpayer.tin
                        }
                        return context.dispatch("CONNECT", connection, { root: true });
                    }
                })
                .then((spouse_connection) => {
                    if (["sp", "p", "em"].includes(details.taxpayer.filer_type) && !details.company_details.is_exist) return context.dispatch("CREATE_TAXPAYER", details.company_details, { root: true });
                })
                .then((company) => {
                    result.company = company;
                    if (details.taxpayer.individual_details.civil_status === "M") {
                        const connection = {
                            relationship: 'spouse',
                            to: result.spouse.tin,
                            from: result.taxpayer.tin
                        }
                        return context.dispatch("CONNECT", connection, { root: true });
                    }
                })
                .then((company_connection) => {
                    return new OAuthAPI(context.rootState.account_session.token).doneSetup()
                })
                .then((account) => {
                    result.account = account.data.model;
                    context.commit("UPDATE_ACCOUNT", result.account);
                    context.commit("UPDATE_USER", result.user);
                    resolve(result);
                })
                .catch((err) => reject(err));
        })
    }
}

export default {
    state,
    mutations,
    actions
}