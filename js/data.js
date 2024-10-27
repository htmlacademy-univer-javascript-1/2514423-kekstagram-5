import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
} from './util.js';

export function createPhoto () {
  const comments = [];
  for (let i = 0; i <= getRandomInteger(0, 30); i++) {
    comments.push(createComments());
  }
  return {
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: 'фотография',
    likes: createRandomIdFromRangeGenerator(15, 200),
    comments: comments
  };
}

 export function createArrayOfPhotos () {
  for (let i = 0; i < 25; i++) {
    createPhoto();
  }
}
createArrayOfPhotos();

export{MESSAGES, NAMES, getRandomInteger, createRandomIdFromRangeGenerator};
