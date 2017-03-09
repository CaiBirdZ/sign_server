/**
 * Created by 11952 on 2017/3/1.
 */
var express = require('express');
var router = express.Router();

/* GET users' information. */
router.post('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from "+req.body.cpID+"sign_record where jobNo=? and signDate=?",[req.body.jobNo,req.body.date],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.send(result[0]);
                }
            });
        }
    });
});

module.exports = router;
