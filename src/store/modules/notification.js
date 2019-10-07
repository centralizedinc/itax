import TaxForm from "../../api/TaxFormAPI";

function initialState() {
    return {
        notify: {}
    }
}

const state = initialState()

const mutations = {
    NOTIFY_MESSAGE(state, data) {
        console.log('Notify :', data);
        state.notify = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}