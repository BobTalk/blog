let express = require("express");
let router = express.Router();
let Acticle = require("../model").Acticle;
let multer = require("multer");
let upload = multer({dest: "./public/uploads"})
let {checkLogin, checkNotLogin}=require('../ware');
router.get("/add", checkLogin, function (req, res) {
    res.render("acticle/add", {title: "发表文章", acticle: {}});
});
router.post("/add", checkLogin,upload.single("picture"), function (req, res) {
    let acticle = req.body;
    let picture = req.file;
    acticle.user = req.session.user._id;
    acticle.picture = `uploads/${req.file.filename}`;
    Acticle.create(acticle, function (err) {
        if (err) {
            req.flash("error", "文章添加失败");
            res.redirect('back');
        } else {
            req.flash("success", "文章添加成功");
            res.redirect("/");
        }
    })
});
router.get("/detail/:_id", checkLogin,function (req, res) {
    console.log('111')
    let _id = req.params._id;
    Acticle.findById({_id}, function (err, acticle) {
        res.render("acticle/detail", {title: "文章详情", acticle})
    })
});
router.get('/delete/:_id',checkLogin, function (req, res) {
    console.log(222);
    let _id = req.params._id;
    Acticle.remove({_id}, function (err, result) {
        if (err) {
            req.flash('error', '删除文章失败');
            res.redirect('back');
        } else {
            req.flash('success', '删除文章成功');
            res.redirect('/');
        }
    })
});
router.get("/update/:id",checkLogin, function (req, res) {
    let _id = req.params.id;
    Acticle.findById({_id}, function (err, acticle) {
        res.render("acticle/add", {title: "修改文章", acticle})
    })
})
router.post("/update/:_id", checkLogin,function (req, res) {
    let _id = req.params._id;
    let article = req.body;
    Acticle.update({_id}, article, function (err, reslut) {
        if (err) {
            req.flash("error", "更新失败");
            res.redirect("back");
        } else {
            req.flash("success", "更新成功");
            res.redirect(`/acticle/detail/${_id}`);
        }
    })
});
module.exports = router;