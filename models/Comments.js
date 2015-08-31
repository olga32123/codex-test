var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'comments',
    tableName : 'comments',
    connection: 'mysql',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: 'Text'
        },
        message: {
            type: 'text',
            required: true
        },
        taskId: {
            model: 'tasks',
            required: true
        }
    }
});