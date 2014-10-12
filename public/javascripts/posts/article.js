var app = angular.module('post', []);

app.directive('article', function () {
    return {
        restrict: 'A',
        templateUrl: "/javascripts/posts/article.html",
        link: function (scope, element, attrs) {
            
        }
    };

});