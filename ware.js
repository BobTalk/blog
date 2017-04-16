exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('erro', "未登录，请登录");
        res.redirect('/user/signin');
    }
};

exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('erro', "已登录");
        res.redirect('/');
    } else {
        next();
    }
};