(function(module) {
  //DECLARING REPOVIEW VARIABLE AS EMPTY ARRAY
  var repoView = {};
  // NEW TEMPLATE COMPILER- save the result of invoking Handlebars in this 'repoCompiler' variable that will be passed to append method
  var repoCompiler = Handlebars.compile($('#repo-template').text());
  var followersCompiler = Handlebars.compile($('#followers-template').text());

  repoView.renderRepos = function() {
    $('#about .repos').empty().append(
      reposObj.withTheAttribute('name')
      .map(repoCompiler)
    );
    $('#about .followers').empty().append(
       reposObj.followers.map(followersCompiler)
     );
  };
// CALLS THE FUNCTION THAT REQUESTS/LOADS MY REPO DATA- pass in some view function as a higher order callback, so our repos will render after the data is loaded. */
  reposObj.requestRepos(repoView.renderRepos);
  module.repoView = repoView;
})(window);
