import axios from 'axios';

export const BASE_URL = 'https://seteapi.umarleyricardo.eti.br';
//export const BASE_URL = 'http://sete.api';

export const api = axios.create({
    baseURL: BASE_URL,
});

export const apiIsCancel = (e) => {
    return axios.isCancel(e);
};

export const MUNICIPIOS_GET_ALL = (token, params = {}) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/municipios',
        params: params,
    };
};

export const MUNICIPIOS_GET_BY_ID = (id_city, token) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: `/municipios/${id_city}`,
    };
};

export const FREE_ACCESS_FIREBASE = (body, token) => {
    return {
        method: 'post',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        url: '/permissao-firebase',
        data: body,
    };
};

export const FREE_ACCESS_FIREBASE_LIST = (token, params = {}) => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/permissao-firebase/usuarios-liberar',
        params: params,
    };
};
