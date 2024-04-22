const express = require('express');
const session= require('express-session');
const bodyParser= require('body-parser');
const path = require('path');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');


const app= express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(_dirname, 'public')));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    reseve: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}));

const errorRoutes = require('./routes/error');
app.use('*', errorRoutes);

app.use('/user', userRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

