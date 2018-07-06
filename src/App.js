import React, { Component } from 'react';
import { Provider } from 'react-redux' ;
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom' ;


import { requestRemotePostsAction, requestRemoteCategoriesAction } from './redux/asyncActions' ;
import { userLoginAction } from './redux/actions' ;


import { createStore, applyMiddleware, compose } from 'redux' ;
import thunk from 'redux-thunk';
import { reducer } from './redux/reducers';


import {Thread} from './components/Threads' ;


import './App.css';




/*

    Component :

    connects app to the network.js API
    uses network api to hydrate statetree template
    generates redux store passing middleware, reducers and default statetree

    updates react UI with connected <Threads>

*/

const store= createStore(
        reducer,
        compose( applyMiddleware(thunk) ,
                // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )) ;


const Spinner= _=><div className='spinner'></div> ;


class Login extends React.Component {

    state = { user: "anonymous" } ;
    constructor(props) { super(props) ; }

    update= ({target:{value:user}})=> this.setState(_=>({ user })) ;

    render=_=> {
        const { user }= this.state ;
        return (    <div className='login'>
                        <span> log in as:</span>
                        <input onChange={this.update}/>
                        <Link to={ `/${user}` }>
                            <button> Login </button>
                        </Link>
                    </div>  ) } ;
    }


class App extends Component {

    state={ hydrated:false }

    componentDidMount(){ this.getRemote(); }

    getRemote=_=>
        Promise.all([
            store.dispatch(requestRemotePostsAction()),
            store.dispatch(requestRemoteCategoriesAction()) ])
        .then(_=>this.allowThreads()) ;

    allowThreads=_=>
        this.setState(prev=>
            ({  hydrated:true,
                posts:  store.getState().posts,
                user:   store.getState().user }) ) ;

    render=_=>
        <Provider {...{ store }}>
            <BrowserRouter>
                <main>
                    <Switch>

                        <Route
                            exact path='/'
                            component= { Login } />

                        <Route
                            path='/:user'
                            render= {
                                ({ match:{ params:{ user }}})=>{
                                    const {user:current, hydrated, posts} = this.state ;
                                    current !==user && store.dispatch( userLoginAction(user) ) ;
                                    return hydrated
                                        ? <Thread posts={ posts }/>
                                        : <Spinner  /> }  } />
                    </Switch>
                </main>
            </BrowserRouter>
        </Provider> ;
} ;

export default App;