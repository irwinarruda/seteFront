import axios, { AxiosRequestConfig } from 'axios';

export const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const api = axios.create({
    baseURL: BASE_URL,
});

export interface IMUNICIPIOS_GET_ALL {
    tipo?: string;
    busca?: string;
}
export const MUNICIPIOS_GET_ALL = (
    token: string | null,
    params?: IMUNICIPIOS_GET_ALL,
): AxiosRequestConfig => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/municipios',
        params: params,
    };
};

export const MUNICIPIOS_GET_BY_ID = (
    id_city: number,
    token: string | null,
): AxiosRequestConfig => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: `/municipios/${id_city}`,
    };
};

export interface IFREE_ACCESS_FIREBASE {
    email: string;
    tipo_permissao: string;
}

export interface ADMIN_CHANGE_USER_PASSWORD_FIREBASE {
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    password: string;
    nivel_permissao: string;
}

export const FREE_ACCESS_FIREBASE = (
    body: IFREE_ACCESS_FIREBASE,
    token: string | null,
): AxiosRequestConfig => {
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

export interface IFREE_ACCESS_FIREBASE_LIST {
    pagina?: string;
    busca?: string;
}
export const FREE_ACCESS_FIREBASE_LIST = (
    token: string | null,
    params: IFREE_ACCESS_FIREBASE_LIST,
): AxiosRequestConfig => {
    return {
        method: 'get',
        headers: {
            Authorization: token,
        },
        url: '/permissao-firebase/usuarios-liberar',
        params: params,
    };
};

export const FREE_ACCESS_FIREBASE_DELETE = (
    token: string | null,
    user_id: number,
): AxiosRequestConfig => {
    return {
        method: 'delete',
        headers: {
            Authorization: token,
        },
        url: `/permissao-firebase/${user_id}`,
    };
};

export const CHANGE_PASSWORD_FIREBASE = (
    body: ADMIN_CHANGE_USER_PASSWORD_FIREBASE,
    token: string | null,
    codigo_cidade: number,
): AxiosRequestConfig => {
    return {
        method: 'put',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        url: `/users/${codigo_cidade}/alterar-senha`,
        data: body,
    };
};
