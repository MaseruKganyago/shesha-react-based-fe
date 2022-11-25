import { DynamicDtoComponentGuid } from 'api/component';
import { FlattenedAllowedComponentTypesDto, IFlagsSetters, IFlagsState } from 'models';
import { IComponentCreateEditState, CustomDataNode } from 'models/treeHierachy';
import { createContext } from 'react';
import { FormRendererMode } from 'typings/tree-hierachy';

export type IFlagProgressFlags = 'fetchTreeData'; /* NEW_IN_PROGRESS_FLAG_GOES_HERE */
export type IFlagSucceededFlags = 'fetchTreeData'; /* NEW_SUCCEEDED_FLAG_GOES_HERE */
export type IFlagErrorFlags = 'fetchTreeData'; /* NEW_ERROR_FLAG_GOES_HERE */
export type IFlagActionedFlags = '__DEFAULT__' /* NEW_ACTIONED_FLAG_GOES_HERE */;

export interface ITreeHierachyStateContext
  extends IFlagsState<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  componentTypes?: FlattenedAllowedComponentTypesDto;
  componentCreateEditState?: IComponentCreateEditState;
  formRendererMode?: FormRendererMode;
  treeData?: CustomDataNode[];
  fetchTreeDataErr?: any;
  selectedTreeNode?: CustomDataNode;
  selectedComponentDetails?: DynamicDtoComponentGuid;
}

export interface ITreeHierachyActionsContext
  extends IFlagsSetters<IFlagProgressFlags, IFlagSucceededFlags, IFlagErrorFlags, IFlagActionedFlags> {
  /* NEW_ACTION_ACTION_DECLARATION_GOES_HERE */
  actionComponentCreate: (state: IComponentCreateEditState) => void;
  toggleFormRendererMode: (mode: FormRendererMode) => void;
  fetchTreeDataRequest: (performanceReportId: string) => void;
  storeSelectedTreeNode: (node: CustomDataNode) => void;
  actionComponentEdit: (state: IComponentCreateEditState) => void;
  storeTreeComponent: (component: DynamicDtoComponentGuid) => void;
}

export const TREE_HIERACHY_CONTEXT_INITIAL_STATE: ITreeHierachyStateContext = {
  isInProgress: {},
  succeeded: {},
  error: {},
  actioned: {},
};

export const TreeHierachyStateContext = createContext<ITreeHierachyStateContext>(TREE_HIERACHY_CONTEXT_INITIAL_STATE);

export const TreeHierachyActionsContext = createContext<ITreeHierachyActionsContext>(undefined);
