import OAuthAPI from "../../api/OAuthAPI";


function initialState() {
    return {
        current_step: 0
    }
}

const state = initialState()

const mutations = {
    SET_STEP(state, step) {
        state.current_step = step;
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}