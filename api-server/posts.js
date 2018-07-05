const clone = require('clone')

let db = {}

const defaultData = {

    "8xf0y6ziy": {
        "id": "8xf0y6ziy",
        "parent": "8xf0y6ziy",
        "author": "George",
        "timestamp": 1467166872634,
        "title": "This is a recursive comment system!",
        "body": "Comments are retrieved from a 'flat' comment object and reassembled into this nested format.",
        "editnumber": 1,
        "deleted": false,
        "voteScore": 2
    },
    "8xf0y6ziz": {
      "id": "8xf0y6ziz",
      "parent": "8xf0y6ziz",
      "author": "Nick",
      "timestamp": 1510660592061,
      "title": "You can log in using 2 methods",
      "body": "Either log in at '/' via input field , or include user name in path directly.",
      "editnumber": 2,
      "deleted": false,
      "voteScore": 1
  },
    "8hkw9f2b": {
        "id": "8hkw9f2b",
        "parent": "8xf0y6ziy",
        "author": "Andreas",
        "timestamp": 1530660592061,
        "body": "Depending on who you log in as, you can either edit your own messages, or reply to others.",
        "editnumber": 2,
        "voteScore": 2,
        "deleted": false
    },
    "gnt7tvxn": {
        "id": "gnt7tvxn",
        "parent": "8xf0y6ziy",
        "author": "Laura",
        "timestamp": 1530660681278,
        "body": "Comments can be sorted by votescore and date.  They can also be hidden/minimsed",
        "editnumber": 3,
        "voteScore": 3,
        "deleted": false
    },
    "n79fvc6a": {
        "id": "n79fvc6a",
        "parent": "8xf0y6ziy",
        "author": "chris",
        "timestamp": 1530660739044,
        "body": "Comments can also be redacted",
        "editnumber": 1,
        "voteScore": 1,
        "deleted": false
    },
    "1dnkdxhi": {
        "id": "1dnkdxhi",
        "parent": "n79fvc6a",
        "author": "Anthea",
        "timestamp": 1530660767275,
        "body": "like this",
        "editnumber": 1,
        "voteScore": 1,
        "deleted": true
    },
    "8xf0y6zis": {
      "id": "8xf0y6zis",
      "parent": "8xf0y6ziz",
      "author": "Bob",
      "timestamp": 1510660592061,
      "body": "Comments track traits such as whether they have been edited or not.",
      "editnumber": 1,
      "deleted": false,
      "voteScore": 1
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    // let filtered_keys = keys.filter(key => !posts[key].deleted)
    // res(filtered_keys.map(key => posts[key]))
    res(posts)
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    console.log(post.timestamp) ;
    posts[post.id] = {
      id: post.id,
      parent: post.parent,
      author: post.author,

      timestamp: post.timestamp,
      title: post.title,
      body: post.body,

      editnumber: 1,
      voteScore: 1,
      deleted: false
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id];
    console.log(option)
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
