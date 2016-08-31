// CREATING PULL REQUEST FOR SELF-REVIEW/ CLASS_9 PORTFOLIO ASSIGNMENT
/* TODO:
OVERALL:
1) MAKE SURE FOLDERS/FILES ARE ORGANIZED LOGICALLY.
2) MAKE SURE ALL FILES ARE LINKED PROPERLY AND LISTED IN RIGHT ORDER.
ARTICLE.JS:
1) I NEED TO SEE IF THERE ARE OTHER WAYS TO USE HANDLEBARS  AND IF I AM EFFICIENTLY USING THIS AS POSSIBLE TO MAKE MY CODE EFFICIENTLY
2) I NEED TO UPDATE .PUBLISHEDON TO APPLY MORE TO MY PORTFOLIO--> IE. DISPLAY COMPLETION DATE FOR EACH PROJECT IN DECENDING ORDER
3) ADD MORE COMMENTS SO I CAN LOGICALLY FOLLOW/APPRECIATE MY CODE AND ALL FOLDERS/FILES, SO I CAN TRULY APPRECIATE HOW THEY ARE DYNAMICALLY WORKING TOGETHER
4) GET RID OF ANY GHOST CODE, REFACTOR WHERE POSSIBLE*/

// WRAP ENTIRE CONTENTS OF THIS FILE IN AN IIFE. PASS IN MODULE TO IFFE (which objects can be attached for later access)
(function(module) {
  function Article (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }

//ALL ARTICLES ARRAY
  Article.allArticles = [];

// ADD PROPERTIES USED BY TEMPLATE. EXCUTE LOGIC HERE SINCE TEMPLATE CAN'T HOLD JS LOGIC. ADD RESULT TO OBJECT AS NEW PROPERTY BY KEY IN TEMPLATE.
  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    var minuteRead = Math.floor(Article.getNumWords(this) / 200);   // calculate article read time using average reader speed (200wpm)
    this.readLength = (minuteRead <= 1) ? '1 minute' : minuteRead + ' minutes';
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return template(this);
  };

//FUNCTIONALITY TO LOAD ALL ARTICLES IN DECENDING ORDER OF PUBLICATION
  Article.loadAll = function(inputData) {
    var articles = inputData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Article(ele);
    });
    Article.allArticles = articles;
  };

// THIS ADDS FUNCTIONALITY TO RETRIEVE DATA FROM LOCAL OR REMOTE SOURCE, WHICH PROCESS AND HANDS OFF CONTROL TO THE VIEW ********
  Article.fetchAll = function(nextFunction) {
    //if (localStorage.blogArticles) {
    $.ajax({
      type: 'HEAD',
      url: 'data/blogArticles.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (!localStorage.eTag || eTag !== localStorage.eTag) {
          Article.getAll(nextFunction); // DONE: pass 'nextFunction' into Article.getAll();
        } else {
          Article.loadAll(JSON.parse(localStorage.blogArticles));
          // Replace the following line with 'nextFunction' and invoke.
          nextFunction();
        }
      }
    });
  };

  Article.getAll = function(nextFunction) {
    $.getJSON('data/blogArticles.json', function(responseData, message, xhr) {
      localStorage.eTag = xhr.getResponseHeader('eTag');
      Article.loadAll(responseData);
      localStorage.blogArticles = JSON.stringify(responseData);
      // Invoke our parameter.
      nextFunction();
    });
  };

  // GETS # OF WORDS IN GIVEN ARTICLE
  Article.getNumWords = function(article) {
    return article.body.split(' ').length;
  };

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
