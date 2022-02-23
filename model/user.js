const mongoose = require('mongoose')
module.exports = mongoose.model('user',{
    userPhone : String,
    userPwd : String,
})