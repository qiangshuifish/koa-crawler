let spider = require("../index");
let list = require("./list/parser");


let indexUrl = "https://epubw.com/";

spider(indexUrl,[list],{domain:"epubw"})