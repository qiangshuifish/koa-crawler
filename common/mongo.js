const MongoClient = require('mongodb').MongoClient;//http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect

/**
 * mongodb 配置
 * @type {{url: string}}
 */
const mongodb = {
    url : "mongodb://localhost:27017",
    db : "crawlab_test"
};

let client;
let db;

const initClient = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(mongodb.url, function (err, db) {
            if (err) {
                console.log("mongodb连接失败")
                reject(err) ;
            }
            client = db.db(mongodb.db);
            module.db = db;
            console.log("mongodb连接成功");
            resolve(client);
        });
    });
}



const insert = function (collectionName,obj) {
    if(obj instanceof Array){
        return new Promise(function (resolve,reject) {
            client.collection(collectionName).insertMany(obj, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }else{
        return new Promise(function (resolve,reject) {
            client.collection(collectionName).insertOne(obj, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });
    }
};

const find  = function (collectionName,filter) {
    return new Promise(function (resolve,reject) {
        client.collection(collectionName).find(filter).toArray(function (err, result) {
            if(err){
                reject(err);
            }
            return resolve(result);
        })
    });

};

const findCont = function (collectionName,filter) {
    return new Promise(function (resolve, reject) {
        client.collection(collectionName).find(filter).count(function (err, count) {
            if(err) reject(err);
            resolve(count);
        })
    })
};

module.exports = {insert,find,findCont,initClient}