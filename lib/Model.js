// const path = require('path');
const uuid = require('uuid/v4');
const {
  mkdirp,
  writeJSON,
  readDirectoryJSON,
  readJSON,
  updateJSON,
  deleteFile
} = require('./file-system');

class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    mkdirp(this.modelName);
  }

  create(obj) {
    const id = uuid();
    const validated = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${id}`, { ...validated, id });
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
}

module.exports = {
  Model
};
