import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// redux-thunk is a middleware that waits and sees if any action return a function instead of object
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { searchRobots, requestRobots } from './reducers';

const logger = createLogger();

// combineReducers is to combine our all the reducers
const rootReducers = combineReducers({searchRobots, requestRobots});
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister(); 
