import {
    USER_LOGIN, CREATE_POST, CANCEL_POST, UPDATE_POST, DELETE_POST, VOTE_POST,
    // userLoginAction, linkPostAction, editPostAction, deleteAction, voteAction
} from './actions' ;

// userLoginAction
const userLogin = timestamp => { timestamp } ;

export const reducer = (state = {}, action) => {
    const {
            user,
            id, parent, author,
            title, body, timestamp, editnumber,
            voteScore
            } = action ;

    switch (action.type) {

        case USER_LOGIN :
            return Object.assign ( {} , state , { user } ) ;

        case CREATE_POST :
            return { ...state,
                    posts:{
                    ...state.posts,
                        [id]: {
                            id, parent,
                            author, timestamp, deleted:false, editnumber:0
                    }}}

        case CANCEL_POST :
            const newState= Object.assign ( {} , state) ;
            delete newState.posts[id] ;
            return newState ;

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

/*
export const reducer = (state = statetree, action) => {
    const {
            user,
            id, parent, author,
            title, body, timestamp, editnumber,
            voteScore
            } = action ;

    switch (action.type) {

        case CREATE_POST :
            return { ...state,
                    posts:{
                    ...state.posts,

                        [id]: {
                            id, parent,
                            author, timestamp, deleted:false, editnumber:0
                    }}}

        case UPDATE_POST :
            return { ...state ,
                    posts: {
                    ...state.posts ,

                    [id]: {
                        ...state.posts[id],
                        title, body, timestamp,
                        editnumber:state.posts[id].editnumber+1
                    } }}  ;

        default: return state ;
    }
}

const assembler = (state = statetree, action) => {
    const {
            id, parent,
            author,
            timestamp, editnumber,

            title, body,
            voteScore
            } = action ;

    switch (action.type) {

        case CREATE_POST :
            return {
                    [id]: {
                        id, parent, // create post
                        author, deleted:false, // create post

                        timestamp, editnumber:0 // create post / edit post overwrite ?
                    }}

        case UPDATE_POST :
            return {
                    [id]: {
                        ...state.posts[id], // create post

                        timestamp, editnumber:state.posts[id].editnumber+1 ,

                        title, body // edit post
                    } }  ;

        default: return state ;
    }
}

const assembler = (state = {}, action) => {
    const {id, parent, author} = action
        return {
            [id]: {
                id, parent, // create post
                author, deleted:false // create post
            }}}
*/