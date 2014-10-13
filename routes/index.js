var fs = require('fs')
  , cfg = require('../config.js')
  , Showdown = require('showdown')
  , matter = require('gray-matter')
  , redis = require('redis')
  , client = redis.createClient()
  , rest = require('restler')
  , showdown = new Showdown.converter();

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = function(app){

  function readPost(post, callback){
    fs.readFile('./public/posts/'+post, 'utf8', callback);
  }

  app.get('/', function(req, res){
    res.render('index',{
      title: 'Frank Roetker'
    });
  });

  app.get('/card', function(req, res){
    res.render('card', {
      title: "Frank Roetker"
    });
  });

  app.get('/blog', function(req, res){
    getAllFileData(function(posts){
      getTop10Posts(posts, function(posts){
        res.render('blog', {
          title: 'Frank Roetker',
          posts: posts
        });
      });
    });
  });

  // app.param('post', /\w+/g);

  app.get('/blog/:post', function(req, res, next){
    client.HVALS(req.params.post, function(err, results){
      console.log(results);
      res.render('story', {
        title: results[0].title,
        posts: [{
          data: JSON.parse(results[1]),
          name: results[0],
          content: showdown.makeHtml(results[2])
        }]
      });
    });
  });

  function getPosts(callback){
    client.SMEMBERS('posts', callback);
  }

  function getAllFileData(callback){
    client.sort("posts", "by", "nosort", 
      "get", "*->data", 
      "get", "*->content", 
      "get", "*->name",
      function(err, results){
        if(!!err){
          console.log(err);
          return;
        }
        var vals = [];
        for(var i = 0; i < results.length; i+=3){
          vals.push({
            data: JSON.parse(results[i]),
            content: showdown.makeHtml(results[i+1]),
            name: results[i+2]
          });
        }
        callback(vals);
      });
  }

  function restrictKey(posts, key, callback){
    callback(posts.filter(function(e){
      return e.data.keys.indexOf(key) >= 0;
    }));
  }

  function getTop10Posts(posts, callback){
    posts.sort(function(a, b){
      if (a.data.date < b.data.date)
        return 1;
      if (a.data.date > b.data.date)
        return -1;
      return 0;
    });
    callback(posts.slice(0, 10));
  }

  function searchPosts(restriction, callback){
    getPosts(function(err, posts){
      if(!!err){
        console.log(err);
        return;
      }

    });
  }

  function addOrUpdate(deets){
    rest.get(cfg.posts.raw + deets.path).on('complete', function(result){
      if(result instanceof Error){
        console.log("Error", result.message);
        this.retry(5000);
      } else{
        var data = matter(result);
        client.SADD('posts', deets.name);
        client.HMSET(deets.name, {
          data: JSON.stringify(data.data),
          content: data.content,
          name: deets.name
        });
      }
    });
  }

  function readPosts(){
    // return;

    rest.get(cfg.posts.dir).on('complete', function(result) {
      if (result instanceof Error) {
        console.log('Error:', result.message);
        this.retry(5000); // try again after 5 sec
      } else {
        result.forEach(function(item){
          addOrUpdate(item);
        });
      }
    });
  }; readPosts()

  setInterval(readPosts, 86400000);
}