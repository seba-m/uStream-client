import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export function get(url) {
    return axios.get(API + url, { headers: authHeader() })
        .then(response => response.data);
}

export function post(url, data) {
    return axios.post(API + url, data, { headers: authHeader() })
        .then(response => response.data);
}

export function postImage(url, data) {
    //se agrega el header de autentificación, mas el header del tipo imagen
    return axios.post(API + url, data, 
        { headers: 
            {   ...authHeader(),
                "Content-Type": "multipart/form-data" 
            }
        })
        .then(response => response.data);
}

export function put(url, data) {
    return axios.put(API + url, data, { headers: authHeader() })
        .then(response => response.data);

}

export function del(url) {
    return axios.delete(API + url, { headers: authHeader() })
        .then(response => response.data);
}
