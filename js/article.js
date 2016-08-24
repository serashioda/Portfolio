(function(module) {
  // DONE: Wrap the entire contents of this file in an IIFE.
  // Pass in to the IIFE a module, upon which objects can be attached for later access.

  function Article (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

Article.allArticles = [];

// ADD PROPERTIES USED BY TEMPLATE . EXCUTE LOGIC HERE SINCE TEMPLATE CAN'T HOLD JS LOGIC. ADD RESULT TO OBJECT AS NEW PROPERTY BY KEY IN TEMPLATE. //
Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return template(this);
  };

//FUNCTIONALITY TO LOAD ALL ARTICLES IN DECENDING ORDER OF PUBLICATION
Article.loadAll = function(inputData) {
  inputData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  }).map(function(ele) {
    return new Article(ele);
  });
};

// THIS ADDS FUNCTIONALITY TO RETRIEVE DATA FROM LOCAL OR REMOTE SOURCE, WHICH PROCESS AND HANDS OFF CONTROL TO THE VIEW ********
Arrticle.fetchAll = function(nextFunction) {
  if (localStorage.blogArticles) {
    $.ajax({
      type: 'HEAD',
      url: 'data/blogArticles.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (!localStorage.eTag || eTag !== localStorage.eTag) {
            Article.getAll(nextFunction); // DONE: pass 'nextFunction' into Article.getAll();
          } else {
            Article.loadAll(JSON.parse(localStorage.blogArticles));
            // DONE: Replace the following line with 'nextFunction' and invoke it!
            nextFunction();
          }
        }
      });

Article.getAll = function(nextFunction) {
  $.getJSON('data/blogArticles.json', function(responseData, message, xhr) {
    localStorage.eTag = xhr.getResponseHeader('eTag');
    Article.loadAll(responseData);
    localStorage.blogArticles = JSON.stringify(responseData);
    // DONE invoke our parameter.
    nextFunction();
  });
};
} else {
  Article.getAll(nextFunction);

Article.numWordsAll = function() {
  return Article.allArticles.map(function(currentArticle) {
    return currentArticle.body.match(/\w+/g).length;
    }).reduce(function(acc, cur) {
      return acc + cur;
    });
  };

Article.allAuthors = function() {
    //  returns a mapped collection
  var authorNames = Article.allArticles.map(function(currentArticle) {
    return currentArticle.author;
  }).reduce(function(authorUnique, currentAuthor, index, array) {
    if(authorUnique.indexOf(currentAuthor) === -1) {
      authorUnique.push(currentAuthor);
    }
    return authorUnique;
  }, []);
  return authorNames;
};

Article.numWordsByAuthor = function() {
  return Article.allAuthors().map(function(currentAuthor) {
    return {
      name: currentAuthor,
      numWords:
      Article.allArticles.filter(function(currentArticle) {
        return currentArticle.author === currentAuthor;
      }).map(function(currentArticle) {
        return currentArticle.body.match(/\w+/g).length;
      }).reduce(function(acc, cur) {
        return acc + cur;
      })
    };
  });
};

module.Article = Article;
})(window);
