var express = require('express');
var app = express();

var bodyParser = require('body-parser');



var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var projects = [{title : 't1w', text: "dd", id : 1}];

app.use(express.static('public'));

var ORM = require('./models/ORM');
var config = require('./config.json');
var _ = require('lodash');



var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views' });
app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');



// ORM.init(app, function(e){
// 	app.use('/api/tasks', ORM.REST('tasks'))


// 	app.use(ORM.middleware);

ORM.init(app, function(e){
	app.use('/api/tasks', ORM.REST('tasks'))
	app.use('/api/projects', ORM.REST('projects'))

	app.use(ORM.middleware);



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

})