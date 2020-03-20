var express = require('express')
var app = express()
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var bodyParser = require('body-parser');
require('./configs/database')


app.use(bodyParser.urlencoded({extended : true}))
.use(bodyParser.json());

app.use('/api/persons', require('./routers/personsRouter'))
app.use('/api/todos', require('./routers/todosRouter'))
app.use('/api/posts', require('./routers/postsRouter'))
app.listen(8000);