const express = require('express');
const cors = require('cors');




const authRouter = require('./auth/auth-router.js')
const userRouter = require('./users/users-router.js')
const plantsRouter = require('./plants/plants-router.js')

const server = express();



server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users',  userRouter)
server.use('/api/plants', plantsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})

module.exports = server