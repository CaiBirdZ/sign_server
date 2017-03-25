/**
 * Created by 11952 on 2017/3/24.
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
            try {
                conn.query("update err_record set afterTime=?,afterOut=?,marks='已申请' where jobNo=?,signDate=?",[req.body.signTime,req.body.signOut,req.body.jobNo,req.body.date],function(err,result){
                    if(err){
                        return res.send({code:"111"});
                    }else{
                        return res.send({code:"000"});
                    }
                });
            }catch (e){
                return res.send({code:"111"});
            }

        }
    });
});

module.exports = router;