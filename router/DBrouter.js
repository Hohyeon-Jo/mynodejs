const conn = require('../config/DBConfig.js');
const express = require('express');
const { response } = require('express');
const { request } = require('http');
const DBrouter = express.Router();



DBrouter.post("/Login", (request, response)=>{
let id = request.body.id;
let pw = request.body.pw;
const sql = 'select * from member where id = ? and pw = ?'; //심플한 방법 1번째.
conn.query(sql,[id,pw],(err, row) => {
    if (err) {
        console.log('검색실패 \n', err);
    } else if (row.length > 0) { 
        request.session.user = id;

        console.log("session 영역 id 저장 성공" + request.session.user);

        response.render("LoginS",{
                row_name : row
        })
    } else if (row.length == 0) {
        response.redirect("http://127.0.0.1:5500/public/ex05Loginf.html")
    }
});
// 성공 -> Logins.html
// 실패 -> loginf.html
// if(id === 'smart' && pw == '123'){
// response.redirect("http://127.0.0.1:5500/public/ex05Logins.html",)
// }else{
//     response.redirect("http://127.0.0.1:5500/public/ex05Loginf.html")
// };
});
DBrouter.post("/JoinDB", (request, response)=>{
let id = request.body.id;
let pw = request.body.pw;
let nick = request.body.nick;
let sql = "insert into member values(?,?,?)";
conn.query(sql, [id,pw,nick],(err,row)=>{
    if (!err) {
        console.log("입력성공:"+row);
        response.redirect("http://127.0.0.1:3001/Main")
    } else {
        console.log("입력실패"+ err);
    }
});
});
//회원삭제 라우터 만들기
// 1.get방식의 /Delete 라우터 생성
// 2. 사용자가 입력한 id값 가져오기
// 3. id값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제 성공 후 Main.html로 돌아가기.
DBrouter.get("/Delete",(request,response)=>{
let id = request.query.id;
let sql = "delete from member where id = ? ";
conn.query(sql, [id],(err,row)=>{
    if (err) {
        console.log("삭제실패"+ err);
    }else if(row.affectedRows > 0){
        console.log("명령에 성공한 수 :"+ row.affectedRows);
        response.redirect("http://127.0.0.1:3001/Main")
    }
    else if (row.affectedRows == 0 ){
        console.log("삭제된 값이 없습니다.")
    }
});
})
DBrouter.post("/Update",(request,response)=>{
let id = request.body.id;
let select = request.body.select;
let data = request.body.data
//사용자가 입력한 아이디의 패스워드를 변경하고 성공후 main.html로 이동
let sql = `update member set ${select} = ? where id = ?`;
conn.query(sql, [data,id],(err,row)=>{
    if (err) {
        console.log("수정실패"+ err);
    }else if(row.affectedRows > 0){
        console.log("명령에 성공한 수 :"+ row.affectedRows);
        response.redirect("http://127.0.0.1:3001/Main")
    }
    else if (row.affectedRows == 0 ){
        console.log("수정한 값이 없습니다.")
    }
});
})
DBrouter.get('/SelectAll', (request, response) => {
const sql = 'select * from member';
conn.query(sql, (err, row) => {
    if (err) {
        console.log('검색실패 \n', err);
    } else if (row.length > 0) {
        console.log('검색된 데이터의 수', row.length);
        response.render("SelectAll", {
            row_names : row
        })
    } else if (row.length == 0) {
        console.log('검색된 데이터가 없습니다.');
    }
});
});
DBrouter.get('/SelectOne', (request, response) => {
const sql = 'select * from member where id = ?';
let id = request.query.id;
conn.query(sql,id,(err, row) => {
    if (err) {
        console.log('검색실패 \n', err);
    } else if (row.length > 0) {
        console.log('검색된 데이터의 수', row.length);
        response.render("SelectOne", {
            row_name : row
        })
    } else if (row.length == 0) {
        console.log('검색된 데이터가 없습니다.');
    }
});
});
DBrouter.get('/SelectDelete', (request, response) => {
    const id = request.query.id;
    const sql = 'delete from member where id=?';
    conn.query(sql, id, (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);
        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3001/SelectAll');
        } else if (row.affectedRows == 0){
            console.log('삭제된 값이 없습니다.');
            response.redirect('http://127.0.0.1:3001/Main');
        }
    });
});
DBrouter.get("/Main", (request, response) => {
    response.render("Main", {
        id : request.session.user
    })
})
DBrouter.get("/Logout", (request, response) => {

    delete request.session.user;

    response.render("Main", {
        id : request.session.user
    })
})
module.exports = DBrouter;