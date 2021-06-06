import mongoose from 'mongoose'

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tag: {
        type: String
    },
    status: {
        type: String,
        required: true,
    },
    repairCost: {
        type: String,
    },
    sellingPrice: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    }
})

const Item  = mongoose.model('Item', itemSchema)
export default Item