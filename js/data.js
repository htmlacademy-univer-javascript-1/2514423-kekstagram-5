import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Даниил',
  'Федор',
  'Михаил',
  'Иван',
  'Сергей',
  'Марина',
  'Дмитрий'
];

const createComment = () => ({
  id: createRandomIdFromRangeGenerator(1, 1000) ,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

function createPhoto () {
  const comments = [];
  for (let i = 0; i <= getRandomInteger(0, 30); i++) {
    comments.push(createComment());
  }
  return {
    id: getRandomInteger(1, 25),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: 'фото',
    likes: createRandomIdFromRangeGenerator(15, 200),
    comments: comments
  };
}

function createArrayOfPhotos () {
  const arrayOfPhotos = [];
  for (let i = 0; i < 25; i++) {
    arrayOfPhotos.push(createPhoto());
  }
}

export { createArrayOfPhotos };
