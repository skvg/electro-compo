import express from "express";
import User from "../models/user.js"
import auth from '../middlewares/auth.js'
const router = express.Router();

// login
router.post("/login",async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// signup
router.post("/signup", (req,res)=>{
    try {
        var newUser = req.body
        User.create(newUser,async (err,user)=>{
            if(err){
                res.status(501).send(err)
            } else {
                const token = await user.generateAuthToken()
                res.status(200).send({user, token})
            }
        })
    } catch(e){
        res.status(400).send(e)
    }
});

// logout
router.get('/logout',auth, (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        User.updateOne({_id: req.user._id}, {tokens: req.user.tokens}, (err, data) => {
            if(err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })
    }
    catch (e) {
        res.status(500).send()
    }
})

// user data
router.get('/user',auth, (req,res) => {
    try {
        res.status(200).send(req.user)
    }
    catch (e){
        res.status(500).send(e)
    }
})


export default router