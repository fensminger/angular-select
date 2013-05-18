'use strict';

describe('Service: jsonUtils', function () {

    // load the service's module
    beforeEach(module('angularSelectApp'));

    // instantiate service
    var jsonUtils;
    beforeEach(inject(function (_jsonUtils_) {
        jsonUtils = _jsonUtils_;
    }));

    it('should do something', function () {
        expect(!!jsonUtils).toBe(true);
    });

    it('convert json date : simple String value', function () {
        var jsonObject = "Test";
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple null value', function () {
        var jsonObject = null;
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple undefined value', function () {
        var jsonObject;
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple boolean value', function () {
        var jsonObject = true;
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple number value', function () {
        var jsonObject = 10;
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple function value', function () {
        var jsonObject = function() {
            return null;
        };
        var res = jsonUtils.convertDate(jsonObject);
        expect(res).toBe(jsonObject);
    });

    it('convert json date : simple object', function () {
        var jsonObject = {
            test : "toto"
            , numeric : 10
            , details : {
                valeurBool : true,
                detailsfromDetails : {
                    formatDt : new Date(),
                    arrayValue : ["Val1", true]
                }
            }
        };
//        console.log(angular.toJson(jsonObject));
        var res = jsonUtils.convertDate(jsonObject);
        expect(angular.toJson(res)).toBe(angular.toJson(jsonObject));
    });

    it('convert json date : simple number date with match', function () {
        var curDate = new Date();
        var jsonObject = {
            chaine : "toto"
            , date : curDate.getTime()
            , otherDt : [curDate.getTime()]
            , date1 : curDate.getTime()
        };
        var jsonObjectToBe = {
            chaine : "toto"
            , date : curDate
            , otherDt : [curDate]
            , date1 : curDate.getTime()
        };

//        console.log(angular.toJson(jsonObject));
        var res = jsonUtils.convertDate(jsonObject, "^date$|^otherDt$", "date");
        expect(angular.toJson(res)).toBe(angular.toJson(jsonObjectToBe));
    });

});
