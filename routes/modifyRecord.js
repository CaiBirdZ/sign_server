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
            var beforeTime;
            var beforeOut;
            console.log(req.body);
            try {
                conn.query("select signTime,signOut from sylg123sign_record where jobNo = ? AND signDate = ?",[req.body.jobNo,req.body.date],function(err,result){
                    if(err){
                        next(err);
                    }else{
                        beforeTime = result[0].signTime;
                        beforeOut = result[0].signOut;
                        try {
                            conn.query("insert into err_record values(?,?,?,?,?,?,'已申请')",[req.body.jobNo,req.body.date,beforeTime,beforeOut,req.body.signTime,req.body.signOut],function(err,result){
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
            }catch (e){
                console.log(e);
            }
            //console.log(req.body);

        }
    });
});

module.exports = router;