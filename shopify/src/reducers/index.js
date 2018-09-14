import {
    combineReducers
} from 'redux';
import {
    SEARCH_GITHUB_REQUEST,
    SEARCH_GITHUB_RECEIVED,
    GET_RESULT_RELEASE_RECEIVED,
    GET_STARRED_REPOS_REQUEST,
    ACCESS_GITHUB,
    GET_STARRED_REPOS_RECEIVED
} from '../actions';

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
                loaded: false,
                fully: []
            });
        case SEARCH_GITHUB_RECEIVED:
            return Object.assign({}, state, {
                searching: false,
                loaded: true,
                result: action.json
            });
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

const githubConn = (state = {
    gh: {},
    connected: false
}, action) => {
    switch (action.type) {
        case ACCESS_GITHUB:
            return Object.assign({}, state, {
                gh: action.connection,
                connected: true
            });
        default:
            return state;
    }
};

const starredRepos = (state = {
    loading: false,
    loaded: false,
    results: []
}, action) => {
    switch (action.type) {
        case GET_STARRED_REPOS_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                loaded: false
            });
        case GET_STARRED_REPOS_RECEIVED:
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                result: action.list
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    test,
    searchResult,
    githubConn,
    starredRepos
});

export default rootReducer;
