const express = require('express');
const app = express();
const ejs = require('ejs');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const routes = require('./routes/routes')
require('dotenv').config()

// middlewares
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(routes)


// connect to database
mongoose
	.connect(process.env.DBS_URL)
	.then((result) => app.listen(3000))
	.catch((err) => console.log(err));


