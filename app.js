const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyparser = require('body-parser')
const config = require('./config');
// const User = require('./model/user')

const app = express();
// 准备session存放的仓库
// var store = new MongoDBStore({
//     uri: `mongodb://${config.db_host}:${config.db_port}/${config.db_name}`,
//     collection: 'sessions'
//   });
  // Catch errors
  // store.on('error', function(error) {
  //   console.log(error);
  // });
  // app.use(require('express-session')({
  //   secret: 'This is a secret',
  //   name: 'SESSIONID',
  //   cookie: {
  //     maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  //   },
  //   store: store,
  //   resave: true,
  //   saveUninitialized: true
  // }));
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
  app.use(bodyparser.urlencoded({ extended: false }))
  app.use(bodyparser.json())
  // app.use((req) => {
  //   console.log('req ======', req);
  // })

  app.use('/assets', express.static(__dirname+'/assets') );

  app.use('/user', require('./router/test_router'));

  app.use('/richText', require('./router/rich_text'))

  app.use('/tags', require('./router/tags'))

  // app.use('/user/getAllUser',(req) => {
  //   console.log('req --------', req);
  // });
  // app.get('/user/getAllUser',async (req,res)=>{
  //   var result = await User.find();
  //   console.log('有人 访问----', result);
  //   res.status(200).json(result)
  // })

  //上传七牛云
  const uploadQiniu = require('./utils/uploadImageQiniu');
  app.use('/uploadQiniu', uploadQiniu);
  
  module.exports = app;