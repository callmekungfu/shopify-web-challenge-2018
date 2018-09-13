import fetch from 'cross-fetch';

export const CONFIG_TEST = 'CONFIG_TEST';
export const SEARCH_GITHUB_REQUEST = 'SEARCH_GITHUB_REQUEST';
export const SEARCH_GITHUB_RECEIVED = 'SEARCH_GITHUB_RECEIVED';
export const GET_RESULT_RELEASE_REQUEST = 'GET_RESULT_RELEASE_REQUEST';
export const GET_RESULT_RELEASE_RECEIVED = 'GET_RESULT_RELEASE_RECEIVED';

export const testAction = () => ({
    type: CONFIG_TEST,
});

const searchGithubRequest = () => ({
    type: SEARCH_GITHUB_REQUEST
});

const searchGithubReceived = json => ({
    type: SEARCH_GITHUB_RECEIVED,
    json
});

export const searchGithub = query => (dispatch) => {
    dispatch(searchGithubRequest());
    return fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
        .then(res => res.json())
        .then((json) => {
            const array = json.items.slice(0, 10);
            array.forEach((item, i) => {
                dispatch(getReleaseTag(item, i));
            });
            dispatch(searchGithubReceived(json));
        });
};

const getReleaseTagRequest = key => ({
    type: GET_RESULT_RELEASE_REQUEST,
    key
});

const getReleaseTagReceived = newItem => ({
    type: GET_RESULT_RELEASE_RECEIVED,
    newItem
});

export const getReleaseTag = (data, key) => (dispatch) => {
    dispatch(getReleaseTagRequest(key));
    fetch(`${data.url}/releases`)
    .then(res => res.json())
    .then((releases) => {
        if (releases.length > 0) {
            const newData = Object.assign({}, data, { latest_release: releases[0].tag_name });
            dispatch(getReleaseTagReceived(newData));
        } else {
            const newData = Object.assign({}, data, { latest_release: '-' });
            dispatch(getReleaseTagReceived(newData));
        }
    });
};
