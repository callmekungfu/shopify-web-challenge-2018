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

export const UNSTAR_REPO_REQUESTED = 'UNSTAR_REPO_REQUESTED';
export const UNSTAR_REPO_SUCCESS = 'UNSTAR_REPO_SUCCESS';
export const UNSTAR_REPO_FAILED = 'UNSTAR_REPO_FAILED';

export const REMOVE_FROM_SEARCH = 'REMOVE_FROM_SEARCH';

export const removeFromSearch = id => ({
    type: REMOVE_FROM_SEARCH,
    id
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
    const me = gh.getUser();
    return me.listStarredRepos((err, repos) => {
        dispatch(starredRepoReceived(repos));
    });
};

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
        .then((err, success) => {
            alert('successfully starred');
            dispatch(starRepoSuccess(gh));
            dispatch(removeFromSearch(repo.id));
        });
};

const unstarRepoFailed = () => ({
    type: UNSTAR_REPO_FAILED
});

const unstarRepoRequested = () => ({
    type: UNSTAR_REPO_REQUESTED
});

const unstarRepoSuccess = gh => (dispatch) => {
    dispatch(getStarredRepos(gh));
    return {
        type: UNSTAR_REPO_SUCCESS
    };
};

export const unstarRepo = (repo, gh) => (dispatch) => {
    dispatch(unstarRepoRequested());
    const target = gh.getRepo(repo.owner.login, repo.name);
    target.unstar()
        .then(() => {
            alert('successfully remove starred');
            dispatch(unstarRepoSuccess(gh));
        });
};

export const connectGithub = () => ({
    type: ACCESS_GITHUB,
    connection: new GitHub({
        token: 'c69bac536d88b592cc16c5f67627b39615378f03'
    })
});

const getReleaseTagRequest = key => ({
    type: GET_RESULT_RELEASE_REQUEST,
    key
});

const getReleaseTagReceived = newItem => ({
    type: GET_RESULT_RELEASE_RECEIVED,
    newItem
});

export const getReleaseTag = data => (dispatch) => {
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

const searchGithubRequest = () => ({
    type: SEARCH_GITHUB_REQUEST
});

const searchGithubReceived = json => ({
    type: SEARCH_GITHUB_RECEIVED,
    json
});

export const searchGithub = query => (dispatch, getState) => {
    dispatch(searchGithubRequest());
    const { result } = getState().starredRepos;
    return fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`)
        .then(res => res.json())
        .then((json) => {
            let count = 0;
            let counter = 0;
            while (count < 10 && count < json.items.length) {
                let starred = false;
                for (let i = 0; i < result.length; i++) {
                    starred = result[i].id === json.items[counter].id;
                    if (starred) { break; }
                }
                if (starred) {
                    counter++;
                } else {
                    dispatch(getReleaseTag(json.items[counter]));
                    count++;
                    counter++;
                }
            }
            dispatch(searchGithubReceived(json));
        });
};
