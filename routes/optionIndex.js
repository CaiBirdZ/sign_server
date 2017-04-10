/**
 * Created by 11952 on 2017/3/21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('optionIndex', { title: 'optionIndex' });
});

module.exports = router;