const express = require('express');
const path = require('path');
require('dotenv').config();

const users = require('./controllers/users');

const app = express()
const port = process.env.PORT || 3000;

//middle ware
app.use(express.json());
app.use(express.static(__dirname + '/../docs/'))


//authentication
app.use(function(req,res,next){
    const arr = (req.headers.authorization || "").split(" ");
    if(arr.length > 1 && arr[1]!=null){
        req.userId = +arr[1];
    }
    next();
});


//API
app.get('/hello',(req,res) => {
    res.send('Hello Hudson Valley! You requested '+ req.url)
})

app.use('/users',users);

app.get('*',(req,res,next)=>{
    res.sendFile( path.join(__dirname + '/../docs/index.html') )
})

app.use( (err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send( { message: err.message } )
} )


//init
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})

