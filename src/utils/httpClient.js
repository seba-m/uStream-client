const API = 'http://192.168.1.92:9000/apiv1';

export function get(url) {
    return fetch(API + url)
        .then((result) => result.json())
        .catch((error) => console.error(error));
}