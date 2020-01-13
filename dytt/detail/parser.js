const cheerio = require('cheerio');//http://cnodejs.org/topic/5203a71844e76d216a727d2e

let count = 0;

async function parse(ctx,next) {
    count++;
    let movie = ctx.param.movie;
    const $ = cheerio.load(ctx.res.body,{decodeEntities: false});

    movie.name = $(".title_all").find("h1").text();

    let table = $('#Zoom').children()[0];
    movie.image = $(table).find('img').attr('src');

    let ftp = $(table).find("table").children()[0];
    movie.ftp= $(ftp).find("a").attr("href");
    let magnet = $(table).find("table").children()[1];
    movie.magnet= $(magnet).find("a").attr("href");
    movie.content = $(table).text();

    console.log(`爬取第 ${count} 个结果 名称 ${movie.name}`);

    next();
}

module.exports = parse