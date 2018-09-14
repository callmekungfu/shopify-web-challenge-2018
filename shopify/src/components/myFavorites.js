import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getStarredRepos } from '../actions';

let initFetched = false;

class MyFavorites extends Component {
    componentDidUpdate() {
        const { dispatch } = this.props;
        if (this.props.githubConn.connected && !initFetched) {
            dispatch(getStarredRepos(this.props.githubConn.gh));
            initFetched = true;
        }
    }

    render() {
        const { loaded, loading, result } = this.props.starredRepos;
        return (
            <div>
                <div className="search-results">
                    <table>
                        <tbody>
                            <tr className="table-header">
                                <td>Name</td>
                                <td>Language</td>
                                <td>Latest Tag</td>
                                <td></td>
                            </tr>
                            {loaded && result.map(repo => (
                                <tr key={repo.id}>
                                    <td>{repo.full_name}</td>
                                    <td>{repo.language}</td>
                                    <td>Latest Tag</td>
                                    <td><span className="add-link">Remove</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { starredRepos, githubConn } = state;
    return { starredRepos, githubConn };
};

export default connect(mapStateToProps)(MyFavorites);
