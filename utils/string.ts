export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return null;

  return `${str.charAt(0).toUpperCase()}${str.substr(1)}`;
};

export const addPropValidation = <T = unknown>(
  obj: { [k: string]: unknown } | { [k: string]: unknown }[],
  keys: string[]
): T => {
  let payload = {};

  if (obj && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      payload = obj.map((item) => addPropValidation(item, keys));
    } else {
      Object.keys(obj).forEach((propName) => {
        if (keys.includes(propName)) {
          payload = { ...payload, [propName]: obj[propName] };
        }
      });
    }
  }

  return payload as T;
};

export const camelCase = <T = object>(obj: object): T => {
  const newObj = {};
  for (const d in obj) {
    if (obj.hasOwnProperty(d)) {
      newObj[
        d.toLowerCase().replace(/(_\w)/g, function (k) {
          return k[1].toUpperCase();
        })
      ] = obj[d];
    }
  }
  return newObj as T;
};

export const nameFromFormModuleName = (module: string, str: string): string => {
  const modulePath = `${module}/ `.replace(' ', '');
  const splitVal = modulePath.substring(modulePath.length - 1, modulePath.length);

  return str?.split(splitVal)[1];
};
