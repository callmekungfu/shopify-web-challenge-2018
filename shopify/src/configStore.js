import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    createLogger
} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
const configStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware,
    )
);

export const store = configStore();
