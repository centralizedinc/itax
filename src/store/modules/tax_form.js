import TaxForm from "../../api/TaxFormAPI";

function initialState() {
    return {
        draft_forms: []
    }
}

const state = initialState()

const mutations = {
    ADD_DRAFT_FORM(state, data) {
        state.draft_forms.push(data)
    },
    REMOVE_DRAFT_FORM(state, ref_no) {
        const index = state.draft_forms.findIndex(v => v.ref_no === ref_no)
        if (index > -1) state.draft_forms.splice(index, 1);
    }
}

const actions = {
    VALIDATE_AND_SAVE(context, { form_type, form_details }) {
        return TaxForm.saveAndValidate(form_type, form_details)
    },
    ADD_DRAFT_FORM(context, data) {
        data.created_by = context.rootState.account_session.account.account_id;
        context.commit('ADD_DRAFT_FORM', data);
    }
}

export default {
    state,
    mutations,
    actions
}