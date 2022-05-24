// imports
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const cors = require('cors')
const request = require('request-promise')
const path = require('path')
require('dotenv').config()

// schema
const schema = buildSchema(`
    scalar JSON
    type Query {
        searchGif(term: String!): JSON!
    }
`)

// resolvers
const root = {
    searchGif: async (term) => {
        return await request(`https://g.tenor.com/v1/search?q=${term}&limit=10&key=${process.env.API_KEY}`)
        .then(res => {
            const JSONRes = JSON.parse(res)
            return JSONRes.results.map(obj => obj.media[0].gif.url)
        }).catch(console.error)
    }
}

// app
const app = express()
app.use(cors())

// route
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = 4000
app.listen(port, () => {
    console.log('Running on port:'+port)
    console.log(`http://localhost:${port}/graphql`)
})