import axios from 'axios';

export const BASE_URL = 'https://seteapi.umarleyricardo.eti.br/';

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

export const USER_CREATE = (body, token) => {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        url: '/users/api',
        data: body,
    };
};

export const USER_UPDATE = (body, token, user_id) => {
    return {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        url: `/users/api/${user_id}`,
        data: body,
    };
};

export const USERS_LIST = (token, params = {}) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/users/api',
        params: params,
    };
};
