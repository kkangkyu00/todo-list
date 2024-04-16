type Value = string | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type Argument = Value | Mapping;

const appendClass = (value: string, newClass?: string) => {
  if (!newClass) return value;
  if (!value) return newClass;
  return `${value} ${newClass}`;
};

const parseValue = (arg: Argument) => {
  if (typeof arg === 'string' || typeof arg === 'number') return arg;
  if (!arg) return '';

  let classes = '';
  Object.entries(arg).forEach(([value, key]) => {
    if (key) {
      classes = appendClass(classes, value);
    }
  });
  return classes;
};

export const classNames = (...argument: Argument[]) => {
  let classes = '';
  argument.forEach((args) => {
    if (args) {
      classes = appendClass(classes, parseValue(args));
    }
  });
  return classes;
};
