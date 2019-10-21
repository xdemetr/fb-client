const required = value => {
  if (value) return undefined;
  return 'Обязательное поле';
};

const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const positiveNumber = value => value && (isNaN(Number(value)) || Number(value) <= 0) ? 'Must be a positive number' : undefined;

const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Почта указана неверно' : undefined;

const minValue = min => value =>
    value && value.length < min ? `Должно быть не менее ${min} симв.` : undefined;

export {
  required,
  number,
  positiveNumber,
  email,
  minValue
}
