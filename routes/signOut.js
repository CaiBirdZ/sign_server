var express = require('express');
var router = express.Router();

/* GET users' information. */
router.post('/', function(req, res, next) {
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                console.log(req.body);
                conn.query("update "+req.body.cpID+"sign_record SET signOut=?,remark=? where jobNo=? and signDate=?",[req.body.time,req.body.remark,req.body.jobNo,req.body.date],function(err,result){
                    if(err){
                        return next(err);
                    }else{
                        return res.send({code:"1"});
                    }
                });
            }
        });
});

module.exports = router;
