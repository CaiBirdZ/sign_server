var express = require('express');
var router = express.Router();
var topClient = require("./topClient").TopClient;
/* GET users' information. */
router.post('/',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("update user_info set password=? where emTel=?", [req.body.newpassword,req.body.emTel],function(err,result){
                if(err){

                    return next(err);

                }else {
                    console.log(result);
                    return res.send({code:'000'});
                }
            });
        }
    });
});
router.post('/confirm', function(req, res, next) {
    //req.getConnection(function(err,conn){
    //    if(err){
    //        return next(err);
    //    }else{
    //        console.log(req.body);
    //        conn.query("select * from user_info where emTel = ?", [req.body.newpassword,req.body.emTel],function(err,result){
    //            if(err){
    //                return next(err);
    //            }else if(result[0]==null||result[0]==""){
    //                return res.send({noUser:"1"});
    //            }
    //        });
    //    }
    //});
    var idCode = "";
    for(var i = 0;i<4;i++){
        idCode += Math.floor(Math.random()*10);
    }
    var client = new topClient({
        'appkey':'23662936',
        'appsecret':'dfee5c7cc4c12137b2860ddf4cd59e3d',
        'REST_URL':'http://gw.api.taobao.com/router/rest'
    });
    client.execute('alibaba.aliqin.fc.sms.num.send',
        {
            'sms_type':'normal',
            'sms_free_sign_name':'爱签',
            'sms_param':'{\"emName\":\"张闯\",\"number\":'+'\"'+idCode+'\"'+'}',
            'rec_num':req.body.emTel,
            'sms_template_code':'SMS_53530126'
        },
        function (error,response) {
            if(!error){
                console.log(response);
                return res.send({okCode:"1",messageCode:idCode});
            }
            else{
                console.log(error);
                return res.send({errCode:"1"});
            }

        });

});

module.exports = router;
