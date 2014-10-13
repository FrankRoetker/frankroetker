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
  $scope.getPicture = function(post){
    // return "background:url('http://upload.wikimedia.org/wikipedia/commons/8/8f/Toaster.jpg')";
    if(!!post.data.image){
      return "background:url('" + post.data.image + "')";
    } else if(!!post.data.color){
      return "background:" + post.data.color;
    } else {
      return "background:" + colors[Math.floor(Math.random()*colors.length)];;
    }
  }

  $scope.formatDate = function(post){
    var date = new Date(post.data.date)
      , curr_date = date.getDate()
      , curr_month = date.getMonth()
      , curr_year = date.getFullYear();
    return curr_date + " " + m_names[curr_month] + " " + curr_year
  }

  var m_names = new Array("January", "February", "March", 
"April", "May", "June", "July", "August", "September", 
"October", "November", "December");

  var colors = 
["#D24D57","#F22613","#FF0000","#D91E18","#96281B","#EF4836","#D64541",
 "#C0392B","#CF000F","#E74C3C","#DB0A5B","#FFECDB","#F64747","#F1A9A0",
 "#D2527F","#E08283","#F62459","#E26A6A","#DCC6E0","#663399","#674172",
 "#AEA8D3","#913D88","#9A12B3","#BF55EC","#BE90D4","#8E44AD","#9B59B6",
 "#446CB3","#E4F1FE","#4183D7","#59ABE3","#81CFE0","#52B3D9","#C5EFF7",
 "#22A7F0","#3498DB","#2C3E50","#19B5FE","#336E7B","#22313F","#6BB9F0",
 "#1E8BC3","#3A539B","#34495E","#67809F","#2574A9","#1F3A93","#89C4F4",
 "#4B77BE","#5C97BF","#4ECDC4","#A2DED0","#87D37C","#90C695","#26A65B",
 "#03C9A9","#68C3A3","#65C6BB","#1BBC9B","#1BA39C","#66CC99","#36D7B7",
 "#C8F7C5","#86E2D5","#2ECC71","#16A085","#3FC380","#019875","#03A678",
 "#4DAF7C","#2ABB9B","#00B16A","#1E824C","#049372","#26C281","#F5D76E",
 "#F7CA18","#F4D03F","#FDE3A7","#F89406","#EB9532","#E87E04","#F4B350",
 "#F2784B","#EB974E","#F5AB35","#D35400","#F39C12","#F9690E","#F9BF3B",
 "#F27935","#E67E22","#ECECEC","#6C7A89","#D2D7D3","#EEEEEE","#BDC3C7",
 "#ECF0F1","#95A5A6","#DADFE1","#ABB7B7","#F2F1EF","#BFBFBF"];

  $scope.goToPost = function(post){
    return "/blog/" + post.name;
  }

});