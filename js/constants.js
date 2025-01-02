export const ALERT_SHOW_TIME = 5000;
export const RANDOM_PICTURES_COUNT = 10;
export const COMMENTS_STEP = 5;
export const MAX_COMMENT_SYMBOL = 140;
export const MAX_COUNT_HASHTAG = 5;
export const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
export const HashtagError = {
  IS_NOT_VALID: 'Xештег не валиден',
  IS_NOT_UNIQUE: 'Xештеги не должны совпадать',
  IS_NOT_VALID_COUNT: `Xештегов должно быть не больше ${MAX_COUNT_HASHTAG}`,
};

export const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

export const SubmitButtonText = {
  DEFAULT: 'Сохранить',
  SENDING: 'Сохраняю...'
};

export const Scale = {
  DEFAULT_SCALE: 100,
  MAX_SCALE: 100,
  MIN_SCALE: 25,
  STEP_SCALE: 25,
};

export const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

export const EffectSetting = {
  [Effect.DEFAULT]: {
    FILTER: '',
    MIN: 0,
    MAX: 0,
    STEP: 0,
    UNIT: '',
  },
  [Effect.CHROME]: {
    FILTER: 'grayscale',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  [Effect.SEPIA]: {
    FILTER: 'sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    UNIT: '',
  },
  [Effect.MARVIN]: {
    FILTER: 'invert',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    UNIT: '%',
  },
  [Effect.PHOBOS]: {
    FILTER: 'blur',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    UNIT: 'px',
  },
  [Effect.HEAT]: {
    FILTER: 'brightness',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    UNIT: '',
  },
};
