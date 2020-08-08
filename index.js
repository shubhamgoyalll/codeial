// make index.js then npm init then npm install express

const express = require('express');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract styles and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running on server, ${err}`);
    }
    console.log(`Server is running on port, ${port}`);
});