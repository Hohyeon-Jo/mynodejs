const express = require('express'); //설치된 express 사용 선언
const app = express();// express실행 app변수에 대입
const router = require('./router/router.js');// router 폴더 안에 router.js 호출
const bodyparser = require('body-parser'); // express 안에 body-parser실행 후 bodyparser 변수안에 대입
const DBrouter = require("./router/DBrouter.js")
const EJSrouter = require('./router/EJSrouter.js')
const Sessionrouter = require("./router/Sessionrouter.js")
const Messagerouter = require("./router/Massagerouter.js")

let ejs = require('ejs');
//세션 기능
const session =require('express-session')
// 세션이 저장되는 영역(mysql)
const mysql_session = require('express-mysql-session')
app.set('view engine','ejs');
let conn = {
    host : "127.0.0.1",
    user : 'root',
    password : "1234",
    port : "3306",
    database : "nodejs_db"
}
let conn_session = new mysql_session(conn);
app.use(session({
    secret : "smart",
    resave : false, //세션 저장
    saveUninitialized : true, // 세션 초기화
    store : conn_session
})); // 미들웨어로 session 기능(저장위치 :mysql)등록
app.use(express.static("./public"));
app.use(bodyparser.urlencoded({extended:false})); //post 방식일때 body영역을 분석해 주는 미들웨어
app.use(EJSrouter);
app.use(DBrouter);
app.use(router); //미들웨어로 router 등록
app.use(Sessionrouter);
app.use(Messagerouter);

app.listen(3001); //현재 서버파일의 port 번호 등록