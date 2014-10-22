'use strict';

/**
 * Define and configure all modules
 */

/**
 * Modules
 */
var sentiBankApp = angular.module('sentiBankApp', [ 'ngRoute', 'ui.bootstrap', 'ngGrid', 'ngCsv']);

/**
 * Module configuration
 */
sentiBankApp.
config([ '$routeProvider', function($routeProvider) {
	$routeProvider.
    when('/sentibank', {
      templateUrl: 'js/sentibank/senti-bank.html'
    }).
    otherwise({ /** default */
      redirectTo: '/sentibank'
    });
} ]);

/**
 * Module constants
 * 
 */
sentiBankApp.constant('SENTI_BANK_APP', (function(){
	return {
		HTTP_URL 	: '/aperture/aperture', 
        HTTP_METHOD	: 'GET'
	};
})());