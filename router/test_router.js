const {Router} = require('express')
const User = require('../model/user')
const router = new Router()

router.get('/getAllUser',async (req,res)=>{
  var result = await User.find();
  console.log('有人 访问----', req);
  res.status(200).json(result)
})

module.exports = router