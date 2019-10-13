import axios from 'axios'

export default class PaymentAPI {

    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Object} details 
     */
    singlePayment(details){
        return axios.post('/payment', details);
    }

    /**
     * @returns {Promise}
     * @param {Array<Object>} details 
     */
    multiplePayment(details){
        return axios.post('/payment/multiple', details);
    }
}