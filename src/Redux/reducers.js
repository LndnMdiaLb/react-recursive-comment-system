import {} from './actions';

const reducer = (state = {}, action) => {

    switch (action.type) {

        case EDIT_POST :
                // assumes post already exists .  Merges differently than CREATE_POST
            return {
                editnumber: numbr++ ,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
            } ;

        case ADD_POST :
            // assumes post already exists .
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

const compositeReducer = (state = {}, action) => {
    // const { posts } = state ;
    const { parentId, uid, date } = action ;
    switch (action.type) {
        case ADD_POST :
            return {
                posts: {
                    ...state.posts,
                    // creates the uids, links, adds timestamp
                    [uid]: {
                        id: uid,
                        parent:parentId , timestamp:date ,
                        editnumber : 0 ,
                        children: []
                    }
                }
            } ;

        case EDIT_POST :
        case CREATE_POST :
        case DELETE_POST :
            return {
                posts:{
                    ...state.posts ,
                    [uid]: {
                        deleted: true
                    }

                }
            }
        ;

        case CLEAN_POSTS :
            return {
                posts:{
                    // Object.keys(state.posts).map(id => !state.posts.id.deleted )
                    ...state.posts ,
                    deleted: true
                }
            }
        ;
    }
}

const timeStampCreator = timestamp => { timestamp } ;
const parentUidMerger = ({id}) => { parent:id } ;


const childrenIDMerger = (existingIDs, arrayofIDs) => [
        ...existingIDs ,
        ...arrayofIDs
    ];


/*
 stateTree design
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
