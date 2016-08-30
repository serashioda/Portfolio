(function(module) {
  var articleController = {};

  articleController.reveal = function() {
    $('.tab-content').fadeOut();
    $('#filters').fadeIn();
    $('#articles').fadeIn();
  };

  module.articleController = articleController;
})(window);
