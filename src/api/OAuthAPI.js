import axios from 'axios'

export default class OAuthAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Object} account 
     */
    static login(account) {
        console.table([account]);
        return axios.post(`oauth/login`, account);
    }

    /**
     * @returns {Promise}
     * @param {Object} account 
     */
    static signup(account) {
        console.table([account]);
        return axios.post(`oauth/signup`, account);
    }

    /**
     * @returns {Promise}
     * @param {String} code 
     */
    static confirm(code) {
        console.log('code :', code);
        return axios.get(`oauth/confirmation/${code}`)
    }

    /**
     * @returns {Promise}
     */
    doneSetup() {
        return axios.get('oauth/confirmation/setup')
    }

    /**
     * @returns {Promise}
     * @param {Object} details
     */
    sendRegisterInvitation(details) {
        return axios.post('oauth/invitation', details)
    }
}