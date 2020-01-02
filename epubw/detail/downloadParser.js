const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e


async function parse(ctx,next) {
    let book = ctx.param.book;
    const $ = cheerio.load(ctx.res.body,{decodeEntities: false});

    let desc = $(".desc").text();
    let download = $(".list").find("a").attr("href");
    book.desc = desc;
    book.download = download;

    console.log(`========= 获取 ${book.name} 下载地址：${book.download} ==========`);
    next();
}

module.exports = parse;