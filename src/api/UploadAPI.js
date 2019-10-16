import axios from 'axios'

export default class UploadAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    uploadAvatar({ account_id, form_data }) {
        if (!form_data) return Promise.resolve();
        return axios.post(`upload/avatar/${account_id}`, form_data);
    }

    uploadForms({ form, ref_no, form_data }) {
        if (!form_data) return Promise.resolve();
        console.log(':::: UPloading forms ...')
        return axios.post(`upload/forms/${form}/${ref_no}`, form_data);
    }

    getForm({form, ref_no}){
        return axios.get(`upload/forms/${form}/${ref_no}`)
    }
    
}