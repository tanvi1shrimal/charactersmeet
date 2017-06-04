(function() {
  'use strict';

  angular
    .module('charactersmeet', [])
    .controller('mediapopupController', mediapopupController);
   // .factory('GetAllGallaryData', GetAllGallaryData);

  
function mediapopupController($scope,$http){
   $scope.currentPicIndex = 0;
        $scope.GallaryData = [];
        $scope.commentList = [];
   
        //var dataURL = '../html/assets/app/json/mediaPopupcontent.js'
        var dataURL = 'http://localhost/537-charactersmeet-html/HTML/assets/app/json/mediaPopupcontent.js'
        //var dataURL = 'http://103.15.66.186/webdesign/537-charactersmeet/assets/app/json/mediaPopupcontent.js'
        $http.get(dataURL).then(function(res) {
                $scope.GallaryData = res.data;
                $scope.GallarySize = $scope.GallaryData.length;
                $scope.FillCurrentCommentValue($scope.currentPicIndex); 
        });

        $scope.ViewGallary = function(){
            /* Get Comment JSON from Service */
           /*GetAllGallaryData.getList().then(function(res){
                $scope.GallaryData = res.data;
                $scope.GallarySize = $scope.GallaryData.length;
                $scope.FillCurrentCommentValue($scope.currentPicIndex);
            });*/
        }
        
        $scope.ViewNext = function(){
            if($scope.currentPicIndex < $scope.GallarySize-1){
                $scope.currentPicIndex += 1;
                $scope.FillCurrentCommentValue($scope.currentPicIndex);
            }
        }
        
        $scope.ViewPrev = function(){
            if($scope.currentPicIndex >0){
                $scope.currentPicIndex -= 1;    
                $scope.FillCurrentCommentValue($scope.currentPicIndex);
            }    
        }
        
        $scope.FillCurrentCommentValue = function(index){
                $scope.postedUser    = $scope.GallaryData[index]['postedBy'];
                $scope.ownerThumb    = $scope.GallaryData[index]['ownerThumb'];
                $scope.timePosted    = $scope.GallaryData[index]['postedTime'];
                $scope.postedPic     = $scope.GallaryData[index]['postedImage'];
                $scope.postedContent = $scope.GallaryData[index]['postedContent'];
                $scope.commentList   = $scope.GallaryData[index].commentOnimage; 

        }

        $scope.DeleteComment = function(index){
            
            $scope.GallaryData[$scope.currentPicIndex].commentOnimage.splice(index, 1);
        }

        $scope.sendMessage = function($event){
            if($scope.chatMessage != ""){
                var index = parseInt($scope.GallaryData[$scope.currentPicIndex].commentOnimage.length)+1;
                var message = {
                    "userName":"Jane Doe",
                    "userThmb":"profile-thumb2.png",
                    "commentTime":"10 min ago",
                    "commentView":$scope.chatMessage
                    }
                $scope.GallaryData[$scope.currentPicIndex].commentOnimage.push(message);
              //  console.log($scope.commentList.length);
              // console.table($scope.GallaryData[$scope.currentPicIndex].commentOnimage);
                $scope.chatMessage = "";
               // scrollTopChat();
            }
            
       }


  $scope.mediaRightcommentscrl = function(){

      setTimeout(function(){
      var windowHeight  = $(window).height(),
          wrtFooterHt   = $('[data-type="write-footer"]').innerHeight(),
          heightOfright = windowHeight - wrtFooterHt; 
          $('[data-type="write-comment"]').css({'padding-bottom':wrtFooterHt + 10 + 'px'});
          $('[data-type="write-comment"]').height(heightOfright); 
          $('[data-type="postRegion"]').height(heightOfright);  
          $('[data-type="postRegion"]').mCustomScrollbar("scrollTo",'last');
        },100);
    }

$scope.toggleFullScreen = function() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen(); 
    } else if (document.documentElement.webkitRequestFullScreen) { 
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  

    if (document.cancelFullScreen) {       
      document.cancelFullScreen();  
      document.documentElement
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();
      
    }  
  } 
}

    document.addEventListener("fullscreenchange", function () {
       if($('.icon-th-fullscreen, .media-right, .icon-th-close').is(':visible')){
              $('.icon-th-fullscreen, .media-right, .icon-th-close').hide(); 
          }
          else{
            $('.icon-th-fullscreen, .media-right, .icon-th-close').show(); 
          } 
    }, false);

    document.addEventListener("mozfullscreenchange", function () {
       if($('.icon-th-fullscreen, .media-right, .icon-th-close').is(':visible')){
              $('.icon-th-fullscreen, .media-right, .icon-th-close').hide(); 
          }
          else{
            $('.icon-th-fullscreen, .media-right, .icon-th-close').show(); 
          } 
    }, false);

    document.addEventListener("webkitfullscreenchange", function () {
       if($('.icon-th-fullscreen, .media-right, .icon-th-close').is(':visible')){
              $('.icon-th-fullscreen, .media-right, .icon-th-close').hide(); 
          }
          else{
            $('.icon-th-fullscreen, .media-right, .icon-th-close').show(); 
          } 
    }, false);

    document.addEventListener("msfullscreenchange", function () {
        if($('.icon-th-fullscreen, .media-right, .icon-th-close').is(':visible')){
              $('.icon-th-fullscreen, .media-right, .icon-th-close').hide(); 
          }
          else{
            $('.icon-th-fullscreen, .media-right, .icon-th-close').show(); 
          } 
    }, false); 

} 

$('[data-type="autoSize"]').autosize();
$('[data-type="postRegion"]').mCustomScrollbar();
 function thWindow(){ 
    setTimeout(function(){ 
    var windowHt = $(window).height()-70,
      windowHeight = $(window).height();
      $('.media-img-view, .image-content').css('max-height', windowHt);    
      //$('.media-img-view').css({'line-height':windowHt + 'px'});
      var wrtCmntFooter = 70,
          heightOfright = windowHeight - wrtCmntFooter;         
          $('[data-type="write-comment"]').css({'padding-bottom':wrtCmntFooter + 5 + 'px'});
          $('[data-type="write-comment"]').height(heightOfright); 
          $('[data-type="postRegion"]').height(heightOfright);
          $('[data-type="postRegion"]').mCustomScrollbar();
       },30); 

  }

//Right section Comment Scroll
 $(window).resize(function() { 
     if($(window).width() >= 765){
         thWindow();
      } 
  });
 
  if($(window).width() >=765){ 
         thWindow();
    } 
})();

 
