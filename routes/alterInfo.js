var express = require('express');
var router = express.Router();

/* GET users' information. */
router.post('/', function(req, res, next) {
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                console.log(req.body);
                conn.query("update user_info set jobNo=?,emName=?,department=?,emTel=?,email=? where jobNo = ?",
                    [req.body.jobNo,req.body.emName,req.body.department,req.body.emTel,req.body.email,req.body.oldJobNo],function(err,result){
                    if(err){

                        return next(err);

                    }else {
                        return res.send({code:'000'});
                    }
                });
            }
        });
});

module.exports = router;
