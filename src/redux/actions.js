
////////////////////////////////////////////////////////////////
/* INTENT */
////////////////////////////////////////////////////////////////

// semantic descriptions of actions

// LOG_IN

const USER_LOGIN = 'USER_LOGIN' ;

const SET_POSTS = 'SET_POSTS' ;
const SET_CATEGORIES = 'SET_CATEGORIES' ;

// const UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP' ;
const CREATE_POST = 'CREATE_POST' ; // local state (redux)
const CANCEL_POST = 'CANCEL_POST' ; // local state (redux)

const UPDATE_POST = 'UPDATE_POST' ; // server update
const DELETE_POST = 'DELETE_POST' ; // server update
const VOTE_POST = 'VOTE_POST' ; // server update

// USER_LOGIN
/* MINIMAL INTENT DESCRIPTION */
const userLoginAction = (user) => ({
    type: USER_LOGIN ,
    user
}) ;



const setPostsAction = (posts) => ({
    type: SET_POSTS ,
    posts
}) ;

const setCategoriesAction = (categories) => ({
    type: SET_CATEGORIES ,
    categories
}) ;



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
const updatePostAction = (id, timestamp, title, body) => ({
    type: UPDATE_POST ,
    id, title, body, timestamp
})

// DELETE_POST
/* MINIMAL INTENT DESCRIPTION */
const deleteAction = (id) => ({
    type: DELETE_POST ,
    id
}) ;

// VOTE_POST  krbhoks9
/* MINIMAL INTENT DESCRIPTION */
const voteAction = (id, voteScore) => ({
    type: VOTE_POST ,
    id, voteScore
})

export {

    USER_LOGIN, SET_POSTS, SET_CATEGORIES,
    CREATE_POST, CANCEL_POST, UPDATE_POST, DELETE_POST, VOTE_POST,

    setPostsAction, setCategoriesAction, userLoginAction,
    createPostAction, cancelPostAction, updatePostAction, deleteAction, voteAction
}