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
        return axios.post(`http://localhost:5000/oauth/login`, account);
    }

    /**
     * @returns {Promise}
     * @param {Object} account 
     */
    static signup(account) {
        console.table([account]);
        return axios.post(`http://localhost:5000/oauth/signup`, account);
    }

    /**
     * @returns {Promise}
     * @param {String} code 
     */
    static confirm(code) {
        console.log('code :', code);
        return axios.get(`http://localhost:5000/oauth/confirmation/${code}`)
    }

    /**
     * @returns {Promise}
     */
    doneSetup() {
        return axios.get('http://localhost:5000/oauth/confirmation/setup')
    }
}