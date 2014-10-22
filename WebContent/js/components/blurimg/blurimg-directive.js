/**
 * Usage
 * 
 * To enable bluring the image
 * <img src="" blur="true">
 * 
 * To disable
 * <img src="" blur="false">
 */
sentiBankApp.directive('blur', function(){
	var pixelate = function(img) {
		img.pixelate({value:0.15});
	};
	return {
		restrict: 'A',
		scope : {
			blur: '@'// true to enable, false to disable
		},
		link: function(scope, element, attrs, controllers) {
			scope.imgDom = element;
            // When new image is loaded
            element.bind('load', function () {
                if(scope.blur === 'false')
                    return;
                pixelate(scope.imgDom);
            });
            
            scope.$watch('blur', function(newValue){
            	if(angular.isDefined(newValue) && newValue === 'false') {
                    scope.imgDom.depixelate();
            	} else if(angular.isDefined(newValue) && newValue === 'true') {
                    pixelate(scope.imgDom);
            	}
            });
		}

	};
});