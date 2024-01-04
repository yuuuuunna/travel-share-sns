export const PASSWORD_VALIDATION_CONDITION = [
  {
    name: '영문자 포함',
    validateFunction: (message) => {
      return /(?=.*[a-zA-Z])/.exec(message) !== null;
    },
  },
  {
    name: '숫자 포함',
    validateFunction: (message) => {
      return /(?=.*[0-9])/.exec(message) !== null;
    },
  },
  {
    name: '특수문자 포함',
    validateFunction: (message) => {
      return /(?=.*[!@#$%^&*?_])/.exec(message) !== null;
    },
  },
  {
    name: '8자 이상',
    validateFunction: (message) => {
      return message.length >= 8;
    },
  },
];
