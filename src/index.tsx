import React from 'react';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";

// ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
