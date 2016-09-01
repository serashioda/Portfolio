(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];
  reposObj.followers = [];
  //CALLBACK FUNCTION AFTER AJAX REQUEST FOR MY REPO DATA, CALLBACK IS CALLED WHEN LOAD IS COMPLETED
  $.when(
    $.get('/github/users/serashioda/repos' +
          '?per_page=10' +
          '&sort=updatd')
          .done(function(data) {
            reposObj.allRepos = data;
          }),
    $.get('/github/users/serashioda/followers'+
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
