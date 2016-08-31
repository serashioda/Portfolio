(function(module) {

  var articleController = {};

  articleController.reveal = function() {
    $('.tab-content').fadeOut();
    $('#filters').fadeIn();
    $('#articles').fadeIn();

    // Invoke the retrieval process for our data!
    Article.fetchAll(articleView.renderIndexPage);
  };

  module.articleController = articleController;

})(window);
