

function applyFilters(filters, query) {
    if (filters) {
        return query.where(filters);
    }
    return query;
}


module.exports = function (modelName, foreignKey) {
    return {
        findAll: function (req, res, next) {
            res.ormQuery = applyFilters(
                req.filters,
                req.db[modelName].find());
            next();
        },
        findOne: function (req, res, next) {
            res.ormQuery = applyFilters(
                req.filters,
                req.db[modelName].findOne(req.param('id')));
            next();
        },
        add: function (req, res, next) {
            console.log(req.body);

            res.ormQuery = req.db[modelName].create(req.body);
            next();
        },
        updateOne: function (req, res, next) {        	
            res.ormQuery = applyFilters(
                req.filters,
                req.db[modelName].update(req.param('id'), req.body));
            next();
        },
        removeOne: function (req, res, next) {
            res.ormQuery = applyFilters(
                req.filters,
                req.db[modelName].destroy(req.param('id')));
            
            next();
        }
    };
};


//TODO: make more complex query
module.exports.filters = function(foreignKey){
	return function (req, res, next) {
        if (foreignKey){
	    	req.filters = req.filters || {};
	    	var value = req.params[foreignKey];

	    	req.filters[foreignKey] = value;
            if (req.body){
                req.body[foreignKey] = value;    
            }
	    
    	}
        //console.log(req.body, req.params, foreignKey)
    	next();
	}
};


module.exports.exec = function (req, res, next) {
	var cb = function(err, result) {
    	if (err) {
            return next(err);
        }
        
        res.result = result;
        next();
    }
    res.ormQuery.exec(cb);
};



module.exports.returnJSON = function (req, res, next) {
    if (res.result == null) {
        return next('Result is not provided');
    }
    res.json(res.result);
};

