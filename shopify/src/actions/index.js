import fetch from 'cross-fetch';
import GitHub from 'github-api';

export const SEARCH_GITHUB_REQUEST = 'SEARCH_GITHUB_REQUEST';
export const SEARCH_GITHUB_RECEIVED = 'SEARCH_GITHUB_RECEIVED';

export const GET_RESULT_RELEASE_REQUEST = 'GET_RESULT_RELEASE_REQUEST';
export const GET_RESULT_RELEASE_RECEIVED = 'GET_RESULT_RELEASE_RECEIVED';

export const ACCESS_GITHUB = 'ACCESS_GITHUB';

export const GET_STARRED_REPOS_REQUEST = 'GET_STARRED_REPOS_REQUEST';
export const GET_STARRED_REPOS_RECEIVED = 'GET_STARRED_REPOS_RECEIVED';

export const STAR_REPO_REQUESTED = 'STAR_REPO_REQUESTED';
export const STAR_REPO_SUCCESS = 'STAR_REPO_SUCCESS';
export const STAR_REPO_FAILED = 'STAR_REPO_FAILED';

const starRepoFailed = () => ({
    type: STAR_REPO_FAILED
});

const starRepoRequested = () => ({
    type: STAR_REPO_REQUESTED
});

const starRepoSuccess = gh => (dispatch) => {
    dispatch(getStarredRepos(gh));
    return {
        type: STAR_REPO_SUCCESS
    };
};

export const starRepo = (repo, gh) => (dispatch) => {
    dispatch(starRepoRequested());
    const target = gh.getRepo(repo.owner.login, repo.name);
    target.star()
        .then((err) => {
            if (err.status === 204) {
                dispatch(starRepoSuccess());
            } else {
                dispatch(starRepoFailed());
            }
        });
};

export const connectGithub = () => ({
    type: ACCESS_GITHUB,
    connection: new GitHub({
        token: 'c69bac536d88b592cc16c5f67627b39615378f03'
    })
});

const starredRepoRequest = () => ({
    type: GET_STARRED_REPOS_REQUEST
});

const starredRepoReceived = list => ({
    type: GET_STARRED_REPOS_RECEIVED,
    list
});

export const getStarredRepos = gh => (dispatch) => {
    dispatch(starredRepoRequest());
    console.log('called');
    const me = gh.getUser();
    return me.listStarredRepos((err, repos) => {
        dispatch(starredRepoReceived(repos));
    });
};

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
