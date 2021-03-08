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
        url: BASE_URL + '/authenticator',
        data: JSON.stringify(body),
    };
};

export const USER_IS_LOGED = (token) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: BASE_URL + '/authenticator',
    };
};

export const MUNICIPIOS_GET_ALL = (token) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: BASE_URL + '/municipios',
    };
};

export const FREE_ACCESS_FIREBASE = (body, token) => {
    return {
        method: 'post',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        url: BASE_URL + '/permissao-firebase',
        data: JSON.stringify(body),
    };
};
