(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];
  reposObj.followers = [];
// create a githubToken.js file that we can use to generate our headers properly.
  //CALLBACK FUNCTION AFTER AJAX REQUEST FOR MY REPO DATA, CALLBACK IS CALLED WHEN LOAD IS COMPLETED
  $.when(
    $.get('https://api.github.com/users/codefellows-seattle-301d10/repos' +
          '?per_page=10' +
          '&sort=updatd')
          .done(function(data) {
            reposObj.allRepos = data;
          }),
    $.get('/github.'+
          '?per_page=10' +
          '&sort=updatd')
          .done(function(data) {
            reposObj.allRepos = data;
          })
         // NOTE: since the 'data' paramter comes back as an
         // array of objects, we can reassign allRepos below.
    ).done(callback);
  };

  reposObj.withTheAttribute = function(myAttr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;
})(window);
