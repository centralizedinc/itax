import PaymentAPI from "../../api/PaymentAPI";

function initialState() {
    return {
    }
}

const state = initialState()

const mutations = {
    RESET(state) {
        Object.keys(state).forEach(key => {
            if (key === 'draft_forms') return;
            else state[key] = initialState()[key];
        })
    }
}

const actions = {
    SINGLE_PAYMENT(context, details) {
        return new PaymentAPI(context.rootState.account_session.token).singlePayment(details);
    },
    MULTIPLE_PAYMENT(context, details) {
        return new PaymentAPI(context.rootState.account_session.token).multiplePayment(details);
    }
}

export default {
    state,
    mutations,
    actions
}