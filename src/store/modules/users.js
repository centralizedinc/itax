import TaxpayersAPI from "../../api/TaxpayersAPI";
import OAuthAPI from "../../api/OAuthAPI";
import UserAPI from "../../api/UserAPI";
import UploadAPI from "../../api/UploadAPI";


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
                    if(context.rootState.account_session.user.tin){
                        console.log('Updating taxpayer ...');
                        return context.dispatch("UPDATE_TAXPAYER", { id: details.taxpayer._id, data: details.taxpayer }, { root: true });
                    }
                    else {
                        console.log('creating taxpayer ...');
                        return context.dispatch("CREATE_TAXPAYER", details.taxpayer, { root: true });
                    }
                })
                .then((taxpayer) => {
                    result.taxpayer = taxpayer;
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