import { get, post, del } from '../utils/httpClient';

const getTopStreamers = () => {
    return get("/top-streamers");
}

const getStream = (streamerName) => {
    return get(`/stream/view/${streamerName}`);
}

const GeneralService = {
    getTopStreamers,
    getStream,

};

export default GeneralService;