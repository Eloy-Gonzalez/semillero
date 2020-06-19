// @Vendors
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

// @Components
import App from 'pages/App';

// @Statics > Styles
import 'statics/styles/index.scss'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
serviceWorker.unregister();
