import { get, post, del } from '../utils/httpClient';

const API_URL = "/user";

const getProfile = () => {
    return get(API_URL + "/profile");
}

const getStreamDetails = () => {
    return get(API_URL + "/stream");
}

const updateProfile = (data) => {
    return post(API_URL + "/profile", data);
}

const updateStreamDetails = (data) => {
    return post(API_URL + "/stream", data);
}

const deleteAccount = () => {
    return del(API_URL + "/delete");
}

const UserService = {
    getProfile,
    getStreamDetails,
    updateProfile,
    updateStreamDetails,
    deleteAccount
};

export default UserService;