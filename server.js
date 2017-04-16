let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
let session = require("express-session");
let cookieParser = require("cookie-parser");
//把信息写在SESSION中的中间件
let flash = require("connect-flash");
let MongoStore = require("connect-mongo")(session);
let app = express();

app.use(cookieParser());//调用cookie-parser中间件
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "hyq",
    //cookie:{maxAge:1000*300},
    store: new MongoStore({
        url: require("./config").config.url
    })
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.username = req.flash('username').toString();
    res.locals.keyword ="";
    res.locals.user = req.session.user;
    next();
})
//静态文件中间件
app.use(express.static(path.resolve('public')));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//引入模板
app.set("view engine", "html");
//模板路径
app.set("views", path.resolve(__dirname, 'views'));
//模板渲染方式
app.engine("html", require("ejs").__express);

let user = require("./routes/user.js");
let index = require("./routes/index.js");
let acticle = require("./routes/acticle.js");
app.use("/user", user);
app.use("/", index);
app.use("/acticle", acticle);
app.listen("9090", function () {
    console.log("监听成功");
});