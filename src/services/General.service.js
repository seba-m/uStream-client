import { get, post, del } from '../utils/httpClient';

const getTopStreamers = () => {
    return get("/stream/top");
}

const getStream = (streamerName) => {
    return get(`/stream/view/${streamerName}`);
}

const searchStream = (streamerName, page) => {
    return get(`/search/stream?query=${streamerName}&page=${page}`);
}

const searchTag = (tagName, page) => {
    return get(`/search/tag?query=${tagName}&page=${page}`);
}

const search = (searchText) => {
    return get(`/search/?query=${searchText}`);
}

const GeneralService = {
    getTopStreamers,
    getStream,

    searchStream,
    searchTag,
    search


};

export default GeneralService;