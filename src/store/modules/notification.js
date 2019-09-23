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
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}