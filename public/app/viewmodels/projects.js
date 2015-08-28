define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');

return function(){
	var self = this;
	self.projects = ko.observableArray([]);
	self.addProject = function(){
		
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
	self.template = 'projects';
}

});

