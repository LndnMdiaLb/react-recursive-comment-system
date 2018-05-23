import React from 'react';
import { connect } from 'react-redux';

import {
    // USER_LOGIN, CREATE_POST, EDIT_POST, DELETE_POST, VOTE_POST,
    userLoginAction, createPostAction, cancelPostAction, updatePostAction,
} from './Redux/actions' ;

import Post from './Post' ;

import { uuint } from './utilities/utilities' ;


class Container extends React.Component {


    state= { } ;
    constructor(props){ super(props) ;
        // children components are rendered from state instead of props because user can concat() new children
        this.state.children= this.props.children
    } ;

    // action
    createPost= () => {
        const { dispatch, id:parent, user:author }= this.props,
                id= uuint(), timestamp= Date.now() ;
        // interact with store
        dispatch(createPostAction(id, parent, author, timestamp)) ;
        this.setState(prevState => {
            return {
                // concat to front
                children: [ <ConnectedContainer { ...{
                                key:id,
                                parent, id, user:author, author,
                                timestamp, editnumber:0,
                                // pass cancelPost to child Container so child Post can affect parent Container
                                cancelInParent:this.cancelPost } }
                            /> ].concat( prevState.children || this.props.children || [])
                  }});
    }

    // revert
    cancelPost= callback => {
        const { id, dispatch, cancelInParent }= this.props;

        // interact with store
        cancelInParent && cancelInParent(_=>dispatch(cancelPostAction(id)))

        this.setState((prevState, props) => ({
                // remove first
                children: ( prevState.children || props.children || []).slice(1) }) ,
                callback );
    }

    // revert
    updatePost= (title, body) => {
        const { dispatch, id }= this.props,
                timestamp= Date.now() ;
        // interact with store
        dispatch(updatePostAction(id, title, body, timestamp)) ;
    }

    render() {
        const { children  } = this.state ,
              {  title , body , voteScore,
                 user, author, id, editnumber, timestamp  } = this.props ;

        return (    <article className='container'>
                        <Post
                            { ...{  title , body , voteScore,
                                    user, author, id, editnumber, timestamp  } }

                            reply= { this.createPost }
                            cancel= { this.cancelPost }
                            update= { this.updatePost } />

                        <section className={'comments'}>
                            { children && children }
                        </section>
                    </article>  ) }
} ;

const ConnectedContainer = connect()(Container);

export default ConnectedContainer;

