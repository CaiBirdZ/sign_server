var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    try{
        req.getConnection(function(err,conn){
            if(err){
                return next(err);
            }else{
                console.log(req.body);
                conn.query("select * from user_info,company_data where jobNo = ? and user_info.cpID = company_data.cpID",[req.body.userNo],function(err,result){
                    if(err){

                        return next(err);

                    }else {
                        if(result[0].password === req.body.password)
                        {
                            console.log(result);
                            return res.send({code:'000',result:result});
                        }else {

                            return res.send({code:'002'});
                        }
                    }
                });
            }
        });
    }catch(e){
        console.log(e.description);
        res.send({code:'003'});
    }

});

module.exports = router;
