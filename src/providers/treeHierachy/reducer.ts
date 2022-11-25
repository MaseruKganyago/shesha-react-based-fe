import flagsReducer from '../utils/flagsReducer';
import { TreeHierachyActionEnums } from './actions';
import { ITreeHierachyStateContext } from './contexts';

export function treeHierachyReducer(
  incomingState: ITreeHierachyStateContext,
  action: ReduxActions.Action<ITreeHierachyStateContext>
): ITreeHierachyStateContext {
  //#region Register flags reducer
  const state = flagsReducer(incomingState, action);

  const { type, payload } = action;
  //#endregion

  switch (type) {
    case TreeHierachyActionEnums.StoreComponentTypes:
    case TreeHierachyActionEnums.ActionComponentCreate:
    case TreeHierachyActionEnums.ToggleFormRendererMode:
    case TreeHierachyActionEnums.FetchTreeDataRequest:
    case TreeHierachyActionEnums.FetchTreeDataSuccess:
    case TreeHierachyActionEnums.FetchTreeDataError:
    case TreeHierachyActionEnums.StoreSelectedTreeNode:
    case TreeHierachyActionEnums.ActionComponentEdit:
      case TreeHierachyActionEnums.StoreTreeComponent:	
/* NEW_ACTION_ENUM_GOES_HERE */


      return {
        ...state,
        ...payload,
      };

    default: {
      return state;
    }
  }
}
