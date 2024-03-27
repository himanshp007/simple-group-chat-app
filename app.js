const express = require('express');
const bodyParser = require('body-parser');


const app = express();


const loginPage = require("./routes/login");
const homePage = require('./routes/home');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/auth', loginPage);
app.use(homePage);



app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});


app.listen(3000);