import { FormInstance } from 'antd';
import { DynamicDtoComponentGuid } from 'api/component';
import { IComponentCreateEditState } from 'models';
import { CustomDataNode } from 'models/treeHierachy';

export const preparePayload = (
  values: DynamicDtoComponentGuid,
  componentCreateEditState: IComponentCreateEditState,
  selectedTreeNode: CustomDataNode
): DynamicDtoComponentGuid => {
  const isCreateMode = componentCreateEditState?.mode === 'create';

  if (isCreateMode) {
    return {
      ...values,
      componentType: componentCreateEditState?.componentTypeId,
      performanceReport: componentCreateEditState?.performanceReportId,
      parent: selectedTreeNode?.key.toString(),
    };
  } else {
    return {
      ...values,
      componentType: componentCreateEditState?.componentTypeId,
      performanceReport: componentCreateEditState?.performanceReportId,
      parent: selectedTreeNode?.parent,
      id: selectedTreeNode?.key.toString(),
    };
  }
};
