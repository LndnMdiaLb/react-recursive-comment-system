import React from 'react';
import { connect } from 'react-redux';

import { Consumer } from './GlobalState' ;
import { Control } from './Control' ;

import {
    // USER_LOGIN, CREATE_POST, EDIT_POST, DELETE_POST, VOTE_POST,
    userLoginAction, createPostAction, cancelPostAction, updatePostAction, deleteAction,
} from '../redux/actions' ;

import {
    // REQUEST_POSTS, SUCCESS_POSTS, FAILURE_POSTS
    createRemotePostAction, updateRemotePostAction, deleteRemotePostAction
} from '../redux/asyncActions' ;

import Post from './Post' ;

import { uuint } from '../utilities/math' ;


class Container extends React.Component {



    state= { replying:false } ;
    constructor(props){ super(props) ;
        /*
            children components are rendered from state instead of props because user needs to be able to modify the list
            either with via concat() or sort()
        */
        this.state.comments= this.props.comments || [] ;
    } ;




    // add a new comment to this post
    createPost=_=> {
        const { dispatch, // redux dispatch
                id:parent, user:author }= this.props, // id , user -required from props
                id= uuint(), timestamp= Date.now() ; // uuint and timestamp should be generated on server(?)

        // stop creation if new post is created and in edit mode
        if(this.state.replying) return

        // create new post object in redux store
        dispatch( createPostAction(id, parent, author, timestamp) ) ;

        this.setState(prev=> {
            const commentContainer= {
                        parent, id, author,
                        timestamp, editnumber:0,
                        /*  pass cancelPost to child Container
                            so child Post can affect parent Container   */
                        cancelInParent:this.cancelPost,
                        replyStatusInParent:this.toggleReplyStatus }

            return {
                current: id , // used as identifier of comment to remove if cancelled
                replying:true ,
                comments: [ commentContainer ].concat( prev.comments ) // concat to front
                }}) ;
    }

    toggleReplyStatus=_=> this.setState( prev=>({ replying:!prev.replying })) ;

    // revert
    cancelPost=callback=> {
        const { id, dispatch, cancelInParent }= this.props;

        // interact with store via parent container callback
        cancelInParent && cancelInParent(_=>dispatch(cancelPostAction(id)))

        this.setState((prevState, props)=> ({
                current: undefined ,
                replying: false ,
                comments: prevState.comments.filter( container=>container.id != prevState.current)
            }) , callback ) ;
    }




    // revert
    updatePost=(title, body, firstpost=false)=> {
        const { dispatch, id, parent, author, replyStatusInParent }= this.props,
                timestamp= Date.now() ;

        replyStatusInParent && replyStatusInParent(); // toggle reply status in parent so new reply can be made

        // interact with store
        firstpost?
            dispatch( createRemotePostAction(id, this.props.timestamp, title, body, parent, author ) ) : // fetch
            dispatch( updateRemotePostAction(id, timestamp, title, body) ) ;
    }




    // revert
    deletePost=_=> {
        const { dispatch, id }= this.props ;
        dispatch( deleteRemotePostAction(id) ) ;
    }


/**

*/

    generateNestedContainer=({ id, children:comments, ...props })=>
            <ConnectedContainer { ...{ key:id, id, comments, ...props } } /> ;


/**

*/


    // Ordering by Date
    orderbyDate=_=>
        this.setState( prev=> ({
                    hidden:false ,
                    comments: prev.comments.concat().sort(
                        (a,b) => b.timestamp-a.timestamp )
                    })) ;

    // Ordering by
    orderbyVote=_=>
        this.setState( prev=> ({
                    hidden:false ,
                    comments: prev.comments.concat().sort(
                        (a,b) => b.voteScore-a.voteScore )
                    })) ;

    //
    toggleComments=_=>
        this.setState( prev=>({ hidden:true }) ) ;

/**

*/


    render=_=> {

        const { comments, hidden  } = this.state ,
              {  title , body , voteScore,
                 user, author, id, editnumber, timestamp  }= this.props ;

        return (    <article className='container'>

                        { id &&
                        <Post
                            { ...{  title , body , voteScore,
                                    user, author, id, editnumber, timestamp  } }

                            isSubComment={ (editnumber==0 || !title) && 'sub' }

                            reply= { this.createPost }
                            cancel= { this.cancelPost }
                            update= { this.updatePost }
                            delete_= { this.deletePost } /> }

                        <section
                            className={`${hidden && 'hidden'} comments`} >

                            { id && !!comments.length &&
                            <Control
                                control= 'vote'
                                date= {this.orderbyDate}
                                vote= {this.orderbyVote}
                                hidden= { this.toggleComments} /> }

                            { comments && comments.map(
                                props=> this.generateNestedContainer(props)) }
                            {/* { children && children } */}
                        </section>

                    </article>
                       ) }
} ;

const ConnectedContainer = connect(
    (state) => {
        return { user: state.currentUser } } ,
        null, null, { withRef: true })
    (Container);

export default ConnectedContainer;

