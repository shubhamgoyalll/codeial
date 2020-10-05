const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session'); // ctrl + space to trigger autocomplete
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads' ));

app.use(expressLayouts);

// Extract styles and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    // todo change the secret before deployment in production mode
    secret : 'secret',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100 )
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
        )
    }));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express router
app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running on server, ${err}`);
    }
    console.log(`Server is running on port, ${port}`);
});

// make index.js then npm init then npm install express
// when adding cookies npm install cookie-parser
// npm install express-session when using passport js