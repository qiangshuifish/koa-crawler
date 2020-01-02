const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e
const detailParser = require("../detail/parser")

async function parse (ctx,next) {
    const $ = cheerio.load(ctx.res.body,{decodeEntities: false});
    // 列表
    let contentList = $('.content').children();
    console.log(`============ 爬取列表 ${contentList.length} 个结果 =============`);

    contentList.find('article').each(function (index, article) {
        let book = {};
        book.name = $(article).find('.caption').html();
        book.url =  $(article).find('a').attr('href');

        ctx.addToQueue(book.url,[detailParser],{book})
        console.log(`============ 添加详情页面 ${book.url} 到队列 =============`);
    });

    // 页码
    let pagination = $(".next-page");
    if($(pagination).text()){
        let url = $(pagination).find("a").attr('href');
        ctx.addToQueue(url,[parse])
        console.log(`============ 添加列表页面 ${url} 到队列 =============`);
    }
    next();
}

module.exports = parse;