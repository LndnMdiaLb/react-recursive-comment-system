import { uuint } from './math'

export const api= "http://localhost:3001" ;

// Generate a unique token for storing your bookshelf data on the backend server.
let token= localStorage.token || (localStorage.token = uuint()) ;

export const headers= {
    'Accept': 'application/json',
    'Authorization': token
} ;

export const getRemotePosts=_=>
    fetch(`${api}/posts`,
            {   method: 'GET' ,
                headers })
            .then(data=>data.json())
            .then(  data => ({ data }),
                    error => ({ error })) ;


export const getRemoteCategories=_=>
    fetch(`${api}/categories`,
            {   method: 'GET' ,
                headers })
            .then(data=>data.json())
            .then(  data => ({ data }),
                    error => ({ error })) ;