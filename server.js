var express = require('express');
var app = express();

var bodyParser = require('body-parser');



var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var tasks = [{title: 't1', text: 'ww', id : 1}];

var projects = [{title : 't1w', text: "dd", id : 1}];

app.use(express.static('public'));


var _ = require('lodash');

app.post('/api/tasks', function(request, response){
   var task = request.body;
   console.log(task);
   task.id = (new Date()).getTime();

   tasks.push(task);
   response.send(tasks);
});


app.post('/api/projects', function(request, response){
   var project = request.body;
   console.log(project);
   project.id = (new Date()).getTime();
    
   projects.push(project);
   response.send(projects);
});

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views' });
app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');

app.get('/api/tasks', function(request, response){
   response.send(tasks);
});


app.get('/api/projects', function(request, response){
   response.send(projects);
});



app.delete('/api/tasks/:id', function(request, response){
var id = request.params.id;
var index = _.remove(tasks, function(t){
	return t.id == id;
})
   response.send(tasks);
});

app.delete('/api/projects/:id', function(request, response){
var id = request.params.id;
var index = _.remove(projects, function(t){
	return t.id == id;
})
   response.send(projects);
});
// ORM.init(app, function(e){
// 	app.use('/api/tasks', ORM.REST('tasks'))


// 	app.use(ORM.middleware);





var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});