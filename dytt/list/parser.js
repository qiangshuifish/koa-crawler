const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e
const detailParser = require("../detail/parser")


const dateRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/;
const LIST_PAGE_PREFIX = "http://www.dytt8.net/html/gndy/dyzz/";
const DETAIL_PAGE_PREFIX = "http://www.dytt8.net";

let pageFlag = false;

async function parse (ctx,next) {
    const $ = cheerio.load(ctx.res.body,{decodeEntities: false});
    // 列表
    let movieTableList = $('.co_area2').children();
    console.log(`============ 爬取列表 ${movieTableList.length} 个结果 =============`);

    movieTableList.splice(0, 4)
    movieTableList.find('table').each(function (index, table) {
        let movie = {};
        movie.name = $(table).find('.ulink').html();
        movie.url = DETAIL_PAGE_PREFIX + $(table).find('.ulink').attr('href');

        movie.date = dateRegex.exec($(table).find('font').text())[0];
        movie.content = $(table).find('td').last().html();
        ctx.addToQueue(movie.url,[detailParser])
        console.log(`============ 添加详情页面 ${movie.url} 到队列 =============`);
    });

    // 页码
    if(!pageFlag){
        let options = $("[name='sldd']").find('option');
        options.each(function (index,option) {
            let uri = $(option).attr('value');
            let url = `${LIST_PAGE_PREFIX}${uri}`;

            ctx.addToQueue(url,[parse])
            console.log(`============ 添加列表页面 ${url} 到队列 =============`);
        });
        pageFlag = true;
    }
    next();
}

module.exports = parse;