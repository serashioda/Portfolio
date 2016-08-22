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

// ADD PROPERTIES USED BY TEMPLATE . EXCUTE LOGIC HERE SINCE TEMPLATE CAN'T HOLD JS LOGIC. ADD RESULT TO OBJECT AS NEW PROPERTY BY KEY IN TEMPLATE. //
Article.prototype.toHtml = function(scriptTemplateId) {
  var templateRender = Handlebars.compile($(scriptTemplateId).html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return templateRender(this);
};

// sorting article from newest
ourLocalData.sort(function(firstElement, secondElement) {
  return (new Date(secondElement.publishedOn)) - (new Date(firstElement.publishedOn));
});

//
ourLocalData.forEach(function(theCurrentArticleObject) {
  articles.push(new Article(theCurrentArticleObject));
});

//LOOPS THROUGH ARRAY OF ARTICLES AND APPENDS RESPECTIVE PROPERTY TO APPROPRIATE DOM ELEMENT
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
  $('#author-filter').append(a.authorFilterToHtml());
  $('#category-filter').append(a.categoryFilterToHtml());
});
