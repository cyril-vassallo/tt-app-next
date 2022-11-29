
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from '../store/store';

const App: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <Component {...props.pageProps} />
        </Provider>
    );
};

export default App;