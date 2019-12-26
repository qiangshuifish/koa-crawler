let spider = require("../index");
let list = require("./list/parser");


let indexUrl = "https://www.dytt8.net/html/gndy/dyzz/index.html";

spider(indexUrl,[list])