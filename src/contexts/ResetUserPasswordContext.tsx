import React from 'react';

type NavCardProviderProps = {
    children: React.ReactNode;
};

const ResetUserPasswordContext = React.createContext({});

const ResetUserPasswordProvider = ({
    children,
}: NavCardProviderProps): JSX.Element => {
    const [resetPassord, setResetPassord] = React.useState<Boolean>(false);
    const value = React.useMemo(
        () => ({
            resetPassord,
            setResetPassord,
        }),
        [resetPassord],
    );
    return (
        <ResetUserPasswordContext.Provider value={value}>
            {children}
        </ResetUserPasswordContext.Provider>
    );
};

function useResetPassword(): any {
    const context = React.useContext(ResetUserPasswordContext);
    if (!context) {
        throw new Error('O NavCard deve ser usado entre um contexto');
    }
    return context;
}

export {
    ResetUserPasswordProvider,
    ResetUserPasswordContext,
    useResetPassword,
};
