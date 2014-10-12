var app = angular.module('FrankRoetker', ['ngSanitize']);

app.directive('story', function ($sanitize) {
    return {
        restrict: 'AE',
        templateUrl: "/javascripts/posts/story.html",
        link: function (scope, element, attrs) {
          if(attrs.markdown){
            scope.$watch(attrs.markdown, function (newVal) {
              var html = newVal ? $sanitize(newVal) : '';
              // console.log(attrs.markdown);
              console.log(html);
              element.html(html);
            });
          } else {
            var html = $sanitize(element.text());
            element.html(html);
          }
        },
        // controller: function($scope, $element, $attrs, $transclude) { 
        //   var html = $sanitize.trustAsHtml($element.text());
        //   // $element.html(html);
        //   $scope.body = html;
        // },
        // controllerAs: 'StoryTime',
        // transclude:true,
        scope: {
          title: "@title",
          date: "@date",
          author: "@author",
          subtitle: "@subtitle"
        }
    };

});

app.directive('markdown', function ($sanitize) {
    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
          if(attrs.markdown){
            scope.$watch(attrs.markdown, function (newVal) {
              var html = newVal ? $sanitize(newVal) : '';
              // console.log(attrs.markdown);
              // console.log(attrs.newVal);
              element.html(html);
            });
          } else {
            var html = $sanitize(element.text());
            element.html(html);
          }
        }
    };
});

app.controller('StoryTime', function($scope) { 

});