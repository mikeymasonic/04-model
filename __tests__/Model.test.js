const Schema = require('../lib/Schema');
const { Model } = require('../lib/Model');
const { deleteFile, readDirectoryJSON } = require('../lib/file-system.js');
const fs = require('fs').promises;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String
  }
});

const Dog = new Model('Dog', schema);

describe('Model class', () => {
  
  afterEach(() => {
    return readDirectoryJSON(Dog.modelName)
      .then(dogs => dogs.forEach(dog => deleteFile(`${Dog.modelName}/${dog.id}`)));
  });
  
  afterAll(() => {
    return fs.rmdir(Dog.modelName);
  });
  
  it('creates a new document', () => {
    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        expect(dog).toEqual({
          id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        });
      });
  });

  it('finds by id', () => {
    return Dog
      .create({ 
        name: 'rover',
        age: 10,
        weight: '50 lbs'
      })
      .then(dog => {
        return Dog
          .findById(dog.id);
      })
      .then(foundDog => {
        expect(foundDog).toEqual({
          id: expect.any(String),
          name: 'rover',
          age: 10,
          weight: '50 lbs'
        });
      });
  });

  
  it('finds all items', () => {  
    const Dogs = [{ 
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    }, { 
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    }];
    Dogs.forEach(dog => Dog.create(dog));
  
    return Dog
      .find(Dog.modelName)
      .then(foundDogs => {
        expect(foundDogs).toEqual([{ 
          id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        }, { 
          id: expect.any(String),
          name: 'spot',
          age: 5,
          weight: '20 lbs'
        }]);
      });
  });


  it('finds by id and updates', () => {
    return Dog
      .create({
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        return Dog
          .findByIdAndUpdate(dog.id, { name: 'rover' });
      })
      .then(updatedDog => {
        expect(updatedDog).toEqual({
          id: expect.any(String),
          name: 'rover',
          age: 5,
          weight: '20 lbs'
        });
      });
  });
  
  it('deletes an item', () => {
    return Dog
      .create({ 
        name: 'spot',
        age: 5,
        weight: '20 lbs'
      })
      .then(dog => {
        return Dog
          .findByIdAndDelete(dog.id);
      })
      .then(deletedDog => {
        expect(deletedDog).toEqual(undefined);
      });
  });
});
