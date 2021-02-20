import React from 'react';
import axios from 'axios';
import { USER_IS_LOGED } from '../services/UserApi';

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
        console.log('cheguei aqui');
        if (token !== '' && token !== null) {
            const response = await axios(USER_IS_LOGED(token));
            const data = await response.data;
            setLogged(data.result);
        } else {
            setLogged(false);
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
    return (
        <AuthContext.Provider
            value={{
                logged,
                userIsLoggedAsync,
                signIn,
                signOut,
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
