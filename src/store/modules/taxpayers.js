import TaxpayersAPI from "../../api/TaxpayersAPI";

function initialState() {
    return {
        records: []
    }
}

const state = initialState()


const mutations = {
    ADD_TP(state, payload) {
        state.records.push(payload)
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
    }
}

export default {
    state,
    mutations,
    actions
}