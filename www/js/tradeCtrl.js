
var app = angular.module('app.controllers.trade', []);

 app.controller('TradeCtrl', function($scope, ContractService) {

        $scope.contract = {};
        $scope.quantityTrade = 1;
        $scope.quantityBundle = 1;
        $scope.rowCollection = [
         {bundName: 'OCR.10SEP15.U25', price: 10.56}
        ];

        $scope.parseFloat = parseFloat;
        $scope.toggle = {
            one: false,
            two: false,
            step1:true,
            step2:false,
            step3:false,
            bunStep1:true,
            bunStep2:false,
            bunStep3:false,
            confirmButtonDisabled: true
        };
        // Now have two functions that change the ng-show based on the click
        $scope.showOne = function (type){
            $scope.toggle.one = true;
            $scope.toggle.two = false;
            $scope.stockType = type;
            $scope.toggle.step1 = true;
            $scope.toggle.step2 = false;
            $scope.toggle.step3 = false;
        };

        $scope.stockType = "";

        $scope.showTwo = function (type) {
            $scope.toggle.one = false;
            $scope.toggle.two = true; // now show this one
            $scope.stockType = type;
            $scope.toggle.bunStep1 = true;
            $scope.toggle.bunStep2 = false;

        };

        $scope.closeStep = function(){
            $scope.toggle.step1 = false;
            $scope.toggle.step2 = false;
            $scope.toggle.step3 = false;
            $scope.toggle.bunStep1 = false;
            $scope.toggle.bunStep2 = false;
            $scope.toggle.bunStep3 = false;
        };
        $scope.enableStep2 = function() {
            $scope.toggle.confirmButtonDisabled = false;
            $scope.toggle.step1 = false;
            $scope.toggle.step2 = true;

        };

         $scope.enableStep3 = function() {
             $scope.toggle.confirmButtonDisabled = false;
             $scope.toggle.step1 = false;
             $scope.toggle.step2 = false;
             $scope.toggle.step3 = true;

         };

         $scope.enableBunStep2 = function() {
             $scope.toggle.bunStep1 = false;
             $scope.toggle.bunStep2 = true;
             $scope.toggle.bunStep3 = false;

         };

         $scope.enableBunStep3 = function() {
             $scope.toggle.bunStep1 = false;
             $scope.toggle.bunStep2 = false;
             $scope.toggle.bunStep3 = true;

         };

        $scope.trade = function(id){
            $scope.contract = ContractService.getContract(id);
        };
    });

app.directive('counter', function() {
        return {
            restrict: 'A',
            scope: { value: '=value' },
            template: '<div>'+
                  '<button ng-click="plus()">+</button>'+
                  '<input type="text" ng-model="value" ng-change="changed()" ng-readonly="readonly">'+
                  '<button ng-click="minus()">-</button>'+
                  '</div>',


            link: function( scope , element , attributes ) {
                // Make sure the value attribute is not missing.
                if ( angular.isUndefined(scope.value) ) {
                    throw "Missing the value attribute on the counter directive.";
                }

                var min = angular.isUndefined(attributes.min) ? null : parseInt(attributes.min);
                var max = angular.isUndefined(attributes.max) ? null : parseInt(attributes.max);
                var step = angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step);

                element.addClass('counter-container');

                // If the 'editable' attribute is set, we will make the field editable.
                scope.readonly = angular.isUndefined(attributes.editable) ? true : false;

                /**
                 * Sets the value as an integer.
                 */
                var setValue = function( val ) {
                    scope.value = parseInt( val );
                }

                // Set the value initially, as an integer.
                setValue( scope.value );

                /**
                 * Decrement the value and make sure we stay within the limits, if defined.
                 */
                scope.minus = function() {
                    if ( min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1 ) {
                        setValue( min );
                        return false;
                    }
                    setValue( scope.value - step );
                };

                /**
                 * Increment the value and make sure we stay within the limits, if defined.
                 */
                scope.plus = function() {
                    if ( max && (scope.value >= max || scope.value + step >= max) ) {
                        setValue( max );
                        return false;
                    }
                    setValue( scope.value + step );
                };

                /**
                 * This is only triggered when the field is manually edited by the user.
                 * Where we can perform some validation and make sure that they enter the
                 * correct values from within the restrictions.
                 */
                scope.changed = function() {
                    // If the user decides to delete the number, we will set it to 0.
                    if ( !scope.value ) setValue( 0 );

                    // Check if what's typed is numeric or if it has any letters.
                    if ( /[0-9]/.test(scope.value) ) {
                        setValue( scope.value );
                    }
                    else {
                        setValue( scope.min );
                    }

                    // If a minimum is set, let's make sure we're within the limit.
                    if ( min && (scope.value <= min || scope.value - step <= min) ) {
                        setValue( min );
                        return false;
                    }

                    // If a maximum is set, let's make sure we're within the limit.
                    if ( max && (scope.value >= max || scope.value + step >= max) ) {
                        setValue( max );
                        return false;
                    }

                    // Re-set the value as an integer.
                    setValue( scope.value );
                };
            }
        }
    });