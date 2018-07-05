const clone = require('clone')
const config = require('./config')

let db = {}

const defaultData = {
    '455fSHg42': {
        id: '455fSHg42',
        tags: ['react'],
        parent: '455fSHg42',
        title: ''
    },
    '41Xfjsr95': {
        id: '41Xfjsr95',
        tags: ['redux'],
        parent: '41Xfjsr95',
        title: ''
    },
    'G7XffSHgR': {
        id: 'G7XffSHgR',
        tags: ['udacity'],
        parent: 'G7XffSHgR',
        title: ''
    }
}

function getData (token) {
  //Each token has it's own copy of the DB. The token in this case is like an app id.
  let data = db[token]
  //This populates the default user data if there isn't any in the db.
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getAll (token) {
  return new Promise((res) => {
    res(getData(token))
  })
}

/* added functionality */

function add (token, category) {
  return new Promise(res=> {
    let categories = getData(token)
    categories[category.id] = {
      id: category.id,
      parent: category.parent,
      title: category.title,
      tags: category.tags
    }
    res(categories[category.id]) ;
  })
}

module.exports = {
  add ,
  getAll
}
