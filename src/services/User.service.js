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

const getColor = (username) => {
    return get(API_URL + "/color/" + username);
}

const updateProfileSettings = (name, about) => {
    return post(API_URL + "/profile/settings", {
        name,
        about
    });
}

const updateStreamKey = () => {
    return post(API_URL + "/profile/key");
}

const updateProfileImage = (image) => {
    return postImage(API_URL + "/profile/avatar", image);
}

const updateProfileBanner = (image) => {
    return postImage(API_URL + "/profile/banner", image);
}

const updateChannelColor = (color) => {
    return post(API_URL + "/profile/color", color);
}

const updateStreamDetails = (data) => {
    return post(API_URL + "/profile/stream", data);
}

const updateContactSettings = (email, password, newPassword) => {

    return post(API_URL + "/profile/contact", {
        email,
        password,
        newPassword
    });
}

const deleteAccount = () => {
    return del(API_URL + "/profile/delete");
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
    getColor,

    updateProfileSettings,
    updateProfileImage,
    updateProfileBanner,
    updateStreamDetails,
    updateChannelColor,
    updateStreamKey,
    updateContactSettings,

    deleteProfileImage,
    deleteProfileBanner,
    deleteAccount
};

export default UserService;