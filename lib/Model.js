const path = require('path');
const uuid = require('uuid/v4');
const {
  mkdirp,
  writeJSON,
  readDirectoryJSON,
  readJSON,
  updateJSON,
  deleteFile

} = require('./file-system');

module.exports = class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    mkdirp(this.modelName);
  }

  create(obj) {
    const _id = uuid();
    const validated = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${_id}`, { ...validated, _id });
  }

  findById(id) {
    return readJSON(`${this.modelName}/${id}`);
  }

  find() {
    return readDirectoryJSON(`${this.modelName}`);
  }

  findByIdAndUpdate(id, patchObj) {
    return updateJSON(`${this.modelName}/${id}`, patchObj);
  }

  findByIdAndDelete(id) {
    return deleteFile(`${this.modelName}/${id}`);
  }
};
