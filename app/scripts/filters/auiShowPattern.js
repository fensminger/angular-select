'use strict';

angular.module('angularSelectApp')
  .filter('auiShowPattern', function () {
    return function (input, p) {
        var pattern = p.toLowerCase();
        var pos = input.toLowerCase().indexOf(pattern);
        if (pos>=0) {
            var posFin = pos + pattern.length;
            return input.substring(0,pos) + "<span class=\"select2-match\">" + input.substring(pos,posFin) + "</span>" + input.substring(posFin);
        } else {
            return input;
        }
    };
  });
