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
                    conn.query("insert into "+req.body.cpID+"sign_record(jobNo,signDate,signTime) values(?,?,?)",[req.body.jobNo,req.body.date,req.body.time],function(err,result){
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
