import React from 'react';
import {
    api,
    USER_IS_LOGED,
    USER_LOGIN_AUTH,
    IUSER_LOGIN,
} from '../services/UserApi';
import { useErrorHandler } from './Errors';

export interface IAuthContextData {
    logged: boolean;
    userIsLoggedAsync: () => Promise<void>;
    signInAsync: (body: IUSER_LOGIN) => Promise<void>;
    signIn: (token: string) => void;
    signOut: () => void;
    handleRequestError: (err: any) => string;
}

export const AuthContext = React.createContext<IAuthContextData>(
    {} as IAuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = React.useState<boolean>(() => {
        const token = window.localStorage.getItem('@seteweb:token');
        if (token !== '' && token !== null) {
            return true;
        }
        return false;
    });
    const { warningHandler } = useErrorHandler();

    const userIsLoggedAsync = async (): Promise<void> => {
        const token = window.localStorage.getItem('@seteweb:token');
        if (token !== '' && token !== null) {
            const response = await api(USER_IS_LOGED(token));
            const data = await response.data;
            setLogged(data.result);
        } else {
            setLogged(false);
        }
    };

    const signInAsync = async (body: IUSER_LOGIN): Promise<void> => {
        const response = await api(USER_LOGIN_AUTH(body));
        const data = await response.data;
        warningHandler(data);
        if (data.access_token) {
            window.localStorage.setItem(
                '@seteweb:token',
                data.access_token.access_token,
            );
            setLogged(true);
        }
    };
    const signIn = (token: string): void => {
        window.localStorage.setItem('@seteweb:token', token);
        setLogged(true);
    };

    const signOut = (): void => {
        window.localStorage.removeItem('@seteweb:token');
        setLogged(false);
    };

    const handleRequestError = (err: any): string => {
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
};

export const useAuth = (): IAuthContextData => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a provider');
    }
    return context;
};
