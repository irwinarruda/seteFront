import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContex';
import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
    return (
        <>
            <BrowserRouter>
                <GlobalStyles />
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
