const express = require("express");
const router = express.Router(); //express갖고있는 기능중에 router기능 사용

router.get("/plus", function(request, response){// /plus라우터 기능정의 및 등록
    console.log("/plus 라우터 호출")
    console.log(parseInt(request.query.num1)+parseInt(request.query.num2));
    console.log();

    response.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    response.write("<html>")
    response.write("<body>")
    response.write("결과값 : " + (parseInt(request.query.num1)+parseInt(request.query.num2)))
    response.write("</body>")
    response.write("</html>")
});

router.get("/cal", (request,response)=>{// /cal 라우터 기능 정의 및 등록
    //1.사용자의 입력값 가져오기.
    let num1 = request.query.num1;
    let num2 = request.query.num2;
    let cal = request.query.cal;
    console.log(num1 + cal + num2);
    // 사용자가 입력한 기호에 맞는 연살결과값을 브라우저에 출력하시오.
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    if(cal === '+') {
        response.write("결과값>"+ (parseInt(request.query.num1) + parseInt(request.query.num2)))
    }else if(cal === '-') {
        response.write("결과값>"+ (parseInt(request.query.num1) - parseInt(request.query.num2)))
    } else if (cal === '*') {
        response.write("결과값>"+ (parseInt(request.query.num1) * parseInt(request.query.num2)))
    } else {
        response.write("결과값>"+ (parseInt(request.query.num1) / parseInt(request.query.num2)))
    }
    response.write("</body>");
    response.write("</html>");
    response.end();
});

router.post("/Grade",(request, response)=>{

    let avg = (parseInt(request.body.java) + parseInt(request.body.web) + 
    parseInt(request.body.iot) + parseInt(request.body.android)) / 4

    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    response.write("이름 : " + request.body.name + "<br>");
    response.write("자바 : " + request.body.java + "<br>");
    response.write("웹 : " + request.body.web + "<br>");
    response.write("IOT : " +request.body.iot+ "<br>");
    response.write("안드로이드 : " + request.body.android + "<br>");
    response.write("AVG : " + avg + "<br>")
    response.write("</body>");
    response.write("</html>");
    response.end();

    console.log("이름 : " + request.body.name);
    console.log("자바 : " + request.body.java);
    console.log("웹 : " + request.body.web);
    console.log("IOT : " + request.body.iot);
    console.log("안드로이드 : " + request.body.android);

    

});


router.post("/join", function(request, response){
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("<html>");
    response.write("<body>");
    response.write("ID : "+ request.body.id + "<br>");
    response.write("NAME : "+ request.body.name + "<br>");
    response.write("EMAIL : "+ request.body.email + "<br>");
    response.write("TEL : "+ request.body.tel + "<br>");
    response.write("GENDER : "+ request.body.gender + "<br>");
    response.write("COUNTRY : "+ request.body.country + "<br>");
    response.write("BIRTH : "+ request.body.birth + "<br>");
    response.write("COLOR : "+ request.body.color + "<br>");
    response.write("HOBBY : "+ request.body.hobby + "<br>");
    response.write("TALK : "+ request.body.talk + "<br>");
    response.write("</body>");
    response.write("</html>");
    response.end();

});



module.exports = router;