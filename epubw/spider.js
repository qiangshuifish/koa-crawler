let spider = require("../index");
let list = require("./list/parser");


let indexUrl = "https://epubw.com/list/1/";

spider(indexUrl,[list],{domain:"epubw"})