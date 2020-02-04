function initialState() {
    return {
        returns_data: []
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
    CREATE_MOCK_DATA(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh) {
                context.dispatch("GET_RDOS", null, { root: true })
                    .then((result) => {
                        return context.dispatch("GET_TAXPAYERS", null, { root: true });
                    })
                    .then((result) => {
                        const taxpayers = context.rootState.taxpayers.taxpayers;
                        taxpayers.forEach((taxpayer) => {
                            
                        })
                    })
            } return context.state.returns_data;
        })
    }
}

export default {
    state,
    mutations,
    actions
}