const fs = require('fs').promises;

const mkdirp = path => {
  return fs.mkdir(path, { recursive: true });
};

const writeJSON = (path, object) => {
  return fs.writeFile (path, JSON.stringify(object))
    .then(() => object);

};

const readJSON = path => {
  return fs.readFile(path)
    .then(content => JSON.parse(content));
};

const readDirectoryJSON = path => {
  return fs.readdir(path)
    .then(files => {
      return Promise.all(files.map(file => readJSON(`${path}/${file}`)));
    });
};
    
const updateJSON = (path, object) => {
  return readJSON(path)
    .then(json => {
      const updatedJSON = { ...json, ...object };
      return writeJSON(path, updatedJSON);
    });
};

const deleteFile = path => fs.unlink(path);

module.exports = { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile };
