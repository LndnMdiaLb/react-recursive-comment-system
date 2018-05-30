import React, { Component } from 'react';

import './App.css';
import { Provider } from 'react-redux' ;

import { createStore, applyMiddleware, compose } from 'redux' ;
import thunk from 'redux-thunk';
import { reducer } from './redux/reducers';
import { statetree } from './redux/statetree' ;

import { generateTree } from './utilities/utilities' ;

import { getRemotePosts } from './utilities/network' ;

import {Thread} from './components/Threads' ;

/*
  Component :
    connects app to the network.js API
    uses network api to hydrate statetree template
    generates redux store passing middleware, reducers and default statetree

    updates react UI with connected <Threads>
*/

class App extends Component {

state={
  renderContent:undefined
}

componentDidMount(){

    getRemotePosts()
      // hydrate statetree template
      .then(({data})=> {
          statetree.posts = data ;
          return statetree })
      // hydrate statetree template
    // getRemoteCategories()
      // compose redux store
      .then(statetree=> {
          const store = createStore(
              reducer ,
              statetree ,
              compose( applyMiddleware(thunk),
                      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    )
          ) ;
          return { statetree , store } })

      // use utilites.js  to build tree
      .then(
        ({statetree:{posts}, store})=>
          ({store, tree:generateTree(posts)})
      )
      // compose redux store
      .then(
        // curry params because React Reasons
        ({ store, tree })=>
          this.setState(prev=>({
            renderContent:_=>
              <Provider {...{store}}>
                <Thread {...{tree}}/>
              </Provider>
              }) ))  }


  render() {
    const { renderContent } = this.state ;
    return (
      <React.Fragment>
        {
          renderContent
            ? renderContent()
            : <span>waiting</span>
        }
      </React.Fragment>
    )
  }
}

export default App;
