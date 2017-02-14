var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from user_info where jobNo = ?,password = ?",[req.body.userNo,req.body.password],function(err,result){
                if(err){
                    return res.send({code:0});
                    //next(err);
                }else {
                    return res.send({code:1,result:result});
                }
            });
        }
    });
});

module.exports = router;
