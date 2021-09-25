const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');


const server =  express();


server.use(helmet())
server.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', userRouter)
server.use('/api/plants', plantsRouter)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})


module.exports = server