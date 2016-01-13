$(function() {
    var attachFastClick = Origami.fastclick;
    attachFastClick(document.body);
});
/*******************ANGULAR APP*********************/
var myApp = angular.module('app',[]);

// .config(['$routeProvider', function($routeProvider){
	
// 	$routeProvider
// 	.when('/',{
// 		templateUrl : 'pages/products.html',
// 		controller: 'productsController'
// 	})
//     .when('/stock-labels', {
//         templateUrl : 'pages/stock-labels.html',
//         controlller: 'stockLabelsController'
//     })
// 	.when('/product/:productInfo', {
// 		templateUrl : 'pages/product-info.html', 
// 		controller: 'productInfoController'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	})
// }])

/***************CONTROLLERS****************** */
myApp.controller('mainController', ['$scope', function($scope){    
    
    var toTop = $('.back-to-top');
    var logo = $('.headerLogo');
    var header = $('.header-container');    
    
    stickyHeader();
    if($(window).scrollTop() > 350){
        toTop.addClass('visible');
    }
    toTop.on('click', function(){
        scrollToTop();
    });
    
    /***********RESIZE WINDOW*************/
    $(window).resize(function () {
        var screenWidth = $(window).width() + 17;
        
        if (screenWidth < 630) {      //was 510            
            logo.attr('src', 'img/Repacorp-Mobile.png');            
        } if (screenWidth >= 630) {
            logo.attr('src', 'img/Repacorp-Horizontal-Logo400.png');            
        }

    });

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

// .controller('productsController', ['$scope', '$routeParams', function($scope, $routeParams){
	
// }])

// .controller('productInfoController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
// 	var id = $routeParams.productInfo;	
// 	$http.get('../products.json').success(function(data){		
// 		var info = data.productInfo;
// 		for (var i in info){
// 			if (id == info[i].id){
// 				$scope.product = info[i];								
// 				return;
// 			}
// 		}
// 	})
// }])


/*******************DIRECTIVES**********************/
myApp.directive('products', function(){    
    return{
        restrict: 'EA',
        templateUrl: 'pages/products.html' 
                
    };
})

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

.directive('sampleFormPopup', ['$http', function($http){     
    return{
        restrict: 'EA',
        templateUrl: 'pages/sample-form-popup.html',
        link: function($scope, $ele, $attr){                    
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
                if($ele.children().children('form').hasClass('ng-invalid')){                    
                    return;
                }                            
                $scope.formSpinner = true;                   
                
                $http({
                    method:'POST',
                    url: 'send_free_sample.php',
                    data: $scope.formSample        
                })  
                .then(function(success,error){
                    if (success){                        
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showSuccess();                      
                    } 
                    if(error){                        
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showError();
                    }                                           
                });                
            }      
                 
            $scope.clearSample = function(){ 
                $scope.sampleForm.$setPristine();
                $scope.formSample = angular.copy($scope.master);
            }          
            
        }
    }
}])

.directive('distributorFormPopup',['$http', function($http){
    return{
        restrict: 'EA',
        templateUrl: 'pages/distributor-form-popup.html',
        link: function($scope, $ele, $attr){
            
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
                if($ele.children().children('form').hasClass('ng-invalid')){
                    return;
                }
                $scope.formSpinner = true;
                
                $http({
                    method:'POST',
                    url:'send_distributor.php',
                    data: $scope.formSample
                }).then(function(success, error){
                    if(success){
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showSuccess();
                    }else{
                        $scope.formSpinner = false;
                        $ele.hide();
                        $scope.showError();
                    }
                });
            }
            $scope.clearDist = function(){
                $scope.form.$setPristine();
                $scope.formDist = angular.copy($scope.master);
            }
            
        }
    }    
}])

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

.directive('spinner', function(){
    return{
        restrict:'EA',
        templateUrl: 'pages/spinner.html'
    }
})

/*************FILTERS***********************/
myApp.filter('newline', ['$sce', function($sce){
     return function(text) {      
        return $sce.trustAsHtml(text);
    }
}])
