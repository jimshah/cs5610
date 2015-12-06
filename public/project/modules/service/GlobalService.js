/*app.service('global', function($cookieStore, $location, $filter) {
    var globalService = {};
    globalService.user = null;
    globalService.isAuth = function (){
        if (globalService.user == null) {
            globalService.user = $cookieStore.get('user');
        }
        return (globalService.user != null);
    };
    globalService.setUser = function(newUser) {
        globalService.user = newUser;
        if (globalService.user == null) $cookieStore.remove('user');
        else $cookieStore.put('user', globalService.user);
    };
    globalService.getUser = function() {
        return globalService.user;
    };
    return globalService;
});*/


(function(){
    'use strict';

    // Users service used for communicating with the users REST endpoint
    angular.module(app.applicationModuleName).service('GlobalService', ['$cookies', '$cookieStore', '$rootScope', GlobalService]);

    //UserService  function
    function GlobalService ($cookies, $cookieStore, $rootScope){

        var globalService = {};
        globalService.user = null;
        globalService.isAuth = function (){
            if (globalService.token == null) {
                globalService.token = $cookieStore.get('token');
            }
            return (globalService.token != null);
        };
        globalService.setUser = function(token) {
            globalService.token = token;
            if (globalService.token == null) $cookieStore.remove('token');
            else $cookieStore.put('token', globalService.token);
             // $cookieStore.put('token', globalService.token);
        };
        globalService.getUser = function() {
            return globalService.token;
        };
        return globalService;     
    };

})();