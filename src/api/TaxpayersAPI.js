import axios from 'axios'

export default class TaxpayersAPI {

    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    create(data) {
        return axios.post('/taxpayer', data);
    }

    /**
     * @returns {Promise}
     * @param {String} tin 
     */
    searchTaxpayerByTIN(tin) {
        return axios.get(`/taxpayer/tin?tin=${tin}`);
    }

    /**
     * @returns {Promise}
     * @param {String} tin
     * @param {Boolean} ignore_user
     */
    getTaxpayerByTIN(tin, ignore_user) {
        return axios.get(`/taxpayer/tin/${tin}?ignore_user=${ignore_user}`);
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {Object} data 
     */
    update(id, data) {
        return axios.post(`taxpayer/${id}`, data);
    }

    /**
     * @returns {Promise}
     */
    getTaxpayers() {
        return axios.get("taxpayer");
    }

    /**
     * @returns {Promise}
     */
    getTaxpayersByUser(id) {
        return axios.get(`taxpayer/users/${id}`);
    }
}