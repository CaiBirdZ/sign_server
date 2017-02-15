var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from user_info where jobNo = ?",[req.body.userNo],function(err,result){
                if(err){
                    console.log(err);
                    return res.send({code:'003'});
                    //next(err);
                }else {
                    //conn.query("select * from user_info where jobNo = ?,password = ?",[req.body.userNo,req.body.password],function(err,result){
                    //    if(err){
                    //        return res.send({code:'002'});
                    //        //next(err);
                    //    }else {
                    //        console.log(result);
                    //        return res.send({code:'001',result:result});
                    //    }
                    //});
                    if(result[0].password === req.body.password)
                    {
                        console.log(result);
                        return res.send({code:'000',result:result});
                    }else {

                        return res.send({code:'002'});
                    }
                }
            });
        }
    });
});

module.exports = router;
