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

        $scope.valuesList = [];
        var j = 0;
        for(var i=0; i<5000; i++) {
            $scope.valuesList.push({
                id : i,
                label : $scope.awesomeThings[j] + " : " + i
            });
            j++;
            if (j==$scope.awesomeThings.length) {
                j=0;
            }
        }
        //$scope.myValue = $scope.valuesList[10];

    });
