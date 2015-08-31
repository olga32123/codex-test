define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var AddProject = require('./addProject')

return function(){
	var self = this;
	self.projects = ko.observableArray([]);
	self.addProject = function(){
		AddProject.show().then(function(data){
			self.projects.push(data);
		});
	}
	self.removeProject = function(project){
			$.ajax({
			url : '/api/projects/' + project.id,
			type : 'DELETE'
		}).then(function(json){
			self.projects.remove(project)
		})
	}
	self.activate = function(){

		$.ajax ({
			method: "GET",
			url : "/api/projects",
		}).then(function(json){
			self.projects(json);
		})
	}
}

});

