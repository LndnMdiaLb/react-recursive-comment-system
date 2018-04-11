import React, { Component } from 'react';
import './App.css';

import PostConected from './PostContainer.js' ;

class App extends Component {
  render() {
    return (
      <PostView>
        <PostConected id={'hlkjhljkh'}>
          { children && children }
        </PostConected>
      </PostView>
    );
  }
}

export default App;
