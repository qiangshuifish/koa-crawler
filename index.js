const Crawler = require('crawler');
const compose = require('koa-compose');

/**
 * 初始化一个爬虫对象
 * @type {Crawler}
 */
const crawler = new Crawler({
    jQuery: false,
    rotateUA:true,
    userAgent:['Mozilla/5.0 (Windows NT 10.0; WOW64)','AppleWebKit/537.36 (KHTML, like Gecko)','Chrome/55.0.2883.87 Safari/537.36'],
    maxConnections: 5,
    callback: async function (error, res, done) {
        if (error) {
            console.trace(error);
        } else {
            let middleWares = res.options.middleWares;
            compose(middleWares)({res,addToQueue,middleWares});
        }
        done();
    }
});


function addToQueue(url,middleWares) {
    crawler.queue({uri:url,middleWares});
}

module.exports = addToQueue;