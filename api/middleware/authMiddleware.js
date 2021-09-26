const Users = require('../users/users-model')

//on failed registration/login if username or password is missing

const checkPayload = (req, res, next)=>{
    try{
        const { username, password } = req.body
        if(!username || !password){
            res.status(404).json({message: 'username and password required'})
        }else{
            req.username = username
            req.password = password
            next()
        }
    }catch(err){
        next(err)
    }
}

//checks for usernames that exist and fails reqistration if true
const checkUsername = async (req, res, next) =>{
    try{
    const userExisits = await Users.findUser(req.body.username)
    if(!userExisits.length){
        next()
    }else{
        res.status(401).json({ message: 'username taken'})
    }
    }catch(err){
        next(err)
    }
    
}

const checkLogin = async (req, res, next) =>{
    try{
        const user = await Users.findUser(req.body.username)
        const password = await Users.pwValidation(req.body.password)
        if (!user || !password){
            res.status(400).json({message: 'invalid credentials' }) 
        } else{
            next()
        }
    }catch(err){
        next(err)
    }
}


module.exports ={
    checkLogin,
    checkPayload,
    checkUsername
}