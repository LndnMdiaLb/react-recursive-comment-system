import {
    USER_LOGIN,
    SET_POSTS, SET_CATEGORIES,
    CREATE_POST, CANCEL_POST, UPDATE_POST, DELETE_POST, VOTE_POST,
    // userLoginAction, linkPostAction, editPostAction, deleteAction, voteAction
} from './actions' ;

import { statetree } from './statetree' ;

// userLoginAction
const userLogin = timestamp => { timestamp } ;

export const reducer = (state = statetree, action) => {
    const {
            user,
            posts, categories,
            id, parent, author,
            title, body, timestamp, editnumber,
            voteScore
            } = action ;

    switch (action.type) {

        case USER_LOGIN :
            return { ...state ,
                    user }

/*
*/

        case SET_POSTS :
            return { ...state ,
                    posts:{
                     ...posts
                    } }

        case SET_CATEGORIES :
            return { ...state ,
                    categories:{
                        ...categories
                    } }

/*
*/

        case CREATE_POST :
            return { ...state ,
                    posts:{
                    ...state.posts ,
                        [id]: {
                            id, parent ,
                            author, timestamp, deleted:false, editnumber:0
                    }}}

        case CANCEL_POST :
            const newState= Object.assign ( {} , state) ;
            delete newState.posts[id] ;
            return newState ;
/*
                categories:{
                    ...state.categories
                } ,
*/
        case UPDATE_POST :
            return { ...state ,
                posts: {
                ...state.posts ,
                [id]: {
                    ...state.posts[id],
                    title, body, timestamp,
                    editnumber:state.posts[id].editnumber+1
                } }}  ;

        case DELETE_POST :
            return { ...state ,
                posts: {
                ...state.posts ,
                [id]: {
                    ...state.posts[id],
                    deleted:!state.posts[id].deleted
                } }}  ;

        case VOTE_POST :
            return { ...state ,
                     posts: {
                     ...state.posts ,
                        [id]: {
                            ...state.posts[id],
                            voteScore
                        } }}  ;

        default: return state ;
    }
}