import {
    combineReducers
} from 'redux';
import {
    SEARCH_GITHUB_REQUEST,
    SEARCH_GITHUB_RECEIVED,
    GET_RESULT_RELEASE_RECEIVED,
    GET_STARRED_REPOS_REQUEST,
    ACCESS_GITHUB,
    GET_STARRED_REPOS_RECEIVED,
    REMOVE_FROM_SEARCH
} from '../actions';

const searchResult = (state = {
    searching: false,
    loaded: false,
    fully: [],
    newLoad: false
}, action) => {
    let temp = [];
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
        case REMOVE_FROM_SEARCH:
            temp = state.fully;
            console.log(action.id);
            temp.forEach((item, i) => {
                if (item.id === action.id) {
                    temp.splice(i, 1);
                }
            });
            return Object.assign({}, state, {
                fully: temp
            });
        case GET_RESULT_RELEASE_RECEIVED:
            temp = state.fully;
            temp.push(action.newItem);
            return Object.assign({}, state, {
                fully: temp,
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
    searchResult,
    githubConn,
    starredRepos
});

export default rootReducer;
