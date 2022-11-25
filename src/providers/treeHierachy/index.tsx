import axios from 'axios';
import { IComponentCreateEditState, CustomDataNode } from 'models/treeHierachy';
import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { useGet } from 'restful-react';
import { FormRendererMode } from 'typings/tree-hierachy';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  actionComponentCreateAction,
  actionComponentEditAction,
  fetchTreeDataErrorAction,
  fetchTreeDataRequestAction,
  fetchTreeDataSuccessAction,
  storeSelectedTreeNodeAction,
  storeTreeComponentAction,
  toggleFormRendererModeAction,
} from './actions';
import { TreeHierachyActionsContext, TreeHierachyStateContext, TREE_HIERACHY_CONTEXT_INITIAL_STATE } from './contexts';
import { treeHierachyReducer } from './reducer';
import { BASE_URL } from 'src/api/utils/constants';
import { DynamicDtoComponentGuid, useComponentGet } from 'api/component';
import { message } from 'antd';

export interface ITreeHierachyProviderProps {}

const TreeHiearachyProvider: FC<PropsWithChildren<ITreeHierachyProviderProps>> = ({ children }) => {
  const [state, dispatch] = useReducer(treeHierachyReducer, {
    ...TREE_HIERACHY_CONTEXT_INITIAL_STATE,
  });

  //#region fetch treeData related code
  const fetchTreeDataRequest = (performanceReportId: string) => {
    dispatch(fetchTreeDataRequestAction());

    axios
      .get(`${BASE_URL}/api/v1/Epm/Components/GetTreeDataJson?performanceReportId=${performanceReportId}`)
      .then((res) => {
        const treeData = JSON.parse(res?.data?.result) as CustomDataNode[];

        dispatch(fetchTreeDataSuccessAction(treeData));
      })
      .catch((err) => {
        dispatch(fetchTreeDataErrorAction(err));
      });
  };
  //#endregion

  //#region fetch component data
  const { refetch, data, loading, error } = useComponentGet({ lazy: true });

  useEffect(() => {
    if (data && !loading) {
      const component = (data as any)?.result;
      storeTreeComponent(component);
    } else if (error) message.error('Something went wrong retrieving component details.');
  }, [data]);
  //#endregion

  const actionComponentCreate = (state: IComponentCreateEditState) => {
    dispatch(actionComponentCreateAction(state));
  };

  const toggleFormRendererMode = (mode: FormRendererMode) => {
    dispatch(toggleFormRendererModeAction(mode));
  };

  const storeSelectedTreeNode = (node: CustomDataNode) => {
    dispatch(storeSelectedTreeNodeAction(node));

    refetch({ queryParams: { id: node?.key?.toString() } });
  };

  const actionComponentEdit = (state: IComponentCreateEditState) => {
    dispatch(actionComponentEditAction(state));
  };

  const storeTreeComponent = (component: DynamicDtoComponentGuid) => {
    dispatch(storeTreeComponentAction(component));
  };

  return (
    <TreeHierachyStateContext.Provider value={state}>
      <TreeHierachyActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          actionComponentCreate,
          toggleFormRendererMode,
          fetchTreeDataRequest,
          storeSelectedTreeNode,
          actionComponentEdit,
          storeTreeComponent,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </TreeHierachyActionsContext.Provider>
    </TreeHierachyStateContext.Provider>
  );
};

function useTreeHierachyState() {
  const context = useContext(TreeHierachyStateContext);

  if (context === undefined) {
    throw new Error('useTreeHierachyState must be used within a TreeHierachyProvider');
  }

  return context;
}

function useTreeHierachyActions() {
  const context = useContext(TreeHierachyActionsContext);

  if (context === undefined) {
    throw new Error('useTreeHierachyActions must be used within a TreeHierachyProvider');
  }

  return context;
}

function useTreeHierachy() {
  return { ...useTreeHierachyState(), ...useTreeHierachyActions() };
}

export { TreeHiearachyProvider, useTreeHierachyState, useTreeHierachyActions, useTreeHierachy };
