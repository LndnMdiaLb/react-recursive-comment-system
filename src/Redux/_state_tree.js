/* INTENT */
const CREATE_POST = 'CREATE_POST' ;
const EDIT_POST = 'EDIT_POST' ;
const ADD_POST = 'ADD_POST' ;
const DELETE_POST = 'DELETE_POST' ;

const creatPostAction = (uid, date) => ({
    type: CREATE_POST ,
    uid,
    date

})

createPostAction(
    Math.random().toString(36).substr(-8) , // generate unique id
    Date.now() // genrate date
)

const reducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_POST :
            return {
                ...post (
                    action.uid ,
                    action.date
                )};

        case EDIT_POST :
            return {
                editnumber: numbr++ ,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
            } ;

        case ADD_POST :
            return {
                children: [
                    ...existingIDs ,
                    ...arrayofIDs
                ]
            } ;

        case DELETE_POST :
            return {
                deleted: true,
            } ;
        default: return state ;
    }
}

const post = (uid, date) => (
    {
        [uid]: { id: uid },
        ...timeStampCreator(date) ,
        ...parentUidMerger(uid)
    }) ;

const timeStampCreator = timestamp => { timestamp } ;
const parentUidMerger = ({id}) => { parent:id } ;


const childrenIDMerger = (existingIDs, arrayofIDs) => [
        ...existingIDs ,
        ...arrayofIDs
    ];


/*

*/

const stateTree = {
    categories:[
         {
            name: 'react',
            path: 'react'
        },
        {
            name: 'redux',
            path: 'redux'
        },
        {
            name: 'udacity',
            path: 'udacity'
        }
    ] ,
    posts:
        {
            "6ni6ok3ym7mf1p33lnez": {
                id: '6ni6ok3ym7mf1p33lnez' ,
                timestamp: 1468479767190 ,
                parent: '6ni6ok3ym7mfxxxxxxx3lnez',
                children:[ '6ni6ok3ym7mfxxxxxxx3lnez', '6ni6ok3ym7mfxxxxxxx3lnez', '6ni6ok3ym7mfxxxxxxx3lnez'],

                deleted: false,
                editnumber: 2 ,

                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',

                voteScore: -5,

                category: 'redux', // necessary ?
            }
        },
    sorting:[]
}




