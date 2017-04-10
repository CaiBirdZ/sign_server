var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/login',function(req,res,next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("select * from rootuser where userNum = ? and password=?", [req.body.userNo,req.body.password], function (err, result) {
                if(err){
                    return next(err);
                }else {
                    if(result[0] == null||result[0]==""){
                        return res.send({code:"0"});
                    }else{
                        return res.send({code:"1",result:result[0].userNum});
                    }

                }
            });
        }
    });
});
module.exports = router;
