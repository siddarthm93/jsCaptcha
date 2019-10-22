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

    res.sendFile(__dirname + '/index.html');

});

app.use(session({

    secret: '12345689'

}));

//validate user and and redirect

app.post('/', function(req, res) {

    var username = req.body.username;

    var password = req.body.password;

   

    var org_username = 'admin';

    var org_password = 'password';

    if (username === org_username && password === org_password) {

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
