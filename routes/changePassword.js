/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('changePassword', { title: 'Express' });
});

router.post('/cpKeyExit',function(req,res,next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from rootuser where userNum=? AND cpKey=?", [req.body.userNum,req.body.cpKey], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    console.log(result);
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
            conn.query("update rootuser set password=? where userNum = ?", [req.body.password,req.body.userNum], function (err, result) {
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
