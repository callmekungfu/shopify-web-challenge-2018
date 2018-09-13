import React, { Component } from 'react';

import RepoSearch from './repoSearch';
import Header from './header';
import MyFavorites from './myFavorites';

export default class Root extends Component {
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
