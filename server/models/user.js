import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique:true ,required: true},
    password: {type:String, required:true},
    cartItems:{type:Object, default:{}}
},{minimize:false})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;

/*const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    cartItems: {type: String,default:{}},
},{minimize:false})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User;*/