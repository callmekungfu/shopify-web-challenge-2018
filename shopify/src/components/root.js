import React, { Component } from 'react';
import { connect } from 'react-redux';

import { connectGithub } from '../actions';
import RepoSearch from './repoSearch';
import Header from './header';
import MyFavorites from './myFavorites';

class Root extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(connectGithub());
    }

    render() {
        return (
        <div>
            <Header />
            <div className="component">
                <RepoSearch />
            </div>
            <div className="component bg-purple-light">
                <MyFavorites />
            </div>
        </div>
        );
  }
}

const mapStateToProps = (state) => {
    const { githubConn } = state;
    return githubConn;
};

export default connect(mapStateToProps)(Root);
