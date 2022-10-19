import axios from 'axios';

const API = 'http://localhost:9000/api';

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export function get(url) {

    if (authHeader()) {
        return axios.get(API + url, { headers: authHeader() })
            .then(response => response.data);
    } else {
        return axios.get(API + url)
            .then(response => response.data);
    }
}

export function post(url, data) {
    if (authHeader())
        return axios.post(API + url, data, { headers: authHeader() })
            .then(response => response.data);
    else
        return axios.post(API + url, data)
            .then(response => response.data);
}

export function put(url, data) {
    if (authHeader())
        return axios.put(API + url, data, { headers: authHeader() })
            .then(response => response.data);
    else
        return axios.put(API + url, data)
            .then(response => response.data);
}

export function del(url) {
    if (authHeader())
        return axios.delete(API + url, { headers: authHeader() })
            .then(response => response.data);
    else
        return axios.delete(API + url)
            .then(response => response.data);
}
