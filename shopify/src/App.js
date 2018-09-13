import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './configStore';

import Root from './components/root';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
