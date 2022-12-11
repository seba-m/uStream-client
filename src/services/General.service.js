import { get, post } from '../utils/httpClient';

const getTopStreamers = (page) => {
    return get(`/stream/top?&page=${page}`);
}

const getTopCategories = () => {
    return get("/category/top");
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

const followStreamer = (streamerName) => {
    return post("/stream/follow", {
        streamerName
    });
}

const unfollowStreamer = (streamerName) => {
    return post("/stream/unfollow", {
        streamerName
    });
}

const getFollowing = () => {
    return get("/stream/following");
}

const isFollowing = (streamerName) => {
    return get(`/stream/following/${streamerName}`);
}

const GeneralService = {
    getTopStreamers,
    getTopCategories,   
    getStream,

    searchCategory,
    searchStream,
    search,

    followStreamer,
    unfollowStreamer,
    getFollowing,
    isFollowing
};

export default GeneralService;