const {Router} = require('express')
const Tag = require('../model/tag')
const router = new Router()

router.get('/getAllTags',async (req,res)=>{
  var result = await Tag.find();
  res.status(200).json(result)
})

router.post('/addTag',async (req,res)=>{
  const tagName = req.body.tagName
  if (tagName) {
    let exited = false
    const allTags = await Tag.find();
    allTags.forEach(item => {
      if(item.tagName === tagName) {
        exited = true
        res.status(201).json({msg: '已存在'})
      }
    })
    if (!exited) {
      new Tag({tagName}).save()
      res.status(200).json({msg: '添加成功'})
    }
  } else {
    res.status(400).json({msg: '添加失败'})
  }
})

router.post('/deleteTag', async (req, res) => {
  var result = await Tag.deleteOne({tagName:  req.body.tagName})
  if  (result) {
    res.status(200).json({
      code: 1,
      msg: '删除成功'
    })
  } else {
    res.status(201).json({
      code: 2,
      msg: '删除失败'
    })
  }
})

module.exports = router