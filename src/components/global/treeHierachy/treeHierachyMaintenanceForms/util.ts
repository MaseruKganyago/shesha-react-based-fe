import { FormInstance } from 'antd';
import { DynamicDtoComponentGuid } from 'api/component';
import { IComponentCreateEditState } from 'models';
import { ComponentDto } from 'models/component';
import { CustomDataNode } from 'models/treeHierachy';

export const preparePayload = (
  values: DynamicDtoComponentGuid,
  componentCreateEditState: IComponentCreateEditState,
  selectedTreeNode: CustomDataNode
) => {
  const isCreateMode = componentCreateEditState?.mode === 'create';

  if (isCreateMode) {
    return {
      ...values,
      componentType: componentCreateEditState?.componentTypeId,
      performanceReport: componentCreateEditState?.performanceReportId,
      parent: selectedTreeNode?.key,
    };
  } else {
    return {
      ...values,
      componentType: componentCreateEditState?.componentTypeId,
      performanceReport: componentCreateEditState?.performanceReportId,
      parent: selectedTreeNode?.parent,
      id: selectedTreeNode?.key,
    };
  }
};

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
