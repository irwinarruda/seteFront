import axios from 'axios';

export const BASE_URL = 'http://sete.api';

export const api = axios.create({
    baseURL: BASE_URL,
});

export const USER_LOGIN_AUTH = (body) => {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/authenticator',
        data: body,
    };
};

export const USER_IS_LOGED = (token) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/authenticator',
    };
};
