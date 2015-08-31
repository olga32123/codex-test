var Waterline = require('waterline');
var config = require('../config');
//var mongo = require('sails-mongo');
var mysql = require('sails-mysql');


//config.mongo.adapter = 'mongo';
config.mysql.adapter = 'mysql';


var ormConfig = {
    adapters: {
    //    mongo: mongo,
        mysql: mysql
    },
    connections: {
        //mongo: config.mongo,
        mysql: config.mysql
    },
    defaults: {
        migrate: 'alter'
    }
};

var orm = new Waterline();


var files = require('fs').readdirSync('models');
files.forEach(function (fileName) {
	var ext = fileName.split('.').pop();

	if (ext == 'js'){
		var collection = require('../models/' + fileName);
		orm.loadCollection(collection);
		console.log('load collection: ', fileName);
	}
});

// //TODO: map files from dir
// orm.loadCollection(require('../models/Task'));
// orm.loadCollection(require('../models/Project'));
// orm.loadCollection(require('../models/User'));
// orm.loadCollection(require('../models/Comments'));


var init =  function(app, done) {
	orm.initialize(ormConfig, function(e, models){
		if (e){
			console.log('ORM error: ', e);
		}
		
		exports.db = models.collections; 
		app.db = models.collections;
		
        done(e, models)
	});
}

Function.prototype.asMiddleware = function(scope, args, putInto){
	var func = this;
	return function(req, res, next){
		var returnFunc = function(e, result){
			if (e){
				console.log('error>', e);
				return;
			}
			if (putInto){
				req[putInto] = result
				next();
			} else {
				res.json(result)	
			}
		}

		
		var _args = [returnFunc];


		for (var i = args.length - 1; i >= 0; i--) {
			var key = args[i];
			if (key.indexOf('.')!=-1){
				var p = key.split('.');
				_args.unshift(req[p[0]][p[1]]);
			} else {
				_args.unshift(req[key]);
			}
		};

		func.apply(scope, _args)
	}
}




var middleware = function(req, res, next){
	req.db = exports.db;
	next();
}


var CRUD = require('./CRUD');


var exports = {
	db : {},
	init : init,
	middleware : middleware,
	getCollection : function(name){
		return this.db[name];
	},
	REST : function(collectionName, foreignKey){
		var router = require('express').Router();
		// var collection = exports.getCollection(collectionName);
		// return router
		// 		 .get('/', collection.find.asMiddleware(collection, []))
		// 		 .get('/:id', collection.findOne.asMiddleware(collection, ['params.id']))
		// 		 .post('/', collection.create.asMiddleware(collection, ['body']))
		// 		 .put('/:id', collection.update.asMiddleware(collection, ['params.id', 'body'], 'items'), function(req, res){ res.json(req.items[0]) })
		// 		 .delete('/:id', collection.destroy.asMiddleware(collection, ['params.id']))


    // .get('/', controller.findAll, Crud.populate('permisions'))
    // .get('/:id', controller.findOne)
    // .post('/', controller.add)
    // .put('/:id', controller.updateOne)
    // .delete('/:id', controller.removeOne)

    	var service = CRUD(collectionName, foreignKey);
		
		
		return router
    			.get('/', service.findAll)
				.get('/:id', service.findOne)
				.post('/', service.add)
				.put('/:id', service.updateOne)
				.delete('/:id', service.removeOne)
				.use(CRUD.exec, CRUD.returnJSON);		
	} 
}
module.exports = exports;