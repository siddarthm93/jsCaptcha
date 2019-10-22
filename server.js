var express = require('express');

var app = express();

var session = require('express-session');

// import body parser

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({

    extended: true

}));



app.use(bodyParser.json());

//render static content in express

app.use('/common_lib', express.static('common_lib'));

//render user login page

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/ImageCaptcha.html');

});

app.use(session({

    secret: '12345689'

}));

//validate user and and redirect

app.post('/', function(req, res) {

    var username = req.body.username;

    var password = req.body.password;

    var user_captcha = req.body.user_captcha; // from user entered Captcha Text

    var captcha_Origing = req.body.captcha_Origing; // this is from hidden input html form

    user_captcha

    var org_username = 'test@gmail.com';

    var org_password = '123456';

    if (username === org_username && password === org_password && user_captcha === captcha_Origing) {

        req.session.user = username;

        return res.redirect('/user');

    } else {

        return res.redirect('/');

    }

});


app.get('/user', function(req, res) {

    res.end('<h1> Hey ' + req.session.user + ' You Entered Valid Captcha !</h1>');

});



app.listen(3000, function() {

    console.log('server started');

});
