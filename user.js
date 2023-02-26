const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const UserSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        // Minimum and Maximum value that a age can go 
        min: 1,
        max: 65,
        validate: {
            validator: v => v % 2 !== 0,
            message: props => `${props.value} is not an even number` // You can create a custom validations too
        }
    },
    email: {
        type: String,
        lowercase: true,
        minLength: 10, // Minimum length of email
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true, // Once the value is added it will not change even if you try to change.
        default: new Date()
    },
    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'User' // You can mentions other collection as reference
    },
    hobbies: [String],
    address: addressSchema // there will be a new ObjectId("id number here") will generate in nested address
    // address: {
    //     street: String,
    //     city: String
    // } // You can do this way too but no ObjectId will generate
})

// You can create a schema method and add your own customised funcitons
UserSchema.methods.sayHi = function(){
    console.log(`Hi, my name is ${this.name}`)
}

UserSchema.statics.findByName = function(name) {
    return this.find({name: new RegExp(name, 'i')})
}

UserSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name, 'i')})
}

UserSchema.virtual('namedEmail').get(function(){
    return `${this.name} <${this.email}>`
})

UserSchema.pre('save', function(next){
    console.log('heloo pre save middleware')
    this.createdAt = Date.now()
    next()
})

UserSchema.post('save', function(doc, next){
    doc.sayHi()
    next()
})

module.exports = mongoose.model("User", UserSchema)