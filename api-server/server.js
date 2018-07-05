require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const categories = require('./categories')
const posts = require('./posts')
const comments = require('./comments')

const app = express()

app.use(express.static('public'))
app.use(cors())


app.get('/', (req, res) => {
  const help = `

        <pre>

            Welcome to the Udacity Readable API!
            Use an Authorization header to work with your own data:

            The following endpoints are available:



            <b>GET /categories</b>
                    USAGE:
                        Get all of the categories available for the app.
                        List is found in categories.js.
                        Feel free to extend this list as you desire.


            <b>GET /:category/posts</b>
                    USAGE:
                        Get all of the posts for a particular category

            <b>GET /posts</b>
                    USAGE:
                        Get all of the posts. Useful for the main page when no category is selected.

            <b>POST /posts</b>
                    USAGE:
                        Add a new post

                    PARAMS:
                        id - UUID should be fine, but any unique id will work
                        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
                        title - String
                        body - String
                        author - String
                        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.









            <b>GET /posts/:id</b>
                    USAGE:
                        Get the details of a single post

            <b>POST /posts/:id</b>
                    USAGE:
                        Used for voting on a post
                    PARAMS:
                        option - String: Either "upVote" or "downVote"

            <b>PUT /posts/:id</b>
                    USAGE:
                        Edit the details of an existing post
                    PARAMS:
                        title - String
                        body - String

            <b>DELETE /posts/:id</b>
                    USAGE:
                        Sets the deleted flag for a post to 'true'.
                        Sets the parentDeleted flag for all child comments to 'true'.









            <b>GET /posts/:id/comments</b>
                    USAGE:
                        Get all the comments for a single post

            <b>POST /comments</b>
                    USAGE:
                        Add a comment to a post

                    PARAMS:
                        id: Any unique ID. As with posts, UUID is probably the best here.
                        timestamp: timestamp. Get this however you want.
                        body: String
                        author: String
                        parentId: Should match a post id in the database.








            <b>GET /comments/:id</b>
                    USAGE:
                        Get the details for a single comment

            <b>POST /comments/:id</b>
                    USAGE:
                        Used for voting on a comment.
                    PARAMS:
                        option - String: Either "upVote" or "downVote"

            <b>PUT /comments/:id</b>
                    USAGE:
                        Edit the details of an existing comment

                    PARAMS:
                        timestamp: timestamp. Get this however you want.
                        body: String

            <b>DELETE /comments/:id</b>
                    USAGE:
                        Sets a comment's deleted flag to 'true'
        </pre>

  ` ;
  res.send(help) ;
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: `
        Please provide an Authorization
        header to identify yourself
        (can be whatever you want)`
    })
  }
})


app.get('/categories', (req, res) => {
    categories.getAll(req.token)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

/* added functionality */

app.post('/categories', bodyParser.json(), (req, res) => {
    categories.add(req.token, req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

/* added functionality */

app.get('/:category/posts', (req, res) => {
    posts.getByCategory(req.token, req.params.category)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

/*
    <b>GET /posts</b>
            USAGE:
                Get all of the posts.
                Useful for the main page when no category is selected.
*/

app.get('/posts', (req, res) => {
    posts.getAll(req.token)
      .then (
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

/*
    <b>POST /posts</b>
            USAGE:
                Add a new post

            PARAMS:
                id - UUID should be fine, but any unique id will work
                timestamp - timestamp in whatever format you like, you can use Date.now() if you like
                title - String
                body - String
                author - String
                category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

*/

app.post('/posts', bodyParser.json(), (req, res) => {
    posts.add(req.token, req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})



app.get('/posts/:id', (req, res) => {
    posts.get(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

/*
    <b>DELETE /posts/:id</b>
            USAGE:
                Sets the deleted flag for a post to 'true'.
                Sets the parentDeleted flag for all child comments to 'true'.
*/

app.delete('/posts/:id', (req, res) => {
    posts.disable(req.token, req.params.id)
      .then(post => comments.disableByParent(req.token, post))
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

/*
    <b>POST /posts/:id</b>
            USAGE:
                Used for voting on a post
            PARAMS:
                option - String: Either "upVote" or "downVote"
                        */

app.post('/posts/:id', bodyParser.json(), (req, res) => {
    const { option } = req.body
    const id = req.params.id
    posts.vote(req.token, id, option)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

/*
    <b>PUT /posts/:id</b>
            USAGE:
                Edit the details of an existing post
            PARAMS:
                title - String
                body - String

*/

app.put('/posts/:id', bodyParser.json(), (req, res) => {
    posts.edit(req.token, req.params.id, req.body)
      .then(
        (data) => res.send(data),
        (error) => {
            console.error(error)
            res.status(500).send({
                error: 'There was an error.'
            })
        }
      )
})





app.get('/posts/:id/comments', (req, res) => {
    comments.getByParent(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.get('/comments/:id', (req, res) => {
    comments.get(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.put('/comments/:id', bodyParser.json(), (req, res) => {
    comments.edit(req.token, req.params.id, req.body)
      .then(
        (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/comments', bodyParser.json(), (req, res) => {
    comments.add(req.token, req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.post('/comments/:id', bodyParser.json(), (req, res) => {
    const { option } = req.body
    comments.vote(req.token, req.params.id, option)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.delete('/comments/:id', (req, res) => {
    comments.disable(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
