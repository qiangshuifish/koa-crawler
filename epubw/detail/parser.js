const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e
const downloadParser = require("../detail/downloadParser")
const service = require("../detail/service")

let count = 0;

async function parse(ctx,next) {
    count++;
    const $ = cheerio.load(ctx.res.body,{decodeEntities: false});
    let book = ctx.param.book;

    let bookInfo= $(".bookinfo");
    bookInfo.find('li').each(function (index,bookLi) {
        switch (index){
            case 0:
                book.name = $(bookLi).text();
                break;
            case 1:
                book.author = $(bookLi).text();
                break;
            case 2:
                book.publishTime = $(bookLi).text();
                break;
            case 3:
                book.publisher = $(bookLi).text();
                break;
            case 4:
                book.evaluate = $(bookLi).text();
                break;
            case 5:
                book.isbn = $(bookLi).text();
                break;
        }
    });

    let url = $("[colspan='2']").find("a").attr("href");
    if(url){
        ctx.addToQueue(url,[downloadParser,service],{book})
        console.log(` =========== 添加下载详情页面 ${url} ===========`);
    }
    console.log(`爬取第 ${count} 个结果 名称 ${book.name}`);

    next();
}

module.exports = parse;