import React, { Component } from 'react';
import './App.css';

import PostContainer from './PostContainer.js' ;

class App extends Component {
  render() {
    return (
      <PostView>
        <PostContainer>
          { children && children }
        </PostContainer>
      </PostView>
    );
  }
}

export default App;
