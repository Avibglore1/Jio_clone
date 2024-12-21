const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    poster_path : {type: String, required: true},
    name: {type: String, required: true},
    id :{type: String, required: true}
});

/*******************usermodel******* */
const schemaRules = {
    name:{
        type: String,
        required: [true, 'name is required']
    },
    email:{
        type: String,
        required: [true, 'email is required'],
        unique: [true, 'email should be unique']
    },
    password:{
        type: String,
        required: true,
        minLength: [6, 'password should be atleast 6 characters']
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 6,
        validate: [function(){
            return this.password == this.confirmPassword;
        },"password should be equal to confirm password"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    role: {
        type:String,
        enum:["user", "admin", "feed curator", "moderator"],
        default: 'user'
    },
    otp:{
        type: String
    },
    otpExpiry:{
        type: Date,
    },
    wishlist: [wishlistItemSchema],
}

const userSchema = new mongoose.Schema(schemaRules);

/******hooks in mongodb********/
userSchema.pre('save', function(next){
    console.log('Pre save was called');
    this.confirmPassword = undefined;
    next();
})
userSchema.post("save", function () {
    console.log("post save was called");
    this.__v = undefined;
})
// final touch point
const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;