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
  /* TODO: DONE- Now use jQuery t fill in the rest of the current template
  clone with properties from this particular Article instance.
  We need to fill in:
  1. author name,
  2. author url,
  3. article title,
  4. article body, and */

  var $newArticle = $('article.template').clone();
  console.log($newArticle);
  // article category
  $newArticle.attr('data-category', this.category);
  // article author
  $newArticle.attr('data-author', this.author);
  // article title
  $newArticle.find('h1').text(this.title);
  // article author
  $newArticle.find('.byline a').text(this.author);
  // article auth url
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  // article body
  $newArticle.find('.article-body').html(this.body);
  // publication date
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
  // display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');


// removing class from this cloned article before rending current article to the DOM (b/c it is no longer a template)s
  $newArticle.removeClass('template');
  return $newArticle;
};

// sorting article from newest
ourLocalData.sort(function(firstElement, secondElement) {
  return (new Date(secondElement.publishedOn)) - (new Date(firstElement.publishedOn));
});

//
ourLocalData.forEach(function(theCurrentArticleObject) {
  articles.push(new Article(theCurrentArticleObject));
});

// append each article to HTML
articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});
