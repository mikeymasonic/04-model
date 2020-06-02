const Validator = require('../lib/Validator');

describe('Validator', () => {
  let validator;

  describe('required fields', () => {
    // before each test
    beforeEach(() => {
      validator = new Validator('name', {
        type: String,
        required: true
      });
    });
    
    // other things you can do:
    // before any test run
    beforeAll(() => {

    });

    // after each test
    afterEach(() => {

    });

    // after all tests
    afterAll(() => {

    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual('spot');
    });

    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual('spot');
    });

    it('returns the field', () => {
      const dog = {
        age: '5',
        weight: '20 lbs'
      };

      expect(() => validator.validate(dog)).toThrowErrorMatchingSnapshot();
    });
  });

  describe('optional fields', () => {
    beforeAll(() => {
      validator = new Validator('age', {
        type: Number
      });
    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual(5);
    });

    it('returns the field cast to type', () => {
      const dog = {
        name: 'spot',
        age: '5',
        weight: '20 lbs'
      };

      expect(validator.validate(dog)).toEqual(5);
    });

    it('returns the field', () => {
      const dog = {
        name: 'spot',
        weight: '20 lbs'
      };
      expect(validator.validate(dog)).toBeNull();
    });
  });
});
