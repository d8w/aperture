'use strict';
sentiBankApp.

controller('sentiBankAppCtrl', [ '$http', '$scope', 'SENTI_BANK_APP', 
                                 function($http, $scope, SENTI_BANK_APP) {
	var slides = $scope.slides = [];

	$scope.isRunning = false;
	$scope.selectedImage = {id:-1};
	$scope.images = [];
	$scope.alerts = [];
	
	$scope.addSlide = function(url, data) {
		if(url) {
            var newWidth = 600 + slides.length;
            var image = {
              id: slides.length,
              image: url,
              text: url.split('/').pop(),
              data: data
            };
            slides.push(image);

            /**
             * images list
             */
            $scope.images.push(image);
		}
	};

	$scope.submit = function(url) {
		if(!angular.isString(url))
			return;

		$scope.isRunning = true;

        // send request to the server
        $http({
                method	: SENTI_BANK_APP.HTTP_METHOD,
                url		: SENTI_BANK_APP.HTTP_URL,
                params	: {url: url}
        	}).
            success(function(data, status, headers, config) {
            	if(data) { 
                    $scope.addSlide(url, data);
            	} else {// empty data
            		$scope.alerts.push({type: 'danger', msg: 'Invalid image url or image unvailable: ' + url});
            	}
                $scope.isRunning = false;
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
                console.error(status);
                $scope.isRunning = false;
            }
         );
	};
	
	/**
	 * Close an alert
	 */
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

    /**
     * 1. display the parameters in the parameter grid
     * 2. display results in other grids 
     * @private method to handle the row selection in the image grid
     */
    var onSelecteTask = function (rowItem) {
        if (rowItem.selected)  { 
            var idx = rowItem.rowIndex;
            if($scope.images[idx] && $scope.images[idx].data
            		&& $scope.images[idx].data.number ) {

                var result = $scope.images[idx].data.images[0];
                var attributes = result.attributes;
                var concepts = result['bi-concepts'];
                var features = result.features;

            	if(	angular.isObject(attributes)){
                    // attributes
                    var kv = [];
                    for(var key in attributes) {
                    	kv.push({
                    		attribute: key,
                    		value: attributes[key]
                    	});
                    }
                    
                    // concepts
                    var kv2 = [];
                    for(var key in concepts) {
                    	kv2.push({
                    		concept: key,
                    		value: concepts[key]
                    	});
                    }

                    // features
                    var kv3 = [];
                    for(var key in features) {
                    	kv3.push({
                    		feature: key,
                    		value: features[key]
                    	});
                    }
                    
                    $scope.attrs = kv;
                    $scope.concepts = kv2;
                    $scope.features = kv3;

                    $scope.selectedImageId = idx;
                    $scope.selectedImage.id = idx;
                    $scope.selectedImage.url = rowItem.entity.image;
                    var resultJsonStr = angular.toJson(result, true);
                    $scope.selectedImage.dataArray = [{json:resultJsonStr}];
                    if(angular.isString($scope.images[idx].text)) {
                        $scope.selectedImage.fileName = $scope.images[idx].text;
                    } else {
                        $scope.selectedImage.fileName = 'result.json';
                    }
            	}
            }

        } else {//deselection
            // do nothing at this point
        }
    };
    
    /**
     * image loaded event
     */
    $scope.imgLoadedEvents = {

            always: function(instance) {
                // Do stuff
              console.log('always');
            },

            done: function(instance) {
              console.log('done');
            },

            fail: function(instance) {
                // Do stuff
              console.log('fail');
            }

        };

	/**
	 * The image grid
	 */
     $scope.gridOptions = { 
    	data: 'images',
        multiSelect: false,
        enableColumnResize: true,
        afterSelectionChange : onSelecteTask,
        columnDefs: [
            {
                field: 'id',
                displayName : 'ID'
            }, {
                field: 'image',
                displayName : 'URL'
            }, {
                field: 'text',
                displayName : 'File Name'
            }]
     };

	/**
	 * The attribute grid
	 */
     $scope.attrGridOptions = { 
         data: 'attrs',
         multiSelect: false,
         showFilter: true
     };
     /**
      * The conceptGridOptions grid
      */
     $scope.conceptGridOptions = {
         data: 'concepts',
         multiSelect: false,
         showFilter: true
     };
     /**
      * The featureGridOptions grid
      */
     $scope.featureGridOptions = {
         data: 'features',
         multiSelect: false
     };

     /**
      * Business logic
      */
     var sampleImages = ['http://img3.wikia.nocookie.net/__cb20120901054402/lego/images/1/1b/ElectroBatman.jpg',
                         'http://img4.wikia.nocookie.net/__cb20130202180638/lego/images/7/72/Superman.jpg'];
     for(var i =0; i< sampleImages.length; ++i) {
    	 $scope.submit(sampleImages[i]);
     }

     $scope.enableBlur = true;
}]);