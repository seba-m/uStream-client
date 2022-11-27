import { get, getImg, post, postImage, del } from '../utils/httpClient';

const API_URL = "/user";

const getProfile = () => {
    return get(API_URL + "/profile");
}

const getStreamDetails = () => {
    return get(API_URL + "/stream");
}

const getUserAvatar = (username) => {
    return getImg(API_URL + "/avatar/" + username);
}

const getUserBanner = (username) => {
    return getImg(API_URL + "/banner/" + username);
}

const updateProfileSettings = (username, publicUsername, about) => {
    return post(API_URL + "/profile", {
        username,
        publicUsername,
        about
    });
}

const updateProfileImage = (image) => {
    return postImage(API_URL + "/profile/avatar", image);
}

const updateProfileBanner = (image) => {
    return postImage(API_URL + "/profile/banner", image);
}

const updateStreamDetails = (data) => {
    return post(API_URL + "/stream", data);
}

const deleteAccount = () => {
    return del(API_URL + "/delete");
}

const deleteProfileImage = () => {
    return del(API_URL + "/profile/avatar");
}

const deleteProfileBanner = () => {
    return del(API_URL + "/profile/banner");
}

const UserService = {
    getProfile,
    getStreamDetails,
    getUserAvatar,
    getUserBanner,

    updateProfileSettings,
    updateProfileImage,
    updateProfileBanner,
    updateStreamDetails,

    deleteProfileImage,
    deleteProfileBanner,
    deleteAccount
};

export default UserService;