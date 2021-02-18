export const BASE_URL = 'http://sete.api/';

export const USER_LOGIN_AUTH = (body) => {
    return {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        url: BASE_URL + 'authenticator',
        data: JSON.stringify(body),
    };
};

export const USER_IS_LOGED = () => {
    return {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': window.localStorage.getItem('token'),
        },
    };
};
