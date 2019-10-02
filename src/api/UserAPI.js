import axios from 'axios'

export default class UserAPI {

    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {Object} updated_account 
     */
    update(id, updated_account) {
        return axios.post(`/users/${id}`, updated_account);
    }

    /**
     * @returns {Promise} 
     * @param {Object} updated_account 
     */
    updateByAccountID(updated_account) {
        return axios.post(`/users/accountid`, updated_account);
    }
}