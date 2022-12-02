import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from '../store/store';

import '../styles/globals.scss'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';


const App: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = createTheme( {
        palette: {
            mode: 'light',
        }
    })

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...props.pageProps}/>
             </ThemeProvider>
        </Provider>
    );
};

export default App;