// define(function(require) {
//     var ko = require('knockout');
//     var $ = require('jquery');
//     var router = require('plugins/router');

// return function(){
// 	var self = this;
// 	self.title = ko.observable('');
// 	self.text = ko.observable('');

// 	self.add = function(){
// 	 	var newProject = {
// 	 			title: self.title(),
// 	 			text: self.text()
// 	 	};
// 	 	$.ajax({
// 	 		method: "POST",
// 	 		url : "/api/projects",
// 	 		contentType : "application/json",
// 	 		data : JSON.stringify(newProject)
// 			}).then(function(json){
// 			router.navigate('#/projects');	
// 		})
// 		}
// 	self.activate = function(){
	

// 	}		
// }



//      }); 


 define(function(require) {
    var ko = require('knockout');
    var $ = require('jquery');
    var router = require('plugins/router');
    var dialog = require('plugins/dialog');
    var CustomModal = function() {
        	var self = this;
	self.title = ko.observable('');
	self.text = ko.observable('');

	self.add = function(){
	 	var newProject = {
	 			title: self.title(),
	 			text: self.text()
	 	};
	 	$.ajax({
	 		method: "POST",
	 		url : "/api/projects",
	 		contentType : "application/json",
	 		data : JSON.stringify(newProject)
			}).then(function(json){
			// router.navigate('#/projects');
			 dialog.close(self, json);	
		})

		}
	self.activate = function(){
	

	}		

    };

 
    CustomModal.show = function(){
        return dialog.show(new CustomModal());
    };
 
    return CustomModal;
});