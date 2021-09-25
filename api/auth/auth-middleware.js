const jwt = require('jsonwebtoken');
const { JWT_SECRET} = require('../secrets/index')

const Auth = require("./auth-model");

const restricted = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        next({ status: 401, message: 'token required' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            next({ status: 401, message: 'token invalid' })
        } else {
        req.decodedToken = decoded
        next()
    }
    })
}


const checkUsernameAvailable = async (req, res, next) => {
    if( !req.body.username || !req.body.password || !req.body.phone_number) {
        next();
    } else {
        const { username } = req.body;
        const userExists = await Auth.findByUsername(username);
        if( userExists.length > 0) {
            res.status(401).json({ message: "username is already taken" });
        } else {
            next();
        }
    }
};

const checkUsernameExists = async (req, res, next) => {
    if (!req.body.username || !req.body.password || !req.body.phone_number) {
        next();
    } else {
        const { username } = req.body;
        const userExists = await Auth.findBy(username);
        if (!userExists) {
            res.status(401).json({ message: "invalid credentials" });
        } else {
            next();
        }
    }
};

const buildToken = (user) => {
    const payload = {
      subject: user.user_id,
      username: user.username,
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, JWT_SECRET, options)
  }
  


module.exports = {
    restricted,
    checkUsernameAvailable,
    checkUsernameExists,
    buildToken
};