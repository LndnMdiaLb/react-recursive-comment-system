
const api = "http://localhost:3001/";

const headers = {
  'Accept': 'application/json',
  'Authorization': Math.random().toString(36).substr(-8)
}

/*
  get('categories')
*/

export const get = (path) =>
  fetch(`${api}${path}`, { headers })
    .then(res => res.json())
    .then(data => data.children) ;


export const update = (path, object) =>
  fetch(`${api}${path}` , {
          method: 'PUT', //'POST'
          headers: {
            ...headers,
            'Content-Type': 'application/json'
            } ,
          body: JSON.stringify({ object }) })
    .then(res => res.json())
    .then(data => data.children)