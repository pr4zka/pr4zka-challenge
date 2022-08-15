const {check} = require('express-validator')
const validatorResult = require('./validatorResullt')
const users = require('../models/users')

const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _passwordRequired = check('password', 'Password required').not().isEmpty();

const emailExist = check('email').custom(
    async (value, {req}) => {
        if(!value) return Promise.reject('Email is required')
        const user = await users.findOne({where: {email: value}})
        if(!user) return Promise.reject('Email not found')
        return true
    }
)

const _emailDuplicate = check('email').custom(
    async (value) => {
        const user = await users.findOne({where: {email: value}});
        if(user){
            return Promise.reject('Email already exists');
        }
    }
)

const postLogin = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    emailExist,
    validatorResult
]
const postRegister = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    _emailDuplicate,
    validatorResult
]


module.exports = {
    postLogin,
    postRegister
}