const express = require('express');
const { request } = require('http');
const Messagerouter = express.Router();
const conn = require("../config/DBConfig.js")

Messagerouter.get("/Message", (request,response)=>{
    //현재 로그인한 사람에게 온 메세지를 검색하는 기능
    const sql = "select * from web_message where rec = ?"
    if(request.session.user){
        conn.query(sql,[request.session.user.email], (err,row)=>{
            console.log(row);
            response.render("message",{
                user : request.session.user,
                row_name : row
            })
    });
} else{
    response.render("message",{
        user : request.session.user
    })
}
})

Messagerouter.post("/MessageJoin",(req,res)=>{
    let email = req.body.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;


    let sql = "insert into web_member values(?,?,?,?,now())";

    conn.query(sql, [email,pw,tel,address],(err,row)=>{
        if (!err) {
            console.log("입력성공:"+row);
            res.redirect("http://127.0.0.1:3001/message")
        } else {
            console.log("입력실패"+ err);
        }
    });
});

Messagerouter.post('/MessageLogin', (request, response) => {
    const email = request.body.email;
    const pw = request.body.pw;
    
    const sql = 'select * from web_member where email=? and pw=?'
    conn.query(sql, [email, pw], (err, row) => {
        console.log(row.length);
        if (err) {
            console.log('검색 실패');
        } else if (row.length > 0) {
            console.log("session영역에 id 저장 성공"+request.session.email);
            request.session.user = {
                "email" : row[0].email,
                "tel" : row[0].tel,
                "address" : row[0].address
            };
            response.render('message', {
                user : request.session.user
            });
            console.log(row)
            
        } else if (row.length == 0){
            response.redirect('http://127.0.0.1:3001/message');
        }
    })
});

Messagerouter.get('/MessageLogout',(request,response)=>{
    delete request.session.user;
    response.redirect("http://127.0.0.1:3001/Message");
})
Messagerouter.get("/MessageUpdate",(request,response)=>{
 
    
    response.render("update", {
        user : request.session.user
    })
});

Messagerouter.post("/MessageUpdateExe",(req,res)=>{

    let email = req.session.user.email;
    let pw = req.body.pw;
    let tel = req.body.tel;
    let address = req.body.address;


    let sql = "update web_member set pw = ? , tel = ? , address = ? where email = ?";

    conn.query(sql, [pw,tel,address,email],(err,row)=>{
        if (!err) {
            console.log("입력성공:"+ row);
            
            request.session.user = {
                "email" : email,
                "tel" : tel,
                "address" : address
            }
            res.redirect("http://127.0.0.1:3001/Message")
        } else {
            console.log("입력실패"+ err);
        }
    });
});

Messagerouter.get('/MessageMemberSelect', (request, response) => {
    
    
    const sql = 'select * from web_member'
    conn.query(sql, (err, row) => {
        console.log(row.length);
        if (err) {
            console.log('검색 실패');
        } else if (row.length > 0) {
           
            console.log(row);

            response.render('selectMember', {
                row_name : row
            });
            console.log(row)
            
        } else if (row.length == 0){
            //검색된 데이터가 없을때
            response.redirect('http://127.0.0.1:3001/message');
        }
    })
});

Messagerouter.get('/MessageDelete', (request, response) => {
    
    const email = request.query.email;

    const sql = 'delete from web_member where email=?';
    conn.query(sql, [email], (err, row) => {
        if (err) {
            console.log('삭제 실패: '+ err);
        } else if (row.affectedRows > 0) {
            console.log('명령에 성공한 수: ' + row.affectedRows);
            response.redirect('http://127.0.0.1:3001/MessageMemberSelect');
        }
    });
});

Messagerouter.post("/MessageSend",(req,res)=>{
    let send = req.body.send;
    let rec = req.body.rec;
    let content = req.body.content;
   


    let sql = "insert into web_Message(send, rec, content,send_date) values(?,?,?, now())";

    conn.query(sql, [send,rec,content],(err,row)=>{
        if (!err) {
            console.log("입력성공:"+row);
            res.redirect("http://127.0.0.1:3001/message")
        } else {
            console.log("입력실패"+ err);
        }
    });
});

module.exports = Messagerouter;