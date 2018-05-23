const   api = "http://localhost:3001" ,
        place = 'categories' ;
        // place = 'posts' ;
        // place = 'react/posts' ;

const headers = {
        'Accept': 'application/json',
        'Authorization': Math.random().toString(36).substr(-8)
    }

const getCategories = _ =>
    fetch(`${api}/${place}`,
        { headers })
        .then(res=>res.json()) ;

export {
        getCategories
    }