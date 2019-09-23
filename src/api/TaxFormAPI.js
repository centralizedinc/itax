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
        console.log('form_type :', form_type);
        console.log('saveAndValidate :', form_details);
        return axios.post(`http://localhost:5000/tax/returns/validate/${form_type}`, form_details)
    }

    /**
     * @returns {Promise}
     */
    getReturnsDetails() {
        return axios.get('http://localhost:5000/tax/returns');
    }
}