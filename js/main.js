/*Fastclick for mobile users*/
$(function() {
    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);
});


/*******************ANGULAR APP*********************/
var myApp = angular.module('app',[]);


/***************CONTROLLERS****************** */
myApp.controller('mainController', ['$scope', function($scope){    
    
    var toTop = $('.back-to-top');
    var logo = $('.headerLogo');
    var header = $('.header-container');    
    
    
    if($(window).width() < 735){
        logo.attr('src', 'img/Repacorp-Mobile.png');
    }
    
    stickyHeader();
    if($(window).scrollTop() > 350){
        toTop.addClass('visible');
    }
    
    toTop.on('click', function(){
        scrollToTop();
    });
    
    /***********RESIZE WINDOW*************/
    
    $(window).resize(function () {
        var screenWidth = $(window).width();
        
        if (screenWidth < 735) {               
            logo.attr('src', 'img/Repacorp-Mobile.png');            
        } if (screenWidth >= 735) {
            logo.attr('src', 'img/Repacorp-Horizontal-Logo400.png');            
        }

    });

    /**********SCROLLING FUNCTION********** */
    $(window).scroll(function(){
        stickyHeader();
        if($(this).scrollTop() > 350){
            toTop.removeClass('fadeOut').addClass('visible animated fadeIn');
        }else{
            toTop.addClass('fadeOut').removeClass('visible');
        }
    });
    function scrollToTop(){
        $('html, body').animate({scrollTop: 0}, 500);
    }        
    function stickyHeader(){
        if ($(window).scrollTop() > 120){
            header.css('height', '62px');
            logo.css('height', '45px');
            $('.header-content').css('border-bottom', '3px solid #a50127');
        }else{
            header.css('height', '80px');
            logo.css('height', '58px');
            $('.header-content').css('border-bottom', '1px solid #f1f1f1');
        }
    }
        
    $scope.master = {}   
}]);



/*******************DIRECTIVES**********************/
/*Main Products directive*/
myApp.directive('products', function(){    
    return{
        restrict: 'EA',
        templateUrl: 'pages/products.html' 
                
    };
})

/*Product Info Popup Directive; 
Template: pages/product-info-popup.html*/
.directive('productInfoPopup', ['$http', function($http){
    return{
        restrict: 'EA',
        templateUrl: 'pages/product-info-popup.html',
        link: function($scope, $ele, $attr){            
            var clickAttr;
            $scope.clickEvent = function(obj){  
                document.body.style.overflow = 'hidden';               
                $ele.show();     
                clickAttr = obj.target.attributes.data.value;                                
                $http.get('products.json').success(function(data){                    		
                    var info = data.productInfo;
                    for (var i in info){
                        if (clickAttr == info[i].id){
                            $scope.product = info[i];                        				
                            return;
                        }
                    }
                });
            };
            $scope.closeProduct = function() {
                document.body.style.overflow = 'visible';
                $ele.hide();
                $scope.product = '';
            };      
            
        }
    };
}])

/*Sample Form Popup
Template: pages/sample-form-popup.html*/
.directive('sampleFormPopup', ['$http', function($http){     
    return{
        restrict: 'EA',
        templateUrl: 'pages/sample-form-popup.html',
        link: function($scope, $ele, $attr){
              
            /*INPUT MASK*/
            $('.phone').mask('(999)999-9999');
            $('.zipcode').mask('99999');
                              
            $scope.sampleFormPopup = function(){  
                document.body.style.overflow = 'hidden';                            
                $ele.show();    
            };
            $scope.closeSample = function(){
                document.body.style.overflow = 'visible';
                $ele.hide();              
            }
            $scope.formSample = {};
            $scope.submitSample = function(){                             
                if($ele.children().children().children('form').hasClass('ng-invalid')){                                  
                    return;
                }                            
                $scope.formSpinner = true;                   
                var sampleData = $scope.formSample;
                $http.post('send_free_sample.php', sampleData)
                    .then(function successCallBack(response){
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showSuccess();
                    }, function errorCallBack(response){
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showSuccess();
                    });                              
            }      
                 
            $scope.clearSample = function(){ 
                $scope.sampleForm.$setPristine();
                $scope.formSample = angular.copy($scope.master);
            }          
            
        }
    }
}])

/*Become a Distributor Form Popup
Template: pages/distributor-form-popup.html*/
.directive('distributorFormPopup',['$http', function($http){
    return{
        restrict: 'EA',
        templateUrl: 'pages/distributor-form-popup.html',
        link: function($scope, $ele, $attr){            
            
            /*INPUT MASK*/
            $('.phone').mask('(999)999-9999');
            $('.zipcode').mask('99999');
            
            $scope.distForm = function(){
                document.body.style.overflow = 'hidden'
                $ele.show();
            }
            $scope.closeDist = function(){
                document.body.style.overflow = 'visible'
                $ele.hide();
            }
            $scope.formDist = {}
            $scope.submitDist = function(){                
                if($ele.children().children().children('form').hasClass('ng-invalid')){
                    return;
                }
                $scope.formSpinner = true;
                var distData = $scope.formDist;
                $http.post('send_distributor.php', distData)
                    .then(function successCallBack(response){
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showSuccess();        
                    }, function errorCallBack(response){
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showError();
                    })               
            }
            $scope.clearDist = function(){
                $scope.form.$setPristine();
                $scope.formDist = angular.copy($scope.master);
            }
            
        }
    }    
}])

/*Success form popup after the form has successfully submitted*/
.directive('successFormPopup', function(){
    return{
        restrict: 'EA',
        templateUrl: 'pages/success.html',
        link: function($scope, $ele, $attr){              
            $scope.showSuccess = function(){
                document.body.style.overflow = 'hidden';
                $ele.show();
            }
            $scope.closeSuccess = function(){
                document.body.style.overflow = 'visible';
                $ele.hide();
            }
            
            
        }
    }
})

/*Loading Spinner directive when the user click submit*/
.directive('spinner', function(){
    return{
        restrict:'EA',
        templateUrl: 'pages/spinner.html'
    }
})

.directive('imageSlider', function(){
    return{
        restrict:'EA',
        templateUrl: 'pages/image-slider.html'
    }
})
/*************FILTERS***********************/
/*trust HTML from JSON*/
myApp.filter('newline', ['$sce', function($sce){
     return function(text) {      
        return $sce.trustAsHtml(text);
    }
}])
