'use strict';

angular.module('angularSelectApp')
  .directive('auiSelect', function () {
    return {
      templateUrl: 'scripts/directives/aui-select.html',
        replace: true,
        scope: {
              model : '=auiData'
        },
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          scope.openSelect = function() {
              var dropdownElt = angular.element(angular.element(element).children()[1]);
              dropdownElt.css("display", "block");
              alert("ici" + dropdownElt);
              var selAllElt = angular.element(angular.element(dropdownElt).children()[1]);

              selAllElt.children().removeClass("select2-highlighted");
              var selFirstChild = angular.element(angular.element(selAllElt).children()[0]);
              selFirstChild.addClass("select2-highlighted");
              // "select2-highlighted"
          }
      }
    };
  });
