'use strict';

describe('Filter: auiShowPattern', function () {

  // load the filter's module
  beforeEach(module('angularSelectApp'));

  // initialize a new instance of the filter before each test
  var auiShowPattern;
  beforeEach(inject(function ($filter) {
    auiShowPattern = $filter('auiShowPattern');
  }));

  it('should return the input prefixed with "auiShowPattern filter:"', function () {
    var text = 'angularjs';
      expect(auiShowPattern(text, "ztr")).toBe(text);
      expect(auiShowPattern(text, "ang")).toBe('<span class=\"select2-match\">ang</span>ularjs');
      expect(auiShowPattern(text, "js")).toBe('angular<span class=\"select2-match\">js</span>');
      expect(auiShowPattern(text, "ula")).toBe('ang<span class=\"select2-match\">ula</span>rjs');
  });

});
