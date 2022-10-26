import { get } from '../utils/httpClient';

const getTopStreamers = () => {
    return get("/stream/top");
}

const getStream = (streamerName) => {
    return get(`/stream/view/${streamerName}`);
}

const searchCategory = (categoryName, page) => {
    return get(`/search/category?query=${categoryName}&page=${page}`);
}

const searchStream = (streamerName, page) => {
    return get(`/search/stream?query=${streamerName}&page=${page}`);
}

const search = (searchText) => {
    return get(`/search/?query=${searchText}`);
}

const GeneralService = {
    getTopStreamers,
    getStream,

    searchCategory,
    searchStream,
    search
};

export default GeneralService;