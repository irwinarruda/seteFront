import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const api = axios.create({
    baseURL: BASE_URL,
});

export interface IUSER_LOGIN {
    usuario: string;
    senha: string;
}
export const USER_LOGIN_AUTH = (body: IUSER_LOGIN): AxiosRequestConfig => {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        url: '/authenticator',
        data: body,
    };
};

export const USER_IS_LOGED = (token: string | null): AxiosRequestConfig => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/authenticator',
    };
};
export interface IUSER_CREATE {
    nome: string;
    email: string;
    senha: string;
}
export const USER_CREATE = (
    body: IUSER_CREATE,
    token: string | null,
): AxiosRequestConfig => {
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

export interface IUSER_UPDATE {
    nome?: string;
    email?: string;
    senha?: string;
}
export const USER_UPDATE = (
    body: IUSER_UPDATE,
    token: string | null,
    user_id: string,
): AxiosRequestConfig => {
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

export interface IUSERS_LIST {
    pagina?: string;
    busca?: string;
}
export const USERS_LIST = (
    token: string | null,
    params: IUSERS_LIST,
): AxiosRequestConfig => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/users/api',
        params: params,
    };
};

export const USERS_SETE_LIST = (
    token: string | null,
    municipio_id: string,
): AxiosRequestConfig => {
    return {
        method: 'get',
        url: `/users/sete/${municipio_id}`,
        headers: {
            Authorization: token,
        },
    };
};
