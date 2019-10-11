import axios from 'axios'

export default class TaxForm {

    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Object} form_details
     */
    saveAndValidate(form_type, form_details) {
        return axios.post(`tax/returns/validate/${form_type}`, form_details)
    }

    /**
     * @returns {Promise}
     */
    getReturnsDetails() {
        return axios.get('tax/returns');
    }
}