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

Article.allArticles = [];

// ADD PROPERTIES USED BY TEMPLATE . EXCUTE LOGIC HERE SINCE TEMPLATE CAN'T HOLD JS LOGIC. ADD RESULT TO OBJECT AS NEW PROPERTY BY KEY IN TEMPLATE. //
Article.prototype.toHtml = function(scriptTemplateId) {
  var templateRender = Handlebars.compile($(scriptTemplateId).html());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return templateRender(this);
};

// THIS ADDS FUNCTIONALITY TO RETRIEVE DATA FROM LOCAL OR REMOTE SOURCE, WHICH PROCESS AND HANDS OFF CONTROL TO THE VIEW
Article.fetchAll = function() {

  if (localStorage.hackerIpsum) {
    Article.loadAll(JSON.parse(localStorage.hackerIpsum));
    articleView.renderIndexPage();
  } else {
    $.getJSON('data/hackerIpsum.json', function(data, status, XHR) {
      localStorage.hackerIpsum = JSON.stringify(data);
      console.log(data);
      Article.loadAll(data);
      articleView.renderIndexPage();
    });
  };
};
