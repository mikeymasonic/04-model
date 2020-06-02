const Schema = require('../lib/Schema');

describe('Schema', () => {
  it('validates a good schema', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      weight: {
        type: String
      }
    });

    const dog = {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    };

    expect(schema.validate(dog)).toEqual({
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    });
  });

  it('throws on a bad schema', () => {
    const schema = new Schema({
      name: {
        type: String,
        required: true
      },
      age: {
        type: Number
      },
      weight: {
        type: String
      }
    });

    const dog = {
      age: 'hi',
      weight: '20 lbs'
    };

    expect(() => schema.validate(dog)).toThrowErrorMatchingSnapshot();
  });
});
