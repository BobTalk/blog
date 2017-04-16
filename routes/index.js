let express = require("express");
let User = require("../model").User;
let Acticle = require("../model").Acticle;
let router = express.Router();
router.get("/", function (req, res) {
    //populate把字符串转成对象
    let pageNum = isNaN(req.query.pageNum) ? 1 : parseInt(req.query.pageNum);
    let pageSize = isNaN(req.query.pageSize) ? 5 : parseInt(req.query.pageSize);
    let query = {};
    if (req.query.keyword) {
        query.title = new RegExp(req.query.keyword);
    }
    Acticle.count(query, function (err, count) {
        Acticle.find(query).skip((pageNum-1)*pageSize).limit(pageSize).populate("user").exec(function (err, acticles) {
            res.render('index/index.html', {
                title: "首页",
                acticles,
                keyword: req.query.keyword,
                pageNum,
                pageSize,
                totalPages: Math.ceil(count/pageSize)
            });
        });
    })

});
module.exports = router;