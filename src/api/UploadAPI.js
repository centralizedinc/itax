import axios from 'axios'

export default class UploadAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    uploadAvatar({ account_id, form_data }) {
        if (!form_data) return Promise.resolve();
        return axios.post(`upload/avatar/${account_id}`, form_data);
    }
    
}