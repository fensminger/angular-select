'use strict';

angular.module('angularSelectApp')
    .factory('jsonUtils', function () {
        // Service logic
        // ...

        var internalConvertDate = function (jsonObject, dateMatcherPattern, currentKey) {
//            console.log("OBJECT ("+angular.toJson(jsonObject)+") -> " + (typeof jsonObject));
            if (jsonObject==null
                || angular.isString(jsonObject)
                || angular.isUndefined(jsonObject)
                || angular.isFunction(jsonObject)
                || angular.isDate(jsonObject)
                || (typeof jsonObject == "boolean")) {
                return jsonObject;
            } else if (angular.isNumber(jsonObject)) {
                return analyseNumber(jsonObject, currentKey, dateMatcherPattern);
            } else if (angular.isArray(jsonObject)) {
                return analyseArray(jsonObject, currentKey, dateMatcherPattern);
            } else {
                return analyseStructuredObject(jsonObject, currentKey, dateMatcherPattern);
            }
        };

        function analyseNumber(jsonObject, currentKey, dateMatcherPattern) {
             if (currentKey==null || angular.isUndefined(dateMatcherPattern)) {
                 return jsonObject;
             } else {
                 var regExp = new RegExp(dateMatcherPattern);
                 if (regExp.test(currentKey)) {
                     var dateConverted = new Date();
                     dateConverted.setTime(jsonObject);
                     return dateConverted; //  TODO to implement
                 } else {
                     return jsonObject;
                 }
             }
        }

        function analyseArray(jsonObject, currentKey, dateMatcherPattern) {
            var res = [];
            for(var i = 0; i<jsonObject.length;i++) {
                res.push(internalConvertDate(jsonObject[i], dateMatcherPattern, currentKey));
            }
            return res;
        }

        function analyseStructuredObject(jsonObject, currentKey, dateMatcherPattern) {
            var res = {};
            for(var key in jsonObject) {
                res[key] = internalConvertDate(jsonObject[key], dateMatcherPattern, key);
            }
            return res;
        }

            // Public API here
        return {
            // Converter Number date to real date
            // Parameters :
            // - jsonObject : realObjects
            // - dateMatcherPattern : regExp which define key to convert to real dates
            // - currentKey : optional, current key of object
            convertDate: internalConvertDate

        };
    });
