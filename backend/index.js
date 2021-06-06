import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

//app config
const app = express()

//middlewares
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//models
import User from './models/user.js'
import Item from './models/item.js'

//routers
import userRouters from './routers/user.js'
import itemRouters from './routers/item.js'
app.use(userRouters)
app.use(itemRouters)




//listener
const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log('Your server is running on '+ `${port}`)
})