'use strict';

angular.module('angularSelectApp')
  .directive('auiSelect', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the auiSelect directive');
      }
    };
  });
