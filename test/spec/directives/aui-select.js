'use strict';

describe('Directive: auiSelect', function () {
  beforeEach(module('angularSelectApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<aui-select></aui-select>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('');
  }));
});
