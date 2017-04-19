/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('forgotPassword', { title: 'Express' });
});

router.post('/sure',function(req,res,next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("update rootuser set password='123456' where userNum = ?", [req.body.userNum], function (err, result) {
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
