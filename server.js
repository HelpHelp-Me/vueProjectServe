const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
// const User = require('./model/User');
// const Course = require('./model/Course')
const {
    mock
} = require('mockjs')


mongoose.connect(`mongodb://${config.db_host}:${config.db_port}/${config.db_name}`, (error) => {
    if (error) {
        console.log('数据库连接失败.....');
        console.log(error);
    } else {
        console.log('数据库连接成功.....');
        //  var users = mock({
        //     'list|30':[
        //         {
        //             'userPhone|10000-99999' : 0,
        //             'userPwd|10000-99999' : 0,
        //         } 
        //     ]
        // }).list;
        // console.log(users);
        // var arr = users.map(item=>{
        //     return new User(item).save();
        // })
        const server = http.createServer(app);
        server.on('error', (error) => {
            console.log('服务器启动失败...');
            console.log(error);
        });

        server.listen(config.port, config.host, () => {
            console.log('服务器启动......');
        })
    }
})