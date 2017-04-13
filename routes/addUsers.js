/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addUsers', { title: 'Express' });
});
router.post('/add',function(req,res,next){
    req.getConnection(function (err, conn) {
        if (err) {
            return next(err);
        } else {
            console.log(req.body);
            conn.query("insert into user_info(jobNo,emName,department,emTel,email,cpID) values(?,?,?,?,?,'sylg123')", [req.body.jobNo,req.body.emName,req.body.department,req.body.emTel,req.body.email], function (err, result) {
                if(err){
                    console.log(err);
                    return next(err);
                }else {
                    return res.send({code:1});

                }
            });
        }
    });
});
module.exports = router;
