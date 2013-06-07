'use strict';

angular.module('angularSelectApp')
  .directive('auiSelect', function() {
    return {
      templateUrl: 'scripts/directives/aui-select.html',
        replace: true,
        scope: {
              model : '=auiData'
        },
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var selectElt = angular.element(angular.element(element).children()[0]);
          var dropdownElt = angular.element(angular.element(element).children()[1]);
          var inputElt = angular.element(angular.element(angular.element(dropdownElt).children()[0]).children()[0]);
          scope.auiInput = "";
          scope.valueList = [];
          scope.valueListOrig = [];

          for(var pos= 0, length = scope.model.length; pos < length; pos++) {
              var value = scope.model[pos];
              var displayValue = {
                  id : value,
                  label : value,
                  class : ""
              };
              scope.valueList.push(displayValue);
              scope.valueListOrig.push(displayValue);
          }
          scope.eltSelPos = null;
          scope.eltSel = null;


          scope.filterSearch = function (p) {
              var input = scope.valueListOrig;
              var pattern = p.toLowerCase();
              var resList = [];
              for(var index in input) {
                  var val = input[index].label.toLowerCase();
                  if (val.indexOf(pattern)>=0) {
                      resList.push(input[index]);
                  }
              }
              return resList;
          };

          //auiFilterList:auiInput

          scope.changeEltSel = function(newEltStr) {
              var newElt;
//              console.log("Avant : " + newEltStr);
              if (angular.isString(newEltStr) && newEltStr.lastIndexOf("|")>=0) {
                  newElt = parseInt(newEltStr.substring(newEltStr.lastIndexOf("|")+1));
              } else {
                  newElt = newEltStr;
              }
//              console.log(newElt);
//              console.log(angular.toJson(scope.eltSel));
              if (scope.eltSelPos!=null) {
                  scope.eltSel.class = "";
              }
              if (scope.valueList.length>0) {
                  scope.eltSelPos = newElt;
                  scope.eltSel = scope.valueList[scope.eltSelPos];
                  scope.eltSel.class = "select2-highlighted";
              }
          }

          element.bind("keydown", function(event) {
              if (event.which == 27) {
                  // Escape
                  scope.clickSelect(event);
                  scope.$apply();
              } else if (event.which == 13) {
                  // Enter
                  scope.clickSelect(event);
                  scope.$apply();
              } else if (event.which == 38) {
                  // Up key
                  if (scope.eltSelPos > 0) {
                      scope.changeEltSel(scope.eltSelPos-1);
                      scope.$apply();
                  }
              } else if (event.which == 40) {
                  // Down
                  if (scope.eltSelPos < (scope.valueList.length-1)) {
                      scope.changeEltSel(scope.eltSelPos+1);
                      scope.$apply();
                  }
              }
          });

          scope.inputChange = function(event) {
//              event.stopPropagation();
//              event.preventDefault();
//              scope.valueList[scope.eltSelPos].class = "";
              scope.valueList = scope.filterSearch(scope.auiInput);
              if (scope.valueList.length>0) {
                  scope.changeEltSel(0);
              }
          }

          scope.clickSelect = function(event) {
              if (dropdownElt.css("display")=="none") {
                  scope.openSelect();
              } else {
                  scope.closeSelect();
              }
          }

          scope.closeSelect = function() {
              dropdownElt.css("display", "none");
              element.removeClass("select2-dropdown-open");
              element.removeClass("select2-container-active");
          }

          scope.openSelect = function(event) {
              var posElement = element.offset();
              var heightElement = selectElt.height();
              //alert(""+event.screenX + "->" + heightElement);
//              scope.auiInput = "";
              //alert(element.css("height") + " : " + element.css("width") + " : " + element.css("top")+ " : " + element.css("left"));
              dropdownElt.css("display", "block");
              dropdownElt.css("position", "absolute");
              dropdownElt.css("top", posElement.top + heightElement);
              dropdownElt.css("left", posElement.left);
              dropdownElt.css("z-index", 99999);
              element.addClass("select2-dropdown-open");
              element.addClass("select2-container-active");
              //alert("ici" + dropdownElt);
//              var selAllElt = angular.element(angular.element(dropdownElt).children()[1]);

              inputElt.focus();
              scope.changeEltSel(0);
          }

          scope.mouseEnter = function(event) {
//              event.stopPropagation();
              //event.preventDefault();
              scope.changeEltSel(angular.element(event.toElement).attr("aui-pos"));
          }

          scope.mouseLeave = function(event) {
//              event.stopPropagation();
              //event.preventDefault();
              angular.element(event.toElement).removeClass("select2-highlighted");
          }
      }
    };
  });
