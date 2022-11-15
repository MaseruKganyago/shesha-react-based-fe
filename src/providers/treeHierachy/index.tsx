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
  toggleFormRendererModeAction,
} from './actions';
import { TreeHierachyActionsContext, TreeHierachyStateContext, TREE_HIERACHY_CONTEXT_INITIAL_STATE } from './contexts';
import { treeHierachyReducer } from './reducer';

export interface ITreeHierachyProviderProps {}

const TreeHiearachyProvider: FC<PropsWithChildren<ITreeHierachyProviderProps>> = ({ children }) => {
  const [state, dispatch] = useReducer(treeHierachyReducer, {
    ...TREE_HIERACHY_CONTEXT_INITIAL_STATE,
  });

  //#region fetch treeData related code
  const { refetch, data, loading, error } = useGet({ path: '/api/v1/Epm/Components/GetTreeDataJson', lazy: true });

  useEffect(() => {
    if (data && !loading) {
      const treeData = JSON.parse(data?.result) as CustomDataNode[];

      dispatch(fetchTreeDataSuccessAction(treeData));
    } else if (error) {
      dispatch(fetchTreeDataErrorAction(error));
    }
  }, [loading]);

  const fetchTreeDataRequest = () => {
    dispatch(fetchTreeDataRequestAction());
    refetch();
  };
  //#endregion

  const actionComponentCreate = (state: IComponentCreateEditState) => {
    dispatch(actionComponentCreateAction(state));
  };

  const toggleFormRendererMode = (mode: FormRendererMode) => {
    dispatch(toggleFormRendererModeAction(mode));
  };

  const storeSelectedTreeNode = (node: CustomDataNode) => {
    dispatch(storeSelectedTreeNodeAction(node));
  };

  const actionComponentEdit = (state: IComponentCreateEditState) => {
    dispatch(actionComponentEditAction(state));
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
