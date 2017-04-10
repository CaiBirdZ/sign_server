/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();
var url = require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            //var userNum=url.parse(req.url,true).query.userNum;
            //console.log(userNum);
            conn.query("select * from err_record where marks='已申请'",[],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    console.log(result);
                    var data = [{jobNo:'',emName:'',department:'',signDate:'',signTime:'',signOut:'',afterTime:'',afterOut:'',marks:''}]
                    return res.render('modifyConfirm',{result:result||data});
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
            conn.query("update sylg123sign_record set signTime=?,signOut=? where jobNo = ? and signDate=?", [req.body.signTime,req.body.signOut,req.body.jobNo,req.body.signDate], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    return res.send({code:"1"});
                }
            });
        }
    });
});
module.exports = router;