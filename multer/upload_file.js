const multer = require("multer");
const mkdir = require("mkdirp");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let [type, extname] = file.mimetype.split("/");
        if (type == "image") {
            mkdir("./static/media/books").then((made) => {
                return cb(null, "./static/media/books");
            });
        } else {
            cb(new Error("file formant is wrong"));
        }
    },
    filename: function (req, file, cb) {
        cb(null, req.body.title + ".jpg");
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
