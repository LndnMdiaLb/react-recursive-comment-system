import React from 'react';
import { connect } from 'react-redux';

import { Control } from './Control' ;
import { Button } from './post/Button' ;
import { Bubbles } from './Bubbles' ;

import { Link } from 'react-router-dom' ;

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

    state= {} ;
    constructor(props){ super(props) ;
        // !props.editnumber &&
        /*
            children components are rendered from state instead of props because user needs to be able to modify the list
            either via concat() or sort()
        */
        this.state= {
            replying:false ,
            hidden: !props.editnumber , // editnumber == 0 is user created
            comments: React.Children.map(
                this.props.children ,
                child=> {
                    const { id, voteScore, timestamp }= child.props ;// extract properties used by sorting mechanisms
                    return { id, voteScore , timestamp , child } }
                ) || []
            } ;
        console.log(this.props.root)
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

            const props= {
                        parent, id, author,
                        timestamp, editnumber:0,

                        /*
                            introduced in Threads to track first post and show title
                            it takes care of the creation of new posts by user
                        */
                        isFirstPost:this.props.root,
                        /*  pass cancelPost to child Container
                            so child Post can affect parent Container   */
                        cancelInParent:this.cancelPost,
                        replyStatusInParent:this.toggleReplyStatus } ;

            const newComment= {
                        id, voteScore:1 , timestamp ,
                        child: this.generateComment(props) } ;

            return {
                    current: id , // used as identifier of comment to remove if cancelled
                    replying:true ,
                    comments: [ newComment ].concat( prev.comments ) // concat to front
                }}) ;
    }


    /*
        never used
    */


    toggleReplyStatus=_=> this.setState( prev=> ({ replying:!prev.replying }) ) ;



    // revert
    cancelPost=callback=> {
        const { id, dispatch, cancelInParent }= this.props;

        // interact with store via parent container callback
        cancelInParent && cancelInParent(_=>dispatch(cancelPostAction(id)))

        this.setState((prevState, props)=> ({
                current: undefined ,
                replying: false ,
                comments: prevState.comments.filter( container=> container.id != prevState.current)
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

    generateComment=props=> <ConnectedContainer { ...{ key:props.id, ...props } } /> ;

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
    hideComments=_=> this.setState( prev=>({ hidden:true }) ) ;

    /**

    */


    render=_=> {

        const   {  comments, hidden  } = this.state ,
                {  replyStatusInParent ,
                    title , body , voteScore ,
                    isFirstPost , root ,
                    user, author, id, editnumber, timestamp  }= this.props ;

        return (    <article className='container'>

                        { !root &&
                        <Post
                            { ...{  title, body, voteScore,
                                    isFirstPost,
                                    user, author, id, editnumber, timestamp  } }

                            isSubComment={ ( editnumber==0 || !title ) && 'sub' }

                            toggleStatus= { replyStatusInParent }

                            reply= { this.createPost }
                            cancel= { this.cancelPost }
                            update= { this.updatePost }
                            delete_= { this.deletePost } /> }

                        { root &&
                        <div className='top-nav'>
                            <Bubbles />
                            <div className='welcome'>
                                <h1>welcome <i>{user}</i></h1>
                                <Link to='/'>
                                    <button>switch user</button>
                                </Link>
                            </div>

                            <Button onClick={ this.createPost }> new post </Button>
                        </div> }

                        <section
                            className={`${hidden && 'hidden'} comments`} >

                            { id && !!comments.length &&
                            <Control
                                control={ hidden?'hidden':'vote' }
                                date= {this.orderbyDate}
                                vote= {this.orderbyVote}
                                hidden= { this.hideComments} /> }

                            { comments && comments.map(props=> props.child) }
                        </section>

                    </article>
                       ) }
} ;

const ConnectedContainer = connect(
    state=>({ user: state.user } ) ,
    null, null, { withRef: true } )
    (Container);

export default ConnectedContainer;

