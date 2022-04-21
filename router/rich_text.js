const {
  Router
} = require('express')
const User = require('../model/user')
const Article = require('../model/article')
const router = new Router()
const multer = require('multer')
const path = require('path')
const qiNiuWrite = require('../utils/uploadImageQiniu')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads/')
  },
  filename: function (req, file, cb) {
    //获取后缀
    const extname = path.extname(file.originalname)
    cb(null, file.originalname)
  }
})
// const upload = multer({storage})
const upload = multer({})


router.post('/addRichText', async (req, res) => {
  res.status(200).json({
    code: 1,
    msg: '添加成功'
  })
})

router.post('/deleteArticle', async (req, res) => {
  var result = await Article.deleteOne({
    _id: req.body.id
  })
  if (result) {
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

router.post('/addArticle', async (req, res) => {
  const {
    articleId
  } = req.body
  if (articleId) {
    Article.updateOne({
      _id: articleId
    }, {
      articleTitle: req.body.articleTitle,
      articleIntroduction: req.body.articleIntroduction,
      articleCoverImage: req.body.articleCoverImage,
      articleContent: req.body.articleContent,
      articleTags: req.body.articleTags
    }, err => {
      if (err) {
        res.status(400).json({
          code: 1,
          msg: '修改文章失败'
        })
      } else {
        res.status(200).json({
          code: 1,
          msg: '修改文章成功'
        })
      }
    })
  } else {
    new Article({...req.body, uploadTime: Date.now()}).save()
    res.status(200).json({
      code: 1,
      msg: '添加文章成功'
    })
  }
})

router.get('/getAllArticle', async (req, res) => {
  const {
    count,
    start
  } = req.query
  var result = await Article.find({})
    .skip(parseInt(start))
    .limit(parseInt(count))
    .sort({'_id':-1});
  res.status(200).json(result)
})

router.get('/getArticlesByKeywords', async (req, res) => {
  const { keyWords, count, start } = req.query
  let regexp=new RegExp(keyWords,'i')
  var result = await Article.find({
    $or: [
      {articleTags: {$regex:regexp}},
    ]
  })
  .skip(parseInt(start))
  .limit(parseInt(count))
  .sort({'_id':-1});
  res.status(200).json(result)
})

// router.post('/addRichTextImage',async (req,res)=>{
//   console.log('添加富文本图片-------', Object.keys(req));
//   res.status(200).json({ location : "/test/image/1.jpg" })
// })


router.post('/addRichTextImage', upload.single('file'), (req, res) => {
  var file = req.file
  const {
    originalname,
    buffer
  } = file
  qiNiuWrite(originalname, buffer).then(result => {
      res.status(200).json({
        location: `http://${result}`
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: 'error'
      });
    })
})

module.exports = router