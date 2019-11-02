const required = (value:string) => {
  if (value) return undefined;
  return 'Обязательное поле';
};

const number = (value:string) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const positiveNumber = (value:string) => value && (isNaN(Number(value)) || Number(value) <= 0) ? 'Must be a positive' +
    ' number' : undefined;

const email = (value:string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Почта указана неверно' : undefined;

const minValue = (min:number) => (value:string) =>
    value && value.length < min ? `Должно быть не менее ${min} симв.` : undefined;

export {
  required,
  number,
  positiveNumber,
  email,
  minValue
}
