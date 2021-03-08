import React from 'react';
import { api, USER_IS_LOGED, USER_LOGIN_AUTH } from '../services/UserApi';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [logged, setLogged] = React.useState(() => {
        const token = window.localStorage.getItem('@seteweb:token');
        if (token !== '' && token !== null) {
            return true;
        }
        return false;
    });

    const userIsLoggedAsync = async () => {
        const token = window.localStorage.getItem('@seteweb:token');
        if (token !== '' && token !== null) {
            const response = await api(USER_IS_LOGED(token));
            const data = await response.data;
            setLogged(data.result);
        } else {
            setLogged(false);
        }
    };

    const signInAsync = async (body) => {
        const response = await api(USER_LOGIN_AUTH(body));
        const data = await response.data;
        if (!data.result) {
            throw { response };
        }
        if (data.access_token) {
            window.localStorage.setItem(
                '@seteweb:token',
                data.access_token.access_token,
            );
            setLogged(true);
        }
    };
    const signIn = (token) => {
        window.localStorage.setItem('@seteweb:token', token);
        setLogged(true);
    };

    const signOut = () => {
        window.localStorage.removeItem('@seteweb:token');
        setLogged(false);
    };

    const handleRequestError = (err) => {
        let errorMessage;

        if (err.response) {
            errorMessage = Array.isArray(err.response.data.messages)
                ? err.response.data.messages[0]
                : err.response.data.messages ||
                  err.response.status + ': ' + err.response.statusText;

            if (err.response.status === 401) {
                window.localStorage.removeItem('@seteweb:token');
                setLogged(false);
            }
        } else if (err.request) {
            errorMessage = err.request;
        } else {
            errorMessage = err.message;
        }

        return errorMessage;
    };
    return (
        <AuthContext.Provider
            value={{
                logged,
                userIsLoggedAsync,
                signInAsync,
                signIn,
                signOut,
                handleRequestError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a provider');
    }
    return context;
}
