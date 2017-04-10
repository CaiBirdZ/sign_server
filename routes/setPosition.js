/**
 * Created by 11952 on 2017/3/21.
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
            var userNum=url.parse(req.url,true).query.userNum;
            console.log(userNum);
            conn.query("select cpID,cpName,cpHQ from company_data,rootuser where rootuser.userNum=? and company_data.cpKey=rootuser.cpKey",[userNum],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    console.log(result);
                    return res.render('setPosition',{result:result});
                }
            });
        }
    });
});

router.post('/set', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            conn.query("update company_data set cpPosLon=?,cpPosLat=? where cpName=?",[req.body.cpPosLon,req.body.cpPosLat,req.body.cpName],function(err,result){
                if(err){
                    console.log(err);
                    return next(err);
                }else{
                    console.log(result);
                    return res.send({code:'1'});
                }
            });
        }
    });
});

module.exports = router;
