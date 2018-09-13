import {
    combineReducers
} from 'redux';
import {
    CONFIG_TEST,
    SEARCH_GITHUB_REQUEST,
    SEARCH_GITHUB_RECEIVED,
    GET_RESULT_RELEASE_RECEIVED,
    GET_RESULT_RELEASE_REQUEST
} from '../actions';

const test = (state = {
    working: false
}, action) => {
    switch (action.type) {
        case CONFIG_TEST:
            return Object.assign({}, state, {
                working: true
            });
        default:
            return state;
    }
};

let working = 0;
const searchResult = (state = {
    searching: false,
    loaded: false,
    fully: [],
    newLoad: false
}, action) => {
    switch (action.type) {
        case SEARCH_GITHUB_REQUEST:
            return Object.assign({}, state, {
                searching: true,
                loaded: false
            });
        case SEARCH_GITHUB_RECEIVED:
            return Object.assign({}, state, {
                searching: false,
                loaded: true,
                result: action.json
            });
        case GET_RESULT_RELEASE_REQUEST:
            working = action.key;
            return state;
        case GET_RESULT_RELEASE_RECEIVED:
            const newArr = state.fully;
            newArr.push(action.newItem);
            return Object.assign({}, state, {
                fully: newArr,
                newLoad: true
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    test,
    searchResult
});

export default rootReducer;
