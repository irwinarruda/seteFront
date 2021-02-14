import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
    return (
        <div>
            <BrowserRouter>
                <GlobalStyles />
                <Routes />
            </BrowserRouter>
        </div>
    );
}

export default App;
