//Function for scroll banner
if($('[data-scroll="top-banner"]').length>=1){ 
  setTimeout(function(){
   $('html, body').animate({scrollTop: $('[data-scroll="top-banner"]').offset().top+250}, 600);
  },200);
};

$(window).resize(function(){
	fullHeight();
}).resize();

function fullHeight(){
	var excludeHeight = $('header').height() + $('footer').height()-1;
	$('[data-height="fullheight"]').css({minHeight : $(window).height() - excludeHeight});
}


$(document).on('focusin','#PostContent', function(){
	$(this).addClass("focus");
	$(this).parents(".wall-post-box").addClass("open")
	$('.post-content-block').fadeIn();
	$('.upload-media, .about-media').fadeIn();
	
});
$(document).on('focusout','#PostContent', function(){
	var value = $(this).val();
	if(value == ''){
		$('.post-content-block').slideUp();
	}
	else{
		$('.post-content-block').fadeIn();
	}
});

//Image center
/*function imageCenter(){
  $('.thumb-image > img').each(function(){
    var eachimgwd = $(this).width(),
      parentWd = $(this).parent().width(),
      totlawd = eachimgwd - parentWd,
      addedwd = totlawd/2;
      $(this).css({'margin-left':-addedwd});
  });
}*/

//Uer Navigation
function userDropdown(){
	$('[data-toggle="userDropdown"] .navbar-toggle').click(function(e){
		if(!$(this).closest('.navbar-user').hasClass('active')){
			$(this).closest('.navbar-user').addClass('active');
		} else {
			$(this).closest('.navbar-user').removeClass('active');
		}
		e.stopPropagation();
	});
	$(document.body).click(function() {
		$('[data-toggle="userDropdown"]').removeClass('active');
	});
}

//Global Search
function advanceSearch(){
	$('[data-toggle="advanceSearch"]').bind('click', function(){
		if(!$('.advance-search').hasClass('open')){
			$(this).addClass('active');
			$('header').addClass('open-search');
			$('.advance-search').addClass('open').find('.form-control').focus();
			setTimeout(function(){
			  $('.advance-search > .search-action').css({overflow:'visible'});
			},300);
		}else {
			$(this).removeClass('active');
			$('.advance-search').removeClass('open');
			$('header').removeClass('open-search');		
			$('.advance-search > .search-action').css({overflow:''});
		}

	});
}

/*notification tab on header*/
function notificationTabFn(){
	$('#notificationTab a').each(function() {
		var $this = $(this);
		$this.click(function (e) {
			e.preventDefault();
			$this.tab('show');
		});
	});
}

//Dropdown onhold Function
$(function () {
	$('[data-dropdown="onhold"]').on('click touchstart', function(e) {
		e.stopPropagation();
	});
});

/*Navigation active*/
function mainNav(index){
 var allLinks=$('#navbar ul > li > a');
 allLinks.removeClass('active');
 $(allLinks[index-1]).addClass('active');
}

/*Navigation active*/
function secondaryNav(index){
 var allLinks=$('.small-screen-tabs > li');
 allLinks.removeClass('active');
 $(allLinks[index-1]).addClass('active');
}

/*function subNav(index){
 var allLinks=$('.sub-nav>.nav>li>');
 allLinks.removeClass('active');
 $(allLinks[index-1]).addClass('active');
}*/


/*Header Sticky*/
$(window).scroll(function(){
	var WindowTop = $(window).scrollTop();
    var DivTop = $('header').offset().top;
    if (WindowTop > DivTop) {
        $('header [data-role="sticky"]').addClass('navbar-fixed-top');
    } else {
        $('header [data-role="sticky"]').removeClass('navbar-fixed-top');
    }
}).scroll();

/*Background Image Sticky*/
if($('body').find('[data-role="bg-fixed"]').length>=1){ 
  $(window).scroll(function(){
    var WindowTop = $(window).scrollTop();  
      var DivTop = $('[data-role="bg-fixed"]').offset().top-60;
      if (WindowTop > DivTop) {
          $('[data-role="bg-fixed"]').addClass('bg-fixed');
      } else {
          $('[data-role="bg-fixed"]').removeClass('bg-fixed');
      }
  }).scroll();
};



/*Right Sidebar Sticky*/
$('[data-role="sidebar-sticky"] .sidebar-panel').each(function() {
  var that = $(this);
  $(window).scroll(function(){
    var sidebarTop = $('[data-role="content-block"]').offset().top - 90;
    var height = that.height();
    var winHeight = $(window).height();
    var footerTop = $('.footer').offset().top - $('[data-role="bottom-ads"]').height();
    var scrollTop = $(window).scrollTop();
    if (scrollTop > sidebarTop && $('[data-role="content-block"]').height() > height) {
      that.addClass('sidebar-fixed').css('top', '');
      if (scrollTop + winHeight >= footerTop && height > winHeight - 300){
        that.css('top', footerTop - height - scrollTop + 'px');
      }
    } else {
      that.removeClass('sidebar-fixed').css('top', '');
    }
  });
});

/*Back to top*/
function backToTop(){
	$('.backto-top').on('click', function(){
		$('html, body').animate({scrollTop: $('body').offset().top}, 800);
	});
}

/*Dropdown Value*/
function dropdownTextInit(){  
	$(".dropdown-slected li a").click(function(){
	  $(this).parents(".dropdown").find('.showText').html($(this).text() + ' <span class="caret"></span>');
	  $(this).parents(".dropdown").find('.showText').val($(this).data('value'));
	});
};

/*modal scroll issue on touch device*/
/*if (Modernizr.touch) {
  $('.modal').on('show.bs.modal', function() {
	$('body, html').css({height:'100%', position:'relative', overflow:'hidden'});
	$('.modal').css({position:'absolute'});
  });
  $('.modal').on('hidden.bs.modal', function() {
	setTimeout(function(){
	  $('body, html').css({height:'', position:'', overflow:''});
	  $('.modal').css({position:''});
	},0);
  });
}*/

/* center modal */
(function ($) {
  "use strict";
  function centerModal() {
      $(this).css('display', 'block');
      var $dialog  = $(this).find(".modal-dialog"),
      offset       = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css('marginBottom'), 10);
    
      if(offset < bottomMargin) offset = bottomMargin;
      $dialog.css("margin-top", offset);
  }

  $(document).on('show.bs.modal', '.modal', centerModal);
  $(window).on("resize", function () {
      $('.modal:visible').each(centerModal);
  });
}(jQuery));



/*Flip Animation Start*/
function flipAnimation(){
	if($('div').hasClass('flip-animation')){
	  $.support.css3d = supportsCSS3D();
	  var flipContainer = $('.flipContainer');
	  $('.flipLink').click(function(e){
		var flipRel = $(this).attr('data-rel');
		flipContainer.find('.flip-panel').removeClass('flipShow').addClass('flipHide');
		$('#' + flipRel).addClass('flipShow').removeClass('flipHide');
		if(!$.support.css3d && navigator.appVersion.indexOf("MSIE 9.")!=-1){
			flipContainer.find('.flip-panel').hide();
			$('#' + flipRel).fadeIn();
		}
		e.preventDefault();
	  });
	}
}
function supportsCSS3D() {
  var props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective'], testDom = document.createElement('a');
  for(var i=0; i<props.length; i++){
	if(props[i] in testDom.style){
		return true;
	}
  }
  return false;
}
/*Flip Animation End*/

/* Message Start*/
function messageColresize (){

if($(window).width() >= 700 ){

	var winHt = $(window).height(),
		divideht = 200,
		totalHt = winHt - divideht;

		$('.message-left').height(totalHt);
		var mszLeftht = $('.message-left').height() - 112;
		$('.m-left-scroll').height(mszLeftht);
		var mszLeftht = $('.m-left-scroll').height() + 52,
			replyBlockht = $('.m-write-reply').innerHeight(),
			mszCoverHt = mszLeftht - replyBlockht; 

		$('.m-conversation-block').height(mszCoverHt);
		var lefColheight = $('.message-left').height();
		var newsectionHt  = lefColheight - replyBlockht;

		$('.message-right').height(newsectionHt);
		$('.message-right').css({'padding-bottom' : replyBlockht});
	}
}


$(function(){
	messageColresize();
	$('#sendMszto').on('keyup',function(){
		$(this).next('.m-message-to-list').fadeIn();
	});
	$(document).on('mouseup',function(){
		 $('.m-message-to-list').hide();
	});  
});

messageBlock();
//attachedmediaWd();
//Message samll view

function messageBlock() { 
    if ($(window).width() <= 767) {
        $(document).on('click', '.m-user-listing > li', function () {
            $('.message-left').addClass('hidden-xs');
            $('.message-right').removeClass('hidden-xs');
            $('.m-conversation-content, .m-add-people-button').show();
            //$('.newcomposemail-wrap').hide(); 
        });

        $('#backTolist').on('click', function () {
            $('.message-left').removeClass('hidden-xs');
            $('.message-right').addClass('hidden-xs');
           // $('.message-info').hide();
            //$('.newcomposemail-wrap').show();
        });

        $(document).on('touchstart click', '#newMessage', function () {

			$('.m-new-message').show();
			$('.m-conversation-content, .m-add-people-button').hide(); 

            $('.message-left').addClass('hidden-xs');
            $('.message-right').removeClass('hidden-xs');
        });

    } 
}

//Attached list 

/*function attachedmediaWd() {

	var totalLiof = $('.m-media-attached-list > ul > li').size(),
		totalulWd = totalLiof*108; 
	   $('.m-media-attached-list > ul').width(totalulWd);
}*/
/* Message End*/

//Tab drop down for small screens
function tabDropdowns(){        
    //alert(0);
        $(document).on('click','.tab-dropdowns', function(e) {
            if($(this).hasClass('open-dropdown')){
                    $(this).removeClass('open-dropdown');
                    $(this).next('.small-screen-tabs').addClass('hidden-xs');
                } else {
                    $(this).addClass('open-dropdown');
                    $(this).next('.small-screen-tabs').removeClass('hidden-xs');
                    }
            $('.small-screen-tabs li > a').click(function(e) {
                    $(this).parents('.small-screen-tabs').addClass('hidden-xs');
                    $(".tab-dropdowns").removeClass('open-dropdown');
                    
                    var text = $(this).text();
                    $("#"+$(this).data('connect')+" a span").text(text);
            });
        });
  $(function(){

    var smallScr = $('.small-screen-tabs').prev('.tab-dropdowns').find('span');
        smallScr.text('');
    var selectText = $('.small-screen-tabs > li.active > a');
        selectText.each(function(index, el) {
            var eachText = $(this).text(); 
             $(this).parents('.small-screen-tabs').prev('.tab-dropdowns').find('span').text(eachText);
        });
        
    });

    if ($(window).width() <= 767) {
        $('.dropdown-toggle').on('touchstart click', function(e) {
            $('.small-screen-tabs').addClass('hidden-xs');
            $(".tab-dropdowns").removeClass('open-dropdown');
        });
        $(document).on('touchstart click', function(e) {
                if ($(e.target).closest('.small-screen-tabs, .tab-dropdowns').length === 0) {
                    $('.small-screen-tabs').addClass('hidden-xs');
                    $(".tab-dropdowns").removeClass('open-dropdown');
                }
        });
    }
}

//Fn for wall
function wallCtrl(){
  $('.wall-ctrl > a').click(function(e){
    if($(this).next('.actions').hasClass('in')){
      $(this).next('.actions').removeClass('in');
      $(this).removeClass('hide');
    } else { 
     $(this).next('.actions').addClass('in');
     $(this).addClass('hide');
    }
    e.stopPropagation();
  });
  $(document.body).click(function() {
    $('.wall-ctrl > .actions').removeClass('in');
    $('.wall-ctrl > a').removeClass('hide');
  });
}

// Hover on mobile
/*function listingHover(){
$('.listing-view > li').bind('click', function(e) {             
  e.preventDefault();
  $('.listing-view > li').removeClass('hover_effect')  
  $(this).addClass('hover_effect'); 
});
$(document.body).click(function() {
    $('.listing-view > li').removeClass('hover_effect')
  });
}*/

function iconToggle(){
   $(document).on('click', '.custom-icondrop .dropdown-withicons > li a' ,function(){
   var i = $(this).find('i').attr('class');
   $(this).parents('.dropdown-withicons').siblings('.drop-icon').find('i').removeAttr('class');
   $(this).parents('.dropdown-withicons').siblings('.drop-icon').find('i').addClass(i);
  })
}


/*--------- Window Resize Function -----------*/
$(window).resize(function () {
     //imageCenter();     
     messageColresize (); 
    $('.bg-wall').css({height:$(window).height(), width:$(window).width()})
  }).resize();

/*--------- Document Ready Function -----------*/
$(document).ready(function(){	
    //imageCenter();  
    userDropdown(); 
    advanceSearch();
    notificationTabFn();
    backToTop();
   	dropdownTextInit();
    $('[data-toggle="tooltip"]').tooltip(
	{container: 'body'}
	);
    $(".mCustomScrollbar").mCustomScrollbar({theme:"minimal-dark"});
    flipAnimation();
    tabDropdowns();
    wallCtrl();
    //listingHover();
    iconToggle(); 
});

//Menu ClassToggle
$(document).ready(function(e) {
	$(".navbar-toggle:not('button.navbar-toggle.visible-xs')").click(function(){
		$("body").toggleClass("menuOpen");
	});    
});

jQuery('.navbar-default img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');

});

// Height

//FOR SLIDER and slider with thumbnail

$(document).ready(function(){
  $('#flexslider1').flexslider({
    animation: "slide",
    directionNav: false, 
	start: function(slider){
		flexslider = slider;
		}   
  });

});


$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexslider2').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel2",
	directionNav: false,
	start: function(slider){
		flexslider = slider;
		}
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
	  flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  
  $window.load(function() {
    $('#carousel2').flexslider({
      animation: "slide",
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
      asNavFor: '#flexslider2',
	  minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
	  directionNav: false,
		start: function(slider){
		flexslider = slider;
		}
    });
  });
  // check grid size on resize event
    $window.resize(function() {
    	var gridSize = getGridSize();	
    	flexslider.vars.minItems = gridSize;
    	flexslider.vars.maxItems = gridSize;
		$("body").mouseup();
    });
	$(window).on('orientationchange', function() {
		 var gridSize = getGridSize();
		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());
$(window).on('orientationchange', function() {
	$("body").click();
});
$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexslider3').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel3",
	directionNav: false,
	start: function(slider){
		flexslider = slider;
		}
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
    flexslider;
	  flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  $window.load(function() {
    $('#carousel3').flexslider({
      animation: "slide",
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
	  minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
      asNavFor: '#flexslider3',
	  directionNav: false,
		start: function(slider){
		flexslider = slider;
		}
    });
  });
  // check grid size on resize event
    $window.resize(function() {
    	var gridSize = getGridSize();	
    	flexslider.vars.minItems = gridSize;
    	flexslider.vars.maxItems = gridSize;
    });
	$(window).bind('orientationchange', function() {
		 var gridSize = getGridSize();
		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());

$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexslider4').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel4",
	directionNav: false,
	start: function(slider){
		flexslider = slider;
		}
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
	  flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  $window.load(function() {
    $('#carousel4').flexslider({
      animation: "slide",
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
      asNavFor: '#flexslider4',
	  directionNav: false,
	  minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
		start: function(slider){
		flexslider = slider;
		}
    });
  });
  // check grid size on resize event
    $window.resize(function() {
    	var gridSize = getGridSize();	
    	flexslider.vars.minItems = gridSize;
    	flexslider.vars.maxItems = gridSize;
    });
	$(window).bind('orientationchange', function() {
		 var gridSize = getGridSize();
		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());

$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexslider5').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel5",
	directionNav: false,
	start: function(slider){
		flexslider = slider;
		}
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
	  flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  $window.load(function() {
    $('#carousel5').flexslider({
      animation: "slide",
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
      asNavFor: '#flexslider5',
	  directionNav: false,
	  minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
		start: function(slider){
		flexslider = slider;
		}
    });
  });
  // check grid size on resize event
    $window.resize(function() {
    	var gridSize = getGridSize();	
    	flexslider.vars.minItems = gridSize;
    	flexslider.vars.maxItems = gridSize;
    });
	$(window).bind('orientationchange', function() {
		 var gridSize = getGridSize();
		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());

$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexslider6').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel6",
	directionNav: false,
	start: function(slider){
		flexslider = slider;
		}
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
	  flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  $window.load(function() {
    $('#carousel6').flexslider({
      animation: "slide",
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
      asNavFor: '#flexslider6',
	  directionNav: false,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
		start: function(slider){
		flexslider = slider;
		}
    });
  });
  // check grid size on resize event
    $window.resize(function() {
    	var gridSize = getGridSize();	
    	flexslider.vars.minItems = gridSize;
    	flexslider.vars.maxItems = gridSize;
    });
	$(window).bind('orientationchange', function() {
		 var gridSize = getGridSize();
		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());



/*Event Profile Slider*/

$(window).load(function() {
  // The slider being synced must be initialized first
  $('#flexsliderEvent').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carouselEvent",
  directionNav: true,
  start: function(slider){
    flexslider = slider;
    }
  });
}); 
(function() { 
  // store the slider in a local variable
  var $window = $(window),
    flexslider;
    flexslider = { vars:{} };
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 4 : 4;
  } 
  $window.load(function() {
    $('#carouselEvent').flexslider({
      animation: "slide",
      controlNav: false,
      animationLoop: false,
      itemWidth: 144,
      itemMargin: 20,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize(),
      asNavFor: '#flexsliderEvent',
      directionNav: true,
    start: function(slider){
      flexslider = slider;
    }
    });
  });
  // check grid size on resize event
    $window.resize(function() {
      var gridSize = getGridSize(); 
      flexslider.vars.minItems = gridSize;
      flexslider.vars.maxItems = gridSize;
    });
  $(window).bind('orientationchange', function() {
     var gridSize = getGridSize();
    flexslider.vars.minItems = gridSize;
    flexslider.vars.maxItems = gridSize;
  });
}());

//Scroll link
$(".scroll-link").click(function() {
    var scrollRel = $(this).attr('data-rel');
    $('html, body').animate({scrollTop: $('#' + scrollRel).offset().top-60}, 600);
}); 