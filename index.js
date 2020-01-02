const Crawler = require('crawler');

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
            let param = res.options.param;
            compose(middleWares)({res,addToQueue,middleWares,param});
        }
        done();
    }
});


function addToQueue(url,middleWares,param = {}) {
    crawler.queue({uri:url,middleWares,param});
}

module.exports = addToQueue;


/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called middleware #
        let index = -1;
        return dispatch(0);
        function dispatch (i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }
}