const { getCaster } = require('./types');

module.exports = class Validator {
  // Validator takes two (three in my case) properties
  // field - which is the field we are going to validate
  // configuration - which gives us info about how to validate
  constructor(field, { type, required }) {
    this.field = field;
    this.type = type;
    this.required = required;
    // getCaster(String) -> castToString
    // getCaster(Number) -> castToNumber
    // getCaster(Boolean) -> castToBoolean
    this.caster = getCaster(type);
  }
  // obj - is the object we want to run through validation
  validate(obj) {
    // if field is required and missing
    const val = obj[this.field];
    if(this.required && !val) throw new Error(`${this.field} is required`);
    if(!this.required && !val) return null;

    return this.caster(val);
  }
};
