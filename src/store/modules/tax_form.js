import TaxForm from "../../api/TaxFormAPI";

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
    VALIDATE_AND_SAVE(context, { form_type, form_details }) {
        return TaxForm.saveAndValidate(form_type, form_details)
    }
}

export default {
    state,
    mutations,
    actions
}