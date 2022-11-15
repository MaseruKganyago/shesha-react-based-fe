export interface IFormPathId {
  componentTypeId: string;
  formPath: string;
}

export const cTypeFormPathId = (val: string): IFormPathId => {
  const splitVal = val.split('~');

  return {
    formPath: splitVal[0],
    componentTypeId: splitVal[1],
  };
};
