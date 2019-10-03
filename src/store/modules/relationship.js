import TaxForm from "../../api/TaxFormAPI";
import RelationshipAPI from "../../api/RelationshipAPI";

function initialState() {
    return {
        connections: []
    }
}

const state = initialState()

const mutations = {
    SET_CONNECTION(state, data) {
        state.connections = data;
    },
    ADD_CONNECTION(state, data) {
        state.connections.push(data);
    },
    REMOVE_CONNECTION(state, data) {
        const index = state.connections.findIndex(v => v.id.toString() === data.toString());
        state.connections.splice(index, 1);
    }
}

const actions = {
    GET_CONNECTIONS(context, data) {
        return new Promise((resolve, reject) => {
            const { tin, refresh } = data
            if (refresh || !context.state.connections || !context.state.connections.length) {
                new RelationshipAPI(context.rootState.account_session.token)
                    .getConnections(tin)
                    .then((result) => {
                        if (result.data.errors) reject(result.data.errors);
                        else {
                            const children = result.data.model.map(v => {
                                return {
                                    id: v._id,
                                    tin: v.to,
                                    relationship: v.relationship
                                }
                            })
                            context.commit('SET_CONNECTION', children);
                            resolve(children)
                        }
                    }).catch((err) => reject(err));
            } else resolve(context.state.connections)
        })
    },
    CONNECT(context, data) {
        return new Promise((resolve, reject) => {
            new RelationshipAPI(context.rootState.account_session.token)
                .connect(data)
                .then((result) => {
                    if (result.data.errors) reject(result.data.errors);
                    else {
                        const child = {
                            id: result.data.model._id,
                            tin: result.data.model.tin,
                            relationship: result.data.model.relationship
                        }
                        context.commit('ADD_CONNECTION', child);
                        resolve(child)
                    }
                }).catch((err) => reject(err));
        })
    },
    REMOVE_CONNECTION(context, data) {
        const { from, to } = data;
        return new Promise((resolve, reject) => {
            new RelationshipAPI(context.rootState.account_session.token)
                .removeConnection(from, to)
                .then((result) => {
                    if (result.data.errors) reject(result.data.errors);
                    else {
                        context.commit('REMOVE_CONNECTION', result.data.model._id);
                        resolve(result.data.model)
                    }
                }).catch((err) => reject(err));
        })
    }
}

export default {
    state,
    mutations,
    actions
}