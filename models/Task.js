var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'tasks',
    tableName : 'tasks',
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