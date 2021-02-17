import React from 'react';

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [logged, setLogged] = React.useState(false);
    return (
        <AuthContext.Provider
            value={{
                logged,
                login: () => {
                    setLogged(true);
                },
                logout: () => {
                    setLogged(false);
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
