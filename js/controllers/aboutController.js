(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.tab-content').fadeOut();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
