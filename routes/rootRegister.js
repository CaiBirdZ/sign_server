/**
 * Created by 11952 on 2017/3/27.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: '注册' });
});

router.post('/userRepeat',function(req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from rootuser where userNum = ?", [req.body.userNum], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    if(result[0] == null||result[0]==""){
                        return res.send({code:"0"});
                    }else{
                        return res.send({code:"1"});
                    }

                }
            });
        }
    });
});

router.post('/cpKeyRepeat',function(req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from rootuser,company_data where rootuser.cpID=company_data.cpID AND company_data.cpKey = ? ", [req.body.cpKey], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    if(result[0] == null||result[0]==""){
                        return res.send({code:"0"});
                    }else{
                        return res.send({code:"1"});
                    }

                }
            });
        }
    });
});

router.post('/cpKeyExist',function(req, res, next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from company_data where cpKey = ?", [req.body.cpKey], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    if(result[0] == null||result[0]==""){
                        return res.send({code:"0"});
                    }else{
                        return res.send({code:"1"});
                    }

                }
            });
        }
    });
});


router.post('/sure',function(req,res,next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("insert into rootuser values(?,?,?)", [req.body.userNum,req.body.password,req.body.cpKey], function (err, result) {
                if(err){
                    console.log(err);
                    return next(err);
                }else {
                    return res.cookie('userInfo',{userNum:req.body.userNum});
                }
            });
        }
    });
});
module.exports = router;
