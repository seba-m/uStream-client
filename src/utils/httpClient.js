const API = 'http://localhost:9000/apiv1';

export function get(url) {
    //console.log("URL= " + API + url);
    return fetch(API + url)
        .then((result) => console.log(result))
        .then((result) => result.json())
}