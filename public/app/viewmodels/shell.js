define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: 'projects/:projectId/tasks/add', moduleId: 'viewmodels/AddTask', nav: true },
                { route: 'projects/:projectId/tasks/:taskId', moduleId: 'viewmodels/task', nav: true },
                { route: 'projects/:projectId/tasks', title:'Welcome', moduleId: 'viewmodels/tasks', nav: false },
                { route: ['','projects'], moduleId: 'viewmodels/projects', nav: true },
                { route: 'addProject', moduleId: 'viewmodels/addProject', nav: true },





            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});