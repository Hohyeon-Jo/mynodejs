const express = require("express");
const EJSrouter = express.Router();

EJSrouter.get("/ejs01", (request, response) => {
    console.log("ejs01 라우터 실행")
    response.render("ex01EJS.ejs", {
        name : "value"
    })
})

module.exports = EJSrouter;