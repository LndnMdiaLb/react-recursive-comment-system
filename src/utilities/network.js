import { uuint } from './math'

export const api= "http://localhost:3001" ;

// Generate a unique token for storing your bookshelf data on the backend server.
let token= localStorage.token || (localStorage.token = uuint()) ;

export const headers= {
    'Accept': 'application/json',
    'Authorization': token
} ;