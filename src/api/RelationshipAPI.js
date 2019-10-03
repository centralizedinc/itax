import axios from 'axios'

export default class RelationshipAPI {

    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} tin
     */
    getConnections(tin) {
        return axios.get(`connections/${tin}`);
    }

    /**
     * @returns {Promise}
     * @param {Object} 'relationship, from, to' 
     */
    connect(details) {
        return axios.post('connections', details);
    }


    /**
     * @returns {Promise}
     * @param {String} from
     * @param {String} to
     */
    removeConnection(from, to) {
        return axios.post('connections/remove', { from, to });
    }
}