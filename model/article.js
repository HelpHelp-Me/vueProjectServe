const mongoose = require('mongoose')
module.exports = mongoose.model('article',{
    articleTitle : String,
    articleIntroduction : String,
    articleCoverImage: String,
    articleContent: String,
    articleTags: String,
    uploadTime: String,
})