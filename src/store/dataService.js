import { http, formData_instance } from './interceptor';

const get = (url) => http.get(url);

const post = (url, data) => http.post(url, data);

const del = (url) => http.delete(url);
const put = (url, data) => http.put(url, data);

const form_post = (url, image) => formData_instance.post(url, image);
const patch = (url, data) => http.patch(url, data);

const DataService = {
    get,
    post,
    del,
    put,
    form_post,
    patch,
};

export default DataService;
