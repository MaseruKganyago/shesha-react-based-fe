import { DynamicDtoComponentGuid } from 'api/component';
import { FlattenedAllowedComponentTypesDto } from 'models';
import { IComponentCreateEditState, CustomDataNode } from 'models/treeHierachy';
import { createAction } from 'redux-actions';
import { FormRendererMode } from 'typings/tree-hierachy';
import { ITreeHierachyStateContext } from './contexts';

export enum TreeHierachyActionEnums {
  StoreComponentTypes = 'STORE_COMPONENT_TYPES',
  ActionComponentCreate = 'ACTION_COMPONENT_CREATE',
  ToggleFormRendererMode = 'TOGGLE_FORM_RENDERER_MODE',
  FetchTreeDataRequest = 'FETCH_TREE_DATA_REQUEST',
  FetchTreeDataSuccess = 'FETCH_TREE_DATA_SUCCESS',
  FetchTreeDataError = 'FETCH_TREE_DATA_ERROR',
  StoreSelectedTreeNode = 'STORE_SELECTED_TREE_NODE',
  ActionComponentEdit = 'ACTION_COMPONENT_EDIT',
  StoreTreeComponent = 'STORE_TREE_COMPONENT',
}

export const storeComponentTypesAction = createAction<ITreeHierachyStateContext, FlattenedAllowedComponentTypesDto>(
  TreeHierachyActionEnums.StoreComponentTypes,
  (componentTypes) => ({ componentTypes })
);

export const actionComponentCreateAction = createAction<ITreeHierachyStateContext, IComponentCreateEditState>(
  TreeHierachyActionEnums.ActionComponentCreate,
  (componentCreateEditState) => ({ componentCreateEditState: { ...componentCreateEditState, mode: 'create' } })
);

export const toggleFormRendererModeAction = createAction<ITreeHierachyStateContext, FormRendererMode>(
  TreeHierachyActionEnums.ToggleFormRendererMode,
  (formRendererMode) => ({ formRendererMode })
);

export const fetchTreeDataRequestAction = createAction<ITreeHierachyStateContext>(
  TreeHierachyActionEnums.FetchTreeDataRequest,
  () => ({})
);

export const fetchTreeDataSuccessAction = createAction<ITreeHierachyStateContext, CustomDataNode[]>(
  TreeHierachyActionEnums.FetchTreeDataSuccess,
  (treeData) => ({ treeData })
);

export const fetchTreeDataErrorAction = createAction<ITreeHierachyStateContext, any>(
  TreeHierachyActionEnums.FetchTreeDataError,
  (fetchTreeDataErr) => ({ fetchTreeDataErr })
);

export const storeSelectedTreeNodeAction = createAction<ITreeHierachyStateContext, CustomDataNode>(
  TreeHierachyActionEnums.StoreSelectedTreeNode,
  (selectedTreeNode) => ({ selectedTreeNode })
);

export const actionComponentEditAction = createAction<ITreeHierachyStateContext, IComponentCreateEditState>(
  TreeHierachyActionEnums.ActionComponentEdit,
  (componentCreateEditState) => ({ componentCreateEditState: { ...componentCreateEditState, mode: 'edit' } })
);

export const storeTreeComponentAction = createAction<ITreeHierachyStateContext, DynamicDtoComponentGuid>(
  TreeHierachyActionEnums.StoreTreeComponent,
  (selectedComponentDetails) => ({ selectedComponentDetails })
);
