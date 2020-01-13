let mongo = require("../../common/mongo");
mongo.initClient();

const collect_name = "epubw_books";

let conut = 0;

module.exports = async function (ctx,next) {
    let book = ctx.param.book;

    let result = await mongo.find(collect_name,{url:book.url});


    await mongo.insert(collect_name,book);
    conut++;
    
    next();
};