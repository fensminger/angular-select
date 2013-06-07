'use strict';

describe('Filter: auiFilterList', function () {

  // load the filter's module
  beforeEach(module('angularSelectApp'));

  // initialize a new instance of the filter before each test
  var auiFilterList;
  beforeEach(inject(function ($filter) {
    auiFilterList = $filter('auiFilterList');
  }));

  it('should return the input prefixed with "auiFilterList filter:"', function () {
      var list = [];
      list.push({id:1, label:'angularjs'});
      list.push({id:1, label:'test'});
      var res = auiFilterList(list, "ula");
      //console.log(res);
      expect(res.length).toBe(1);
  });

});
