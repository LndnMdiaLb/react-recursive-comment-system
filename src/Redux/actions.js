/* INTENT */
const CREATE_POST = 'CREATE_POST' ;
const EDIT_POST = 'EDIT_POST' ;
const ADD_POST = 'ADD_POST' ;
const DELETE_POST = 'DELETE_POST' ;

/* MINIMAL INTENT DESCRIPTION */
const createPostAction = (id, uid, date) => ({
    type: CREATE_POST ,
    parent:id,
    uid,
    date
}) ;

/* MINIMAL INTENT DESCRIPTION */
const deleteAction = (id) => ({
    type: DELETE_POST ,
    id
}) ;

/* MINIMAL INTENT DESCRIPTION */
const editPostAction = (uid, date) => ({
    type: CREATE_POST ,
    uid,
    date

})

/* MINIMAL INTENT DESCRIPTION */
const addAction = (id, uid, date) => ({
    type: ADD_POST ,
    parent:id,
    uid,
    date
})