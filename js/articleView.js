//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.render = function() {
  articles.forEach(function(a) {
    $('#articles').append(a.toHtml('#article-template'));
    $('#author-filter').append(a.toHtml('#author-filter-template'));
    if($('#category-filter option[value="' + a.category + '"]').length === 0) {
      $('#category-filter').append(a.toHtml('#category-filter-template'));
    };
  });
  // $('pre code').each(function(i, block) {
  //   hljs.highlightBlock(block);
  // });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      console.log($(this).val());
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('articles').fadeIn();
      $('article.template').hide();
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
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function () {
  console.log('into handleMainNav');
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

// articleView.populateFilters();
articleView.render();
articleView.handleCategoryFilter();
articleView.handleAuthorFilter();
articleView.handleMainNav();
articleView.setTeasers();
