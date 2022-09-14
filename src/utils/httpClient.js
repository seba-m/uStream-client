const API = 'https://api.themoviedb.org/3';

export function get(url) {
    return fetch(API + url, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDZiODM0YTUxYzdjMzUxMTRjNWQyODQ3YTlmYzM0NiIsInN1YiI6IjYyMTdlNWFiM2Q0ZDk2MDAxYTMwMmQ4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r54gTc7tcnVjvTvOhEV0dYvvaHEDYoGBtsOkOHGJAV4"
        }
    }).then((result) => result.json())
}