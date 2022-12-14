
const express = require("express");
const Sessionrouter = express.Router();

Sessionrouter.get("/sessionCreate", (request, response) => {
        
    //session생성
    request.session.user = {
        "id" : "smart",
        "pw" : "123",
        "nick" : "smart"
    };

    response.end();

})
Sessionrouter.get("/sessionSelect", (request, response) => {
        
    //session검색
    console.log("session에 있는 user값 : "+ request.session.user);

    response.end();

})
Sessionrouter.get("/sessionDelete", (request, response) => {
        
    //session삭제
    delete request.session.user;

    response.end();

})

module.exports = Sessionrouter;