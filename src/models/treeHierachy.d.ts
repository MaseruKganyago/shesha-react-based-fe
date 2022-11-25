import { DataNode } from 'antd/lib/tree';
import { ComponentFormMode } from 'typings/tree-hierachy';
import { DynamicDtoComponentGuid } from 'src/api/component';

export interface IComponentCreateEditState {
  formPath: string;
  mode?: ComponentFormMode;
  componentTypeId: string;
  performanceReportId: string;
}

export interface CustomDataNode extends Omit<DataNode, 'children'> {
  //title: string;
  //key: string;
  adminTreeCreateForm: string;
  iconLevel: string;
  parent: string;
  orderIndex: number;
  ComponentType: string;
  performanceReport: string;
  children: CustomDataNode[];
}

/* export interface ITreeDataDto {
  title: string;
  key: string;
  adminTreeCreateForm: string;
  icon: string;
  children: ITreeDataDto[];
} */
