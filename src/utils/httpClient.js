const API = 'http://localhost:9000/apiv1';

export function get(url) {
    return fetch(API + url)
        .then((result) => result.json())
}