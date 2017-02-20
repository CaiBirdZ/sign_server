var express = require('express');
var router = express.Router();

/* GET users' information. */
router.post('/', function(req, res, next) {
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                console.log(req.body);
                conn.query("insert into ?"+"sign_record "+"values(?,?,?)",[req.body.cpID,req.body.jobNo,req.body.date,req.body.time],function(err,result){
                    if(err){
                        return next(err);
                    }else{
                        return res.send({code:"000"});
                    }
                });
            }
        });
});

module.exports = router;
