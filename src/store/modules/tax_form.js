import TaxForm from "../../api/TaxFormAPI";

function initialState() {
    return {
        draft_forms: [],
        tax_returns: []
    }
}

const state = initialState()

const mutations = {
    ADD_DRAFT_FORM(state, data) {
        state.draft_forms.push(data)
    },
    SAVE_DRAFT_FORM(state, data) {
        console.log('###before data.details :', data.details);
        const index = state.draft_forms.findIndex(v => v.ref_no === data.ref_no);
        if (index > -1) {
            state.draft_forms[index].details = {};
            state.draft_forms[index].details = data.details;
            state.draft_forms[index].taxpayer = data.details && data.details.taxpayer ? data.details.taxpayer.tin : '';
            console.log('###after state.draft_forms[index].details :', state.draft_forms[index].details);
        }
    },
    REMOVE_DRAFT_FORM(state, ref_no) {
        const index = state.draft_forms.findIndex(v => v.ref_no === ref_no)
        if (index > -1) state.draft_forms.splice(index, 1);
    },
    SET_TAX_RETURNS(state, data) {
        state.tax_returns = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            if (key === 'draft_forms') return;
            else state[key] = initialState()[key];
        })
    }
}

const actions = {
    VALIDATE_AND_SAVE(context, { form_type, form_details }) {
        console.log('context.rootState.account_session :', context.rootState.account_session);
        return new TaxForm(context.rootState.account_session.token).saveAndValidate(form_type, form_details)
    },
    ADD_DRAFT_FORM(context, data) {
        data.created_by = context.rootState.account_session.account.account_id;
        context.commit('ADD_DRAFT_FORM', data);
    },
    GET_TAX_RETURNS(context, data) {
        return new Promise((resolve, reject) => {
            new TaxForm(context.rootState.account_session.token).getReturnsDetails()
                .then((result) => {
                    console.log('result.data.model :', result.data.model);
                    context.commit('SET_TAX_RETURNS', result.data.model);
                    resolve(result.data.model);
                }).catch((err) => {
                    reject(err)
                });
        })
    }
}

export default {
    state,
    mutations,
    actions
}