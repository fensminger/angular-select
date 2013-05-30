'use strict';

angular.module('angularSelectApp')
  .filter('auiShowPattern', function () {
    return function (input, pattern) {
        var pos = input.indexOf(pattern);
        if (pos>=0) {
            var posFin = pos + pattern.length;
            return input.substring(0,pos) + "<span class=\"auiSelectedText\">" + input.substring(pos,posFin) + "</span>" + input.substring(posFin);
        } else {
            return input;
        }
    };
  });
