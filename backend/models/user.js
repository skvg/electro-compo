import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    items: [{
        item: {
            type: String,
            required: true,
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SIGNATURE, {expiresIn: '2 days'})
    user.tokens = await user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async function(username, password){
    const user = await User.findOne({username: username})
    if(!user){
        throw new Error('unable to login')
    }
    if(user.password !== password){
        throw new Error('unable to login')
    }
    return user
}

const User = mongoose.model('User', userSchema)
export default User