
////////////////////////////////////////////////////////////////
/* INTENT */
////////////////////////////////////////////////////////////////

// semantic descriptions of actions

// LOG_IN

const USER_LOGIN = 'USER_LOGIN' ;

// const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP' ;
const CREATE_POST = 'CREATE_POST' ;
const CANCEL_POST = 'CANCEL_POST' ;
const UPDATE_POST = 'UPDATE_POST' ;

const DELETE_POST = 'DELETE_POST' ;
const VOTE_POST = 'VOTE_POST' ;

// USER_LOGIN
/* MINIMAL INTENT DESCRIPTION */
const userLoginAction = (user) => ({
    type: USER_LOGIN ,
    user
}) ;

// __INTERNAL_TIME_UPDATE
// const updateTimeStampAction = (timestamp) => ({
//     type: UPDATE_TIMESTAMP ,
//     timestamp
// }) ;

// CREATE_POST
/* MINIMAL INTENT DESCRIPTION */
const createPostAction = (id, parent, author, timestamp) => ({
    type: CREATE_POST
    , id, parent, author, timestamp
}) ;

const cancelPostAction = (id) => ({
    type: CANCEL_POST
    , id
}) ;

// CREATE_POST / EDIT_POST
/* MINIMAL INTENT DESCRIPTION */
const updatePostAction = (id, title, body, timestamp) => ({
    type: UPDATE_POST ,
    id, title, body, timestamp
})

// DELETE_POST
/* MINIMAL INTENT DESCRIPTION */
const deleteAction = (id) => ({
    type: DELETE_POST ,
    id
}) ;

// VOTE_POST
/* MINIMAL INTENT DESCRIPTION */
const voteAction = (id, voteScore) => ({
    type: VOTE_POST ,
    id, voteScore
})

export {
    USER_LOGIN, CREATE_POST, CANCEL_POST, UPDATE_POST, DELETE_POST, VOTE_POST,
    userLoginAction, createPostAction, cancelPostAction, updatePostAction, deleteAction, voteAction
}