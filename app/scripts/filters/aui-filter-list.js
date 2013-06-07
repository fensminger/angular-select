'use strict';

angular.module('angularSelectApp')
  .filter('auiFilterList', function () {
    return function (input, p) {
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
  });
