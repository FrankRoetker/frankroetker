var fs = require('fs')
  , Showdown = require('showdown')
  , matter = require('gray-matter');

module.exports = function(app){


  function readPost(post, callback){
    fs.readFile('./public/posts/'+post, 'utf8', callback);
  }

  app.get('/', function(req, res){
    res.render('index',{
      title: 'Frank Roetker'
    });
  });

  app.param('post', /\w+/g);

  app.get('/blog/:post', function(req, res, next){
    readPost("2014-09-10_Test-Post.md", function(err, data){
      var converter = new Showdown.converter()
        , file = matter(data);

      if(!!err){
        console.log(data);
        res.redirect('/');
        return;
      } 
      res.render('story', {
        title: 'Test',
        posts: [{
          title: file.data.title,
          subtitle: file.data.subtitle,
          author: file.data.author,
          imageUrl: file.data.image,
          body: converter.makeHtml(file.content)
        }]
      });
    });
  });

  app.get('/blog/test', function(req, res, next){
    readPost("2014-09-10_Test-Post.md", function(err, data){
      var converter = new Showdown.converter()
        , file = matter(data);

      if(!!err){
        console.log(data);
        res.redirect('/');
        return;
      } 
      res.render('story', {
        title: 'Test',
        posts: [{
          title: file.data.title,
          subtitle: file.data.subtitle,
          author: file.data.author,
          imageUrl: file.data.image,
          body: converter.makeHtml(file.content)
        }]
      });
    });
  });
}