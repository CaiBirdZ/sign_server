/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('queryRecord', { title: 'Express' });
});
router.post('/byJobNo',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where sylg123sign_record.jobNo=? AND user_info.jobNo=sylg123sign_record.jobNo",[req.body.jobNo],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.send({code:'1',result:result});
                }
            });
        }
    });
});

router.post('/byDepartment',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where user_info.department=? AND user_info.jobNo=sylg123sign_record.jobNo",[req.body.department],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.send({code:'1',result:result});
                }
            });
        }
    });
});

router.post('/bySignDate',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where sylg123sign_record.signDate=? AND user_info.jobNo=sylg123sign_record.jobNo",[req.body.signDate],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.send({code:'1',result:result});
                }
            });
        }
    });
});
router.post('/byJobNoAndSignDate',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where sylg123sign_record.signDate=? AND sylg123sign_record.jobNo=? AND user_info.jobNo=sylg123sign_record.jobNo",[req.body.signDate,req.body.jobNo],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.send({code:'1',result:result});
                }
            });
        }
    });
});

router.post('/byDepartmentAndSignDate',function(req,res,next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where sylg123sign_record.signDate=? AND user_info.department=? AND user_info.jobNo=sylg123sign_record.jobNo",[req.body.signDate,req.body.department],function(err,result){
                if(err){
                    return next(err);
                }else{
                    console.log(result)
                    return res.send({code:'1',result:result});
                }
            });
        }
    });
});

module.exports = router;