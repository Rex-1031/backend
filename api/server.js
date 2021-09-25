const express = require('express');
const cors = require('cors');
const helmet = require('helmet');



const authRouter = require('./auth/auth-router.js')
const userRouter = require('./users/users-router.js')
const plantsRouter = require('./plants/plants-router.js')

const server = express();


server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth',cors(), authRouter)
server.use('/api/users', cors(), userRouter)
server.use('/api/plants', cors(), plantsRouter)



module.exports = server