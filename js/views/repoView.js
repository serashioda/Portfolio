(function(module) {
  //DECLARING REPOVIEW VARIABLE AS EMPTY ARRAY
  var repoView = {};
  // NEW TEMPLATE COMPILER- save the result of invoking Handlebars in this 'repoCompiler' variable that will be passed to append method
  var repoCompiler = Handlebars.compile($('#repo-template').text());  // Finish the Handlebars method here!

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      reposObj.withTheAttribute('name')
      .map(repoCompiler)
    );
  };
// CALLS THE FUNCTION THAT REQUESTS/LOADS MY REPO DATA
    Pass in some view function as a higher order callback, so our repos
    will render after the data is loaded. */
  reposObj.requestRepos(repoView.renderRepos);
  module.repoView = repoView;
})(window);
