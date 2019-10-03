import TaxpayersAPI from "../../api/TaxpayersAPI";
import OAuthAPI from "../../api/OAuthAPI";
import UserAPI from "../../api/UserAPI";


function initialState() {
    return {
    }
}

const state = initialState()


const mutations = {
}

const actions = {
    ACCOUNT_SETUP(context, data) {
        return new Promise((resolve, reject) => {
            const { details, form_data } = data;
            var result = {}
            new UserAPI(context.rootState.account_session.token).updateByAccountID(details.user)
                .then((user) => {
                    result.user = user.data.model;
                    return context.dispatch("CREATE_TAXPAYER", details.taxpayer)
                })
                .then((taxpayer) => {
                    result.taxpayer = taxpayer;
                    return new OAuthAPI(context.rootState.account_session.token).doneSetup()
                })
                .then((account) => {
                    result.account = account.data.model;
                    context.commit("UPDATE_ACCOUNT", result.account);
                    // context.commit("UPDATE_USER", result.user);
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