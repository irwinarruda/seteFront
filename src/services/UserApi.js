export const BASE_URL = 'http://sete.api';

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
