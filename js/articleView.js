//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());

      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();

    } else {
      $('articles').fadeIn();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());

      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();

    } else {
      $('articles').fadeIn();
    }
    $('#author-filter').val('');
  });
};



articleView.handleMainNav = function () {
  console.log('into handleMainNav');
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
    // $('main').find('#' + $id).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').click(function(event){
    event.preventDefault();
    $(this).parent().find('*').show();
    $(this).hide();
  });

};

articleView.populateFilters();
articleView.handleMainNav();
articleView.handleAuthorFilter();
articleView.handleCategoryFilter();
articleView.setTeasers();
