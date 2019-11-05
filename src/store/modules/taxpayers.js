import TaxpayersAPI from "../../api/TaxpayersAPI";

function initialState() {
    return {
        records: [],
        taxpayers: []
    }
}

const state = initialState()


const mutations = {
    ADD_TP(state, payload) {
        state.records.push(payload)
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    },
    SET_TAXPAYERS(state, taxpayers) {
        state.taxpayers = taxpayers;
    }
}

const actions = {
    CREATE_TAXPAYER(context, data) {
        return new Promise((resolve, reject) => {
            new TaxpayersAPI(context.rootState.account_session.token)
                .create(data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result.data.errors) reject(result.data.errors)
                    else resolve(result.data.model)
                }).catch((err) => reject(err));
        })
    },
    SEARCH_TAXPAYER(context, data) {
        return new Promise((resolve, reject) => {
            new TaxpayersAPI(context.rootState.account_session.token)
                .searchTaxpayerByTIN(data)
                .then((result) => {
                    if (result.data.errors) reject(result.data.errors);
                    else resolve(result.data.model)
                }).catch((err) => reject(err));
        })
    },
    GET_TAXPAYER_BY_TIN(context, { tin, ignore_user }) {
        return new Promise((resolve, reject) => {
            new TaxpayersAPI(context.rootState.account_session.token)
                .getTaxpayerByTIN(tin, ignore_user)
                .then((result) => {
                    if (result.data.errors) reject(result.data.errors);
                    else resolve(result.data.model)
                }).catch((err) => reject(err));
        })
    },
    UPDATE_TAXPAYER(context, { id, data }) {
        return new Promise((resolve, reject) => {
            new TaxpayersAPI(context.rootState.account_session.token)
                .update(id, data)
                .then((result) => {
                    if (result.data.errors) reject(result.data.errors);
                    else resolve(result.data.model)
                }).catch((err) => reject(err));
        })
    },
    GET_TAXPAYERS(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.taxpayers || !context.state.taxpayers.length) {
                new TaxpayersAPI(context.rootState.account_session.token)
                    .getTaxpayers()
                    .then((result) => {
                        if (result.data.model) {
                            context.commit("SET_TAXPAYERS", result.data.model);
                            resolve(result.data.model);
                        } else reject(result.data.errors);
                    }).catch((err) => {
                        console.log('GET TAXPAYERS err :', err);
                        reject(err);
                    });
            } else resolve(context.state.taxpayers);
        });
    }
}

export default {
    state,
    mutations,
    actions
}