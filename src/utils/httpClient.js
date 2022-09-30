const API = 'http://localhost:9000/api';

export function get(url) {
    return fetch(API + url).then((result) => result.json())
}