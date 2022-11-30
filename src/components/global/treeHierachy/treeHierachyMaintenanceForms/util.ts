import { FormInstance } from 'antd';
import { DynamicDtoComponentGuid } from 'api/component';

export const prepareFormForEdit = (form: FormInstance<DynamicDtoComponentGuid>, component: DynamicDtoComponentGuid) => {
  form.setFieldsValue({
    ...component,
  });
};

export const initiateValues = (component: DynamicDtoComponentGuid): DynamicDtoComponentGuid => {
  return {
    ...component,
  };
};

export const initiateCreateValues = (component: DynamicDtoComponentGuid): DynamicDtoComponentGuid => {
  return {
    parent: component?.id,
  };
};
