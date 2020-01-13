let mongo = require("../../common/mongo");
mongo.initClient();

const collect_name = "dytt8";

let conut = 0;

module.exports = async function (ctx,next) {
    let movie = ctx.param.movie;

    let result = await mongo.find(collect_name,{url:movie.url});
    if(result.length === 0){
        await mongo.insert(collect_name,movie);
        conut++;
        console.log(`=========== 添加第 ${conut} 记录 ${movie.name} ==========`);
    }else{
        console.log(`=========== 检测 ${movie.url} 已经爬取 ==========`);
    }
    next();
};