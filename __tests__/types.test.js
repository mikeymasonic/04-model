const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToArray,
  castToBoolean,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('properly tells if a value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });
    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });
    it('properly tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray([3, 3])).toBeTruthy();
      expect(isArray(['thing'])).toBeTruthy();
      expect(isArray(false)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(3)).toBeFalsy();
      expect(isArray(null)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });
    it('properly tells if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({ thing: 'other thing' })).toBeTruthy();
      expect(isObject([3, 3])).toBeFalsy();
      expect(isObject(false)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject(3)).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
      expect(isObject('[object Object]')).toBeFalsy();
    });
    it('properly tells if a value is a function', () => {
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(isNumber)).toBeTruthy();
      expect(isFunction([3, 3])).toBeFalsy();
      expect(isFunction(false)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction(null)).toBeFalsy(); 
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('can cast values to a string', () => {
      expect(castToString('word')).toEqual('word');
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('throws if value is not castable to a string', () => {
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(1)).toEqual(true);
    });

    it('throws if value is not castable to boolean', () => {
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(() => {})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to an array', () => {
      expect(castToArray(castToString)(['hi', 'there', 3])).toEqual(['hi', 'there', '3']);
    });

    it('throws if value is not castable to an array', () => {
      expect(() => castToArray(castToNumber)(['hi'])).toThrowErrorMatchingSnapshot();
      expect(() => castToArray(castToNumber)(3)).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Promise)).toBeNull();
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster([String])).toBeDefined();
  });
});
