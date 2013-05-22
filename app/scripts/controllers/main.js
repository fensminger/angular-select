'use strict';

angular.module('angularSelectApp')
    .controller('MainCtrl', function ($scope) {
        $scope.resSimple = "";
        $scope.res = [];
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

    });
