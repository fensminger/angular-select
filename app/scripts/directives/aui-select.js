'use strict';

angular.module('angularSelectApp')
  .directive('auiSelect', function($location, $anchorScroll) {
    return {
      templateUrl: 'scripts/directives/aui-select.html',
        replace: true,
        scope: {
              model : '=auiData',
              auiSelectLabelOrig : '=auiSelectLabel',
              auiSelect : "=auiSelect"
        },
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          var selectElt = angular.element(angular.element(element).children()[0]);
          var dropdownElt = angular.element(angular.element(element).children()[1]);
          var inputElt = angular.element(angular.element(angular.element(dropdownElt).children()[0]).children()[0]);
          var ulDropdownElt = angular.element(angular.element(dropdownElt).children()[1]);
          scope.auiInput = "";
          scope.valueList = [];
          scope.valueListOrig = [];
          scope.isMoreResults = false;

          scope.changeEltSel = function(newEltStr) {
              var newElt;
              if (angular.isString(newEltStr) && newEltStr.lastIndexOf("|")>=0) {
                  newElt = parseInt(newEltStr.substring(newEltStr.lastIndexOf("|")+1));
              } else {
                  newElt = newEltStr;
              }
              if (scope.eltSelPos!=null) {
                  scope.eltSel.class = "";
              }
              if (scope.valueList.length>0) {
                  scope.eltSelPos = newElt;
                  scope.eltSel = scope.valueList[scope.eltSelPos];
                  scope.eltSel.class = "select2-highlighted";
//                  var target = document.getElementById(scope.eltSel.id);
//                  target.parentNode.scrollTop = target.offsetTop;
//                  $location.hash(scope.eltSel.label);
//                  $anchorScroll();
              }
          }

          var nbMaxResult = scope.$eval(attrs['auiNbMaxResult']);
          if (!angular.isDefined(nbMaxResult) || nbMaxResult==0) {
              nbMaxResult = scope.model.length;
          }
          var customClass = scope.$eval(attrs['auiSpecificClass']);
          if (angular.isDefined(customClass) && customClass!=null) {
              selectElt.addClass(customClass);
              dropdownElt.addClass(customClass);
          }

          scope.auiSelectLabel = scope.auiSelectLabelOrig;
          scope.eltSelPos = null;
          scope.eltSel = null;
          scope.labelMoreResult = scope.$eval(attrs['auiSelectLabelMoreResult']);
          for(var pos= 0, length = scope.model.length; pos < length; pos++) {
              var value = scope.model[pos];
              var displayValue = {
                  id : value.id,
                  label : value.label,
                  class : ""
              };
              if (pos<nbMaxResult) {
                  scope.valueList.push(displayValue);
              } else {
                  scope.isMoreResults = true;
              }
              if (angular.isDefined(scope.auiSelect) && scope.auiSelect != null) {
                  if (displayValue.id == scope.auiSelect.id) {
                      scope.auiSelectLabel = scope.auiSelect.label;
                      scope.eltSelPos = pos;
                      scope.eltSel = displayValue;
                      scope.changeEltSel(scope.eltSelPos);
                  }
              }
              scope.valueListOrig.push(displayValue);
          }


          scope.filterSearch = function (p) {
              var input = scope.valueListOrig;
              var pattern = p.toLowerCase();
              var resList = [];
              var nbFind = 0;
              scope.isMoreResults = false;
              for(var index in input) {
                  var val = input[index].label.toLowerCase();
                  if (val.indexOf(pattern)>=0) {
                      resList.push(input[index]);
                      nbFind++;
                      if (nbFind>=nbMaxResult) {
                          scope.isMoreResults = true;
                          break;
                      }
                  }
              }
              return resList;
          };

          element.bind("keydown", function(event) {
              if (event.which == 27) {
                  // Escape
                  scope.clickSelect(event);
                  scope.$apply();
              } else if (event.which == 13) {
                  // Enter
                  scope.addSelectedValue(scope.clickSelect(event));
                  scope.$apply();
              } else if (event.which == 38) {
                  // Up key
                  if (scope.eltSelPos > 0) {
                      scope.changeEltSel(scope.eltSelPos-1);
                      ulDropdownElt.scrollTo(angular.element(ulDropdownElt.children()[scope.eltSelPos]));
                      scope.$apply();
                  }
              } else if (event.which == 40) {
                  // Down
                  if (scope.eltSelPos < (scope.valueList.length-1)) {
                      scope.changeEltSel(scope.eltSelPos+1);
                      ulDropdownElt.scrollTo(angular.element(ulDropdownElt.children()[scope.eltSelPos]));
                      scope.$apply();
                  }
              }
          });

          scope.inputChange = function(event) {
              scope.valueList = scope.filterSearch(scope.auiInput);
              if (scope.valueList.length>0) {
                  scope.changeEltSel(0);
              }
          }

          scope.clickSelect = function(event) {
              if (dropdownElt.css("display")=="none") {
                  scope.openSelect();
                  return true;
              } else {
                  scope.closeSelect();
                  return false;
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
              dropdownElt.css("display", "block");
              dropdownElt.css("position", "absolute");
              dropdownElt.css("top", posElement.top + heightElement);
              dropdownElt.css("left", posElement.left);
              dropdownElt.css("z-index", 99999);
              element.addClass("select2-dropdown-open");
              element.addClass("select2-container-active");

              inputElt.focus();
              scope.changeEltSel(0);
              //ulDropdownElt.scrollTo(angular.element(ulDropdownElt.children()[scope.eltSelPos]));
          }

          scope.mouseEnter = function(event) {
              scope.changeEltSel(angular.element(event.toElement).attr("aui-pos"));
          }

          scope.mouseLeave = function(event) {
              angular.element(event.toElement).removeClass("select2-highlighted");
          }

          scope.addSelectedValue = function(isOpen) {
              if (isOpen) {
                  scope.auiSelectLabel = scope.auiSelectLabelOrig;
                  scope.auiSelect = null;
              } else {
                  if (scope.valueList.length>0) {
                      scope.auiSelectLabel = scope.eltSel.label;
                      scope.auiSelect = scope.eltSel;
                  }
              }
          }

          scope.clickSelectedValue = function() {
              scope.addSelectedValue(false);
              scope.closeSelect();
          }
      }
    };
  });
