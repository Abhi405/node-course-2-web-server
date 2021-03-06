const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to file server.log');
        }
    });
   next();
});

/*app.use((req, res, next) => {
    res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('<h1>Hello world!</h1>');

   res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae nulla inventore distinctio numquam similique fuga dolore! Praesentium sint vero eaque?'
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to complete request'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.hbs', {
        pageTitle: 'Portfolio Page'
    });
});

app.listen(port, () => {
    console.log(`Server is up on Port ${port}`);
});