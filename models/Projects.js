var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'projects',
    tableName : 'projects',
    connection: 'mysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        title : {
            type: 'string'
        },
        text: {
            type: 'text',
            required: true
        }
    }
});