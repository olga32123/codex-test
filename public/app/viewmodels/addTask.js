define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var router = require('plugins/router');
    
return  function(){
 	var self = this;
 	self.title = ko.observable('');
 	self.text = ko.observable('');

 	self.add = function(){
	 	var newTask = {
	 			title: self.title(),
	 			text: self.text()
	 	};
	 	$.ajax({
	 		method: "POST",
	 		url : "/api/tasks",
	 		contentType : "application/json",
	 		data : JSON.stringify(newTask)
			}).then(function(json){
			router.navigate('#/tasks');	
		})
		}
	self.activate = function(){
	

	}		

 }

 });       