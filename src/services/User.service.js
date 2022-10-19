import { get } from '../utils/httpClient';

const API_URL = "/user";

const getProfile = () => {
    return get(API_URL + "/profile");
}

const UserService = {
    getProfile,
};

/*
profile
stream
profile update
stream update
delete account
*/


export default UserService;