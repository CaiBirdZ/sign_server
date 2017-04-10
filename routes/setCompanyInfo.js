/**
 * Created by 11952 on 2017/3/28.
 */
var express = require('express');
var router = express.Router();
var postData = [];
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('setCompanyInfo',{result:postData});
});

router.post('/query',function(req, res, next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select cpID,cpName,cpHQ from company_data where cpName=?",[req.body.cpName],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    //postData.queryData=result;
                    return res.send({result:result[0]});
                }
            });
        }
    });
})

router.post('/cpIDRepeat',function(req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from company_data where cpID = ? ", [req.body.cpID], function (err, result) {
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

router.post('/cpHQExist',function(req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from company_data where cpName = ? ", [req.body.cpHQ], function (err, result) {
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

router.post('/cpNameRepeat',function(req, res, next) {
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from company_data where cpName = ? ", [req.body.cpName], function (err, result) {
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


router.post('/getData',function(req, res, next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select cpID,cpName,cpHQ from company_data,rootuser where rootuser.userNum=? and company_data.cpKey=rootuser.cpKey",[req.body.userNum],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    postData=result;
                    console.log(result);
                    return res.send({data:result});
                }
            });
        }
    });
});

router.post('/modifyCpInfo',function(req, res, next){
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("update company_data set cpID=?,cpName=?,cpHQ=? where cpName = ? ",[req.body.cpID,req.body.cpName,req.body.cpHQ,req.body.oldCpName],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    return res.send({code:'1'});
                }
            });
        }
    });
});

module.exports = router;