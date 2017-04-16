let mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(require("./config").config.url);
let UserSchema = new mongoose.Schema({
    username: String,
    password: Number,
    email: String,
    avatar: String,
}, {collection: 'user'});
let UserModel = mongoose.model("User", UserSchema);
exports.User = UserModel;
let ActicleSchema = new mongoose.Schema({
    title: String,
    content: String,
    picture:String,
    createAt: {type: Date, default: Date.now},
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, {collection: 'article'});
let ArticleModel = mongoose.model("Article", ActicleSchema);
exports.Acticle = ArticleModel;
