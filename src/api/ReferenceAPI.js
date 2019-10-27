import axios from 'axios'

export default class ReferenceAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns { Promise }
     */
    getRdos(){
        return axios.get('reference/rdos');
    }
}