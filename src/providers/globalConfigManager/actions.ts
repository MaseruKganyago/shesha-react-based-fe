import { createAction } from 'redux-actions';
import { IGlobalConfigManagerStateContext } from './contexts';

export enum GlobalConfigManagerActionEnums {
  DefaultAction = 'DEFAULT_ACTION',
  StoreSelectedComponentIdGlobally = 'STORE_SELECTED_COMPONENT_ID_GLOBALLY',
  /* NEW_ACTION_TYPE_GOES_HERE */
}

export const defaultAction = createAction<IGlobalConfigManagerStateContext>(
  GlobalConfigManagerActionEnums.DefaultAction,
  () => ({})
);

export const storeSelectedComponentIdGloballyAction = createAction<IGlobalConfigManagerStateContext>(
  GlobalConfigManagerActionEnums.StoreSelectedComponentIdGlobally,
  () => ({})
);
/* NEW_ACTION_GOES_HERE */
