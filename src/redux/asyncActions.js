import { headers, api } from '../utilities/network' ;

import {
    userLoginAction, setPostsAction, setCategoriesAction,
    createPostAction, updatePostAction, deleteAction
} from './actions' ;



/*
    { type: 'FETCH_POSTS' }
    { type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
    { type: 'FETCH_POSTS', status: 'success', response: { ... } }
*/


export const REQUEST_POSTS = 'REQUEST_POSTS' ;
export const SUCCESS_POSTS = 'SUCCESS_POSTS' ;
export const FAILURE_POSTS = 'FAILURE_POSTS' ;


export const requestPosts=_=> ({
    type: REQUEST_POSTS,
    status:'fetching'
  }) ;

export const successPosts=_=> ({
    type: SUCCESS_POSTS,
    status:'active'
}) ;

export const failurePosts=_=> ({
    type: FAILURE_POSTS,
    status:'error'
}) ;


/*

    thunk action creator:

*/


export const requestRemotePostsAction=_=>
    dispatch => {
        dispatch( requestPosts() ) ;
        return fetch(`${api}/posts` ,
                    {   method: 'GET' ,
                        headers })

                        .then(data=>data.json())
                        .then(  posts => {
                                    dispatch(successPosts()) ;
                                    return posts },
                                error => {
                                    dispatch(failurePosts()) ;
                                    return error } )

                        .then( posts=>dispatch( setPostsAction(posts) ) )
                        };


export const requestRemoteCategoriesAction=_=>
    dispatch => {
        dispatch( requestPosts() ) ;
        return fetch(`${api}/categories` ,
                    {   method: 'GET' ,
                        headers })

                        .then(data=>data.json())
                        .then(  categories => {
                                    dispatch(successPosts()) ;
                                    return categories },
                                error => {
                                    dispatch(failurePosts()) ;
                                    return error } )

                        .then( categories=>dispatch( setCategoriesAction(categories) ) )
                    };

/*

    thunk action creator:
    *    Thunk middleware knows how to handle functions.​
    *    passes dispatch as argument
    *    can return function, passed on as return value of dispatch method


    thunkActionCreator= ({minimal, intent, descrintion }) =>
        dispatch => {
            dispatch( actioncreator({minimal, intent, descrintion }))
            return Promise.resolve('done')
        }
*/
// id, parent, author, this.props.timestamp, title, body
export const createRemotePostAction= (id, timestamp, title, body, parent, author  ) =>
  dispatch => {
    dispatch( requestPosts() ) ;
    return fetch( `${api}/posts`,
        {   method: 'POST', // 'POST',  // 'GET',  // 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json' } ,
            body: JSON.stringify(
                { id, timestamp, title, body, parent, author } ) })

                .then(  data => {
                            dispatch(successPosts()) ;
                            return data },
                        error => {
                            dispatch(failurePosts()) ;
                            return error } )
                .then( _=>dispatch( updatePostAction(id, timestamp, title, body) ) )
                .then( _=>updateRemotePostAction( id, timestamp, title, body ) )
            }   ;


export const updateRemotePostAction= ( id, timestamp, title, body ) =>
    dispatch => {
        dispatch( requestPosts() ) ;
        return fetch( `${api}/posts/${id}`,
            {   method: 'PUT', // 'POST',  // 'GET',  // 'DELETE',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json' } ,
                body: JSON.stringify(
                    { timestamp, title, body } ) })

                    .then(  data => {
                                dispatch( successPosts() ) ;
                                return data } )
                    .catch( error => {
                                dispatch( failurePosts() ) ;
                                return error })
                    .then( res =>
                        dispatch( updatePostAction(id, timestamp, title, body) )
                    )   }   ;


export const voteRemotePostAction= ( id, value ) =>
    dispatch => {
        dispatch( requestPosts() ) ;
        return fetch( `${api}/posts/${id}`,
            {   method: 'POST', // 'POST',  // 'GET',  // 'DELETE',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json' } ,
                body: JSON.stringify({option:value}) })

                    .then( data=> {
                        dispatch( successPosts() ) ;
                        return data } )
                    .catch( error=> {
                        dispatch( failurePosts() ) ;
                        return error }) }   ;


export const deleteRemotePostAction= ( id ) =>
    dispatch => {
        dispatch( requestPosts() ) ;
        return fetch( `${api}/posts/${id}`,
            {   method: 'DELETE', // 'POST',  // 'GET',  // 'DELETE',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json' } })

                    .then(  data => {
                        dispatch( successPosts() ) ;
                        return data } )
                    .catch( error => {
                                dispatch( failurePosts() ) ;
                                return error })
                    .then( res =>
                        dispatch( deleteAction(id) )
                    )   }   ;

