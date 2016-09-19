var articles = [];

function Article (opts) {
  // TODO: DONE- Use the js object passed in to complete this constructor function:
  // Save all the properties of 'opts' into 'this'
  this.author = opts.author;
  this.title = opts.title;
  this.category = opts.category;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
  this.authorUrl = opts.authorUrl;
}

// USING JQUERY TO TO FILL IN TEMPLATE CLONE WITH PROPERTIES FROM THE PARTICULAR ARTICLE INSTANCE
Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');

  $newArticle.attr('data-category', this.category);
  // TODO: Use jQuery to also add the author name as a data-attribute of the newly cloned article.
  //       Doing so will allow us to use selectors to target articles, based on who wrote them.

  $newArticle.find('.byline a').text(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1:first').text(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  $newArticle.find('time').text('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  return $newArticle;
};

// sorting article from newest
ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});
//
ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});

// append each article to HTML
articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
