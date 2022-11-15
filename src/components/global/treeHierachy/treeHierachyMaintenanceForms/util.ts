import { FormInstance } from 'antd';
import { IComponentCreateEditState } from 'models';
import { ComponentDto } from 'models/component';
import { CustomDataNode } from 'models/treeHierachy';

export const preparePayload = (
  values: ComponentDto,
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

export const prepareFormForEdit = (form: FormInstance<ComponentDto>, selectedTreeNode: CustomDataNode) => {
  form.setFieldsValue({
    id: selectedTreeNode?.key.toString(),
    orderIndex: selectedTreeNode?.orderIndex,
    name: selectedTreeNode?.title.toString(),
    parent: selectedTreeNode?.parent,
  });
};

export const initiateValues = (selectedTreeNode: CustomDataNode) => {
  return {
    id: selectedTreeNode?.key.toString(),
    orderIndex: selectedTreeNode?.orderIndex,
    name: selectedTreeNode?.title.toString(),
    parent: selectedTreeNode?.parent,
  };
};
