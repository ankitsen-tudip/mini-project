import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";

import movie from './redux/reducer'
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    movie
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
