(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];
// TODO: DONE - create a githubToken.js file that we can use to generate our headers
         // properly.
  //CALLBACK FUNCTION AFTER AJAX REQUEST FOR MY REPO DATA, CALLBACK IS CALLED WHEN LOAD IS COMPLETED
  reposObj.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/serashioda/repos' +
           '?per_page=5' +
           '&sort=updated',
      type: 'GET',
      headers: {'Authorization': 'token ' + token},
      success: function(data) {
        reposObj.allRepos = data;
        callback();
      }
    });
  };

  reposObj.withTheAttribute = function(myAttr) {
    return reposObj.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;
})(window);
