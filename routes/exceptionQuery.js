/**
 * Created by 11952 on 2017/4/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.getConnection(function(err,conn){
        if(err){
            return next(err);
        }else{
            console.log(req.body);
            conn.query("select * from sylg123sign_record,user_info where sylg123sign_record.remark='异常' AND user_info.jobNo=sylg123sign_record.jobNo",[],function(err,result){
                if(err){
                    return next(err);
                }else{
                    return res.render('exceptionQuery', { result: result});
                }
            });
        }
    });

});

module.exports = router;