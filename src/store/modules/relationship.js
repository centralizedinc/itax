import TaxForm from "../../api/TaxFormAPI";
import RelationshipAPI from "../../api/RelationshipAPI";
import OAuthAPI from "../../api/OAuthAPI";
import TaxpayersAPI from "../../api/TaxpayersAPI";

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
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
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
                            console.log('children :', children);
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
                            tin: result.data.model.to,
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
    },
    ADD_AND_CONNECT_TAXPAYER(context, data) {
        return new Promise((resolve, reject) => {
            const account = {
                email: data.email,
                name: {
                    first: data.first_name,
                    last: data.last_name
                },
                sender: data.sender
            }
            new OAuthAPI(context.rootState.account_session.token)
                .sendRegisterInvitation(account)
                .then((result) => {
                    const taxpayer = {
                        tin: data.tin,
                        individual_details: {
                            firstName: data.first_name,
                            lastName: data.last_name
                        },
                        contact_details: {
                            email: data.email
                        }
                    }
                    return new TaxpayersAPI(context.rootState.account_session.token).create(taxpayer)
                })
                .then((result) => {
                    const connection = {
                        relationship: data.relationship,
                        to: data.tin,
                        from: data.from
                    }
                    return context.dispatch("CONNECT", connection);
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {

                });
        })
    }
}

export default {
    state,
    mutations,
    actions
}