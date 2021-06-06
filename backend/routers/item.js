import express from 'express'
import Item from '../models/item.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/item', auth, (req,res) => {
    try {
        const itemObject = req.body
        Item.create(itemObject, async (err, item) => {
            if(err) {
                console.log(err)
                res.status(501).send(err)
            } else {
                res.status(200).send(item)
            }
        })
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/getallsellitems', auth, async (req, res) => {
    try{
        const allSellItems = await Item.find({status: "sell"})
        res.status(200).send(allSellItems)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/getalluseritems', auth, async (req, res) => {
    try{
        const username = req.user.username
        const allUserItems = await Item.find({username: username})
        res.status(200).send(allUserItems)
    } catch(e) {
        res.status(400).send(e)
    }
})

export default router