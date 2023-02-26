const User = require('./user')
const Product = require('./product')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost/test-db').then(() => console.log('Connected to test-db'))

async function saveData() {
    // You can also use this method to create a user model and save to Database!
    // const user = new User({name: 'Kyle', age: 26})
    // await user.save().then(() => console.log('Saved'))
    try {
        // const user = await User.create({
        //     name: "Jamal",
        //     age: 45,
        //     email: 'sdfasdf@mail.com',
        //     hobbies: ["Weight Lifting", "Coding"],
        //     address: {
        //         street: 'Chaliyam',
        //         city: 'Feroke'
        //     },
        //     products: '63fb4118ac4c8276c5e2b4a5'

        // })

        const user = await User.find({ name: 'Jamal' }).populate('products')
    
        // const user = await User.find({age: 23})
        // const user = await User.find().byName('Kyle')
        // const user = await User.where('name').equals('Jamal').populate('products')
        // const user = await User.where('age').gt(12)
        // const user = await User.where('age').gt(12).where('name').equals('Kyle')
        // const user = await User.where('age').gt(12).lt(40).where('name').equals('Kyle')
        // const user = await User.where('age').gt(12).lt(40).where('name').equals('Kyle')
        // const user = await User.findOne({name: "Kyle"})
        // user[0].bestFriend = '63fb22856540df40e2c27139' 
        // await user[0].save()
        console.log(user[0])
        // console.log(user.namedEmail)
        // user[0].sayHi()

    } catch (error) {
        console.log(error.message)
    }
}

saveData()


