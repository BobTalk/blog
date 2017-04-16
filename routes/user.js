let express = require("express");
let multer = require("multer");
let User = require("../model").User;
let {checkLogin, checkNotLogin}=require('../ware');
let router = express.Router();
//./public/uploads 是根据server文件的相对路径
let upload = multer({dest: "./public/uploads"})
router.get("/signup", checkNotLogin, function (req, res) {
    res.render('user/signup.html', {title: '注册'});
});
//upload.single 文件上传路径解析
router.post("/signup", checkNotLogin, upload.single("avatar"), function (req, res) {
    let user = req.body;
    let avatar = req.file;
    user.avatar = `uploads/${req.file.filename}`;
    User.findOne({username: user.username}, function (err, oldUser) {
        if (oldUser) {
            req.flash("error", '用户已被注册，请重新注册！');
            res.redirect('back');
        } else {
            User.create(user, function (err, doc) {
                if (err) {
                    req.flash("error", err.toString());
                    res.redirect('back');
                } else {
                    res.redirect("/user/signin");
                }
            })
        }
    })

});
router.get("/signin", checkNotLogin, function (req, res) {
    res.render('user/signin.html', {title: '登录'});
});
router.post("/signin", checkNotLogin, function (req, res) {
    let user = req.body;
    User.findOne(user, function (err, doc) {
        if (err) {
            req.flash('error', err.toString());
            res.redirect("back");
        } else {
            if (doc) {
                req.flash('success', '登录成功');
                req.session.user = doc;
                //res.cookie('username',req.session.user.username,{httpOnly:true});
                res.redirect("/");
            } else {
                req.flash('error', '登录失败');
                res.redirect("back");
            }
        }
    })
    //res.send('登录');
});
router.get("/signout", checkLogin, function (req, res) {
    //res.clearCookie("username");
    req.session.user = null;
    res.redirect('signin');
});
module.exports = router;