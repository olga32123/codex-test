requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal':'../bower_components/durandal/js',
        'plugins' : '../bower_components/durandal/js/plugins',
        'transitions' : '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'jquery': '../bower_components/jquery/jquery',
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
       },
        'chosen': {
            deps: ['jquery']
       }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'knockout'],  function (system, app, viewLocator, ko) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Codex task';
    ko.bindingHandlers.chosen = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext){
        var $element = $(element);
        var options = ko.unwrap(valueAccessor());
        
        if (typeof options === 'object')
            $element.chosen(options);
                
        ['options', 'selectedOptions'].forEach(function(propName){
            if (allBindings.has(propName)){
                var prop = allBindings.get(propName);
                if (ko.isObservable(prop)){
                    prop.subscribe(function(){
                        $element.trigger('chosen:updated');
                    });
                }
            }
        });   
    }
}
    app.configurePlugins({
        router:true,
        dialog: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});