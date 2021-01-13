const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { extname } = require('path');
const { Socket } = require('dgram');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
//static files
app.use(express.static('public'));
app.use('/lib', express.static(__dirname + 'public/lib'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/html', express.static(__dirname + 'public/html'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = './public/uploads';

        //if directory doesn't exist then create a new one
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        } cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

//init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file');

//check file type
const checkFileType = (file, cb) => {
    // allowed extension
    const fileType = /jpeg|jpg|png|gif/;
    //check extension 
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());
    //check mime type
    const mimeType = fileType.test(file.mimetype);
    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb('Error: Image Only')
    }
}

//GET
app.get('', (req, res, err) => {
    res.render('index');
})
app.get('/:file', (req, res) => {
    res.render('image', {
        file: `${req.params.file}`
    });
})
app.get('/views/:html', (req, res) => {
    console.log(__dirname + '/public/html');
    res.sendFile('footer.html', { root: __dirname + '/public/html' });
})
//POST
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
            return err;
        } else {

            res.render('response', {
                file: `uploads/${req.file.filename}`,
                path: req.headers.origin + '/' + req.file.filename
            });


        }
    });

})
app.listen(port, () => console.info(`Listening on ${port}`));

