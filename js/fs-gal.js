/**
 * Author: Tim Vervoort - info@timvervoort.com
 * Licence: Free for commercial use
 * Last update: 2nd May 2018 - v1.2.3
 */
var fs_gal_preloads = new Array();
$('document').ready(function() {

  // Set gallery to flex
  $('.fs-gal-view').css("display", "flex")
                   .hide();

  // Make gallery objects clickable
  $('.fs-gal').click(function() {
    fsGal_DisplayImage($(this));
  });

  // Preload the very first image
  preloadImage($('.fs-gal')[0].dataset.url);

  // Display gallery
  function fsGal_DisplayImage(obj) {

    // Clear navigation buttons
    $('.fs-gal-view > .fs-gal-prev').fadeOut();
    $('.fs-gal-view > .fs-gal-next').fadeOut();

    // Set current image
    title = obj.attr('title');
    alt = obj.attr('alt');
    imgElem = $('.fs-gal-main');
    imgElem.attr('title', title);
    imgElem.attr('alt', alt);
    imgElem.attr('src', obj.attr('data-url') ? obj.attr('data-url') : obj.attr('src'));
    $('.fs-gal-view > h1').text(title);
    if (!title || title == '') { $('.fs-gal-view > h1').fadeOut(); }
    else { $('.fs-gal-view > h1').fadeIn(); }

    // Create buttons	
	var gallery = $(obj).attr('data-gallery');
	var selector = gallery ? '.fs-gal[data-gallery="'+gallery+'"]' : '.fs-gal:not([data-gallery])';
    var current = $(selector).index(obj);
    var prev = current - 1;
    var next = current + 1;
    if (prev >= 0) {
      $('.fs-gal-view > .fs-gal-prev').attr('data-img-index', prev);
	  if(gallery)
			$('.fs-gal-view > .fs-gal-prev').attr('data-gallery',gallery);
		
      $('.fs-gal-view > .fs-gal-prev').fadeIn();
    }
	
	var length = gallery ? $('.fs-gal[data-gallery="'+gallery+'"]').length : $('.fs-gal:not([data-gallery])').length;
	
    if (next < length) {
      $('.fs-gal-view > .fs-gal-next').attr('data-img-index', next);
	  if(gallery)
		  $('.fs-gal-view > .fs-gal-next').attr('data-gallery',gallery);
	  else
		  $('.fs-gal-view > .fs-gal-next').removeAttr('data-gallery');
	  
      $('.fs-gal-view > .fs-gal-next').fadeIn();
    }
    $('.fs-gal-view').fadeIn(); // Display gallery
    if (current == length - 1)  { // Last image
        $('.fs-gal-view > .fs-gal-next').attr('data-img-index', 0);
		
		if(gallery)
			$('.fs-gal-view > .fs-gal-next').attr('data-gallery',gallery);
		else
			$('.fs-gal-view > .fs-gal-next').removeAttr('data-gallery');
		
    }
    else if (current == 0)  { // first image
        $('.fs-gal-view > .fs-gal-prev').attr('data-img-index', $('.fs-gal').length - 1);
		if(gallery)
			$('.fs-gal-view > .fs-gal-prev').attr('data-gallery',gallery);
		else
			$('.fs-gal-view > .fs-gal-prev').removeAttr('data-gallery');
		
    }
	
	
		if(length > 1)			
			$('.fs-gal-view > .fs-gal-next').fadeIn();
		else
			$('.fs-gal-view > .fs-gal-next').fadeOut();

    // preload next images
    preloadNextAndPrev(gallery);
    
  }

  // Preload next and previous image
  function preloadNextAndPrev(gallery) {
    fs_gal_preloads = new Array();
    // previous
    index = $('.fs-gal-view > .fs-gal-prev').attr('data-img-index');
    elem = gallery ? $($('.fs-gal[data-gallery="'+gallery+'"]').get(index)) : $($('.fs-gal:not([data-gallery])').get(index));
    img = elem.attr('data-url') ? elem.attr('data-url') : elem.attr('src');
	if(img)
		preloadImage(img);
    // next
    index = $('.fs-gal-view > .fs-gal-next').attr('data-img-index');
    elem = gallery ? $($('.fs-gal[data-gallery="'+gallery+'"]').get(index)) : $($('.fs-gal:not([data-gallery])').get(index));
    img = elem.attr('data-url') ? elem.attr('data-url') : elem.attr('src');
    if(img)
		preloadImage(img);
  }

  // Preload an image
  function preloadImage(source) {
    var preload = (new Image());
    preload.src = source
    fs_gal_preloads.push(preload);
  }

  // Gallery navigation
  $('.fs-gal-view .fs-gal-nav').click(function(e) {
    e.stopPropagation();
    var index = $(this).attr('data-img-index');	
    var gallery = $(this).attr('data-gallery');
    var img = gallery ? $($('.fs-gal[data-gallery="'+gallery+'"]').get(index)) :  $($('.fs-gal:not([data-gallery])').get(index));
    fsGal_DisplayImage(img);
  });

  // Close gallery
  $('.fs-gal-view').click(function(e) {
    $('.fs-gal-view').fadeOut();
  });
  $('.fs-gal-main').click(function(e) {
      e.stopPropagation();
  });

  // Keyboard navigation
  $('body').keydown(function(e) {
    if (e.keyCode == 37) {
      $('.fs-gal-view .fs-gal-prev').click(); // Left arrow
    }
    else if(e.keyCode == 39) { // right
      $('.fs-gal-view .fs-gal-next').click(); // Right arrow
    }
    else if(e.keyCode == 27) { // right
      $('.fs-gal-view .fs-gal-close').click(); // ESC
    }
  });

  $('.fs-gal-view').on('swipeleft', function() {
    $('.fs-gal-view .fs-gal-next').click(); // Next img
  });
  $('.fs-gal-view').on('swiperight', function() {
    $('.fs-gal-view .fs-gal-prev').click(); // Previous img
  });
  $('.fs-gal-view').on('swipedown', function() {
    $('.fs-gal-view .fs-gal-close').click(); // Close gallery
  });
  $('.fs-gal-view').on('swipeup', function() {
    $('.fs-gal-view .fs-gal-close').click(); // Close gallery
  });

});