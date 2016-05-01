
var txClient = angular.module('txClient', ['ngRoute', 'angularFileUpload', 'ngWebSocket'])
txClient.config(["$routeProvider", function($routeProvider) {
        
    $routeProvider
            .when('/login', {templateUrl: 'app/client/routes/start.html'})
            .otherwise({templateUrl: 'app/client/routes/default.html'})
}])

txClient.service('userService', function() {
    var us = this ;
    us.username = 'robert.keith'
    us.password = 'password'
    us.title = 'Mr.'
    us.firstName = 'Robert'
    us.lastName = 'Keith'
})

txClient.directive("txLoginForm", function(){
    return {
        scope:{}
        , templateUrl : 'app/client/components/login_form.html'
        , controller : 'loginController'
        , controllerAs : 'ctrl'
    }
}).controller("loginController", ["$location","userService", function($location, userService){
        var lc = this;
        lc.userService = userService
        
        lc.login = function() {
            $location.path("/login")
        }
}])

txClient.directive("txWelcome", function() {
    return {
        scope : {}
        , templateUrl : 'app/client/components/welcome.html'
        , replace : true
        , controller : "welcomeController"
        , controllerAs : "ctrl"
    }
}).controller('welcomeController', ["userService", function(userService){
        var wc = this;
        wc.userService = userService
}])

txClient.directive("txIdentity", function() {
    return {
        scope : {}
        , templateUrl : 'app/client/components/identity.html'
        , controller : "identityController"
        , controllerAs: "ctrl"
    }
}).controller("identityController", ["$scope", "userService", "FileUploader", function($scope, userService, FileUploader){
        var ic = this;
        ic.userService = userService
        ic.uploader = new FileUploader()
        ic.poa = undefined
        ic.poaLabel = "Proof of Address"
        ic.signature = undefined
        ic.signatureLabel = "Signature specimen"
        ic.passport = undefined
        ic.passportLabel = "Passport"
        

        ic.uploader.onAfterAddingFile = function(item) {
            console.log(item)
            if(item.section === "PASSPORT") {
                ic.passport = item.file
                ic.passportLabel = item.file.name
            }else if(item.section === "POA") {
                ic.poa = item.file
                ic.poaLabel = item.file.name
            }else if(item.section === "SIGNATURE"){
                ic.signature = item.file
                ic.signatureLabel = item.file.name
            }
            console.log(ic)
        }
}])

txClient.controller('inboxController', ["$scope", function($scope){
    var ic = this;
    ic.events = []
    $scope.count = 0
    ic.dataStream = new EventSource("rest/events/documents")
    ic.dataStream.addEventListener('open', function(e){ console.log(e)}, false)
    ic.dataStream.addEventListener('message',function(msg){
        console.log(msg.data + ic.events.length)
        ic.events.push(JSON.parse(msg.data))
        $scope.count = ic.events.length
    }, false)    
    
}])