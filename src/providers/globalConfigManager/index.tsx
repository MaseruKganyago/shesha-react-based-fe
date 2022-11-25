import { useGlobalState } from '@shesha/reactjs';
import { EpmRoles, NodeProgressReportStatus } from 'enums';
import { PersonIdRoleNamesDto } from 'models';
import React, { FC, PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { useGet } from 'restful-react';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  GlobalConfigManagerActionsContext,
  GlobalConfigManagerStateContext,
  GLOBAL_CONFIG_MANAGER_CONTEXT_INITIAL_STATE,
} from './contexts';
import { globalConfigManagerReducer } from './reducer';

const EPM_GLOBAL_STATES = Object.freeze({
  CurrentLoggedInPersonId: 'EPM_CURRENT_LOGGED_IN_PERSON_ID',
  ProgressReportStatus: 'PROGRESS_REPORT_STATUS',
});

const GlobalConfigManagerProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(globalConfigManagerReducer, GLOBAL_CONFIG_MANAGER_CONTEXT_INITIAL_STATE);

  const { refetch, data, loading, error } = useGet({
    path: '/api/v1/Epm/Persons/GetCurrentLoggedInPersonIdRoleNames',
    //lazy: true,
  });

  const { setState: setGlobalState } = useGlobalState();

  //#region Assign CurrentPersonId and ProgressReportStatus-context
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      const res = data?.result as PersonIdRoleNamesDto;
      setGlobalState({ key: EPM_GLOBAL_STATES.CurrentLoggedInPersonId, data: res?.id });
      console.log('setted PersonId :>> ');

      const isResponsibleReporting = res?.roles?.includes(EpmRoles.ResponsibleReporting);
      if (isResponsibleReporting) {
        console.log('set :>> ');
        setGlobalState({ key: EPM_GLOBAL_STATES.ProgressReportStatus, data: NodeProgressReportStatus.Outstanding });
      }

      const isUpdater = res?.roles?.includes(EpmRoles.Updater);
      if (isUpdater) {
        setGlobalState({
          key: EPM_GLOBAL_STATES.ProgressReportStatus,
          data: NodeProgressReportStatus.AwaitingLevelOneQA,
        });
      }

      const isApprover = res?.roles?.includes(EpmRoles.Approver);
      if (isApprover) {
        setGlobalState({
          key: EPM_GLOBAL_STATES.ProgressReportStatus,
          data: NodeProgressReportStatus.AwaitingLevelTwoQA,
        });
      }
    }
  }, [data]);
  //#endregion
  return (
    <GlobalConfigManagerStateContext.Provider value={state}>
      <GlobalConfigManagerActionsContext.Provider value={{ ...getFlagSetters(dispatch) /* NEW_ACTION_GOES_HERE */ }}>
        {children}
      </GlobalConfigManagerActionsContext.Provider>
    </GlobalConfigManagerStateContext.Provider>
  );
};

function useGlobalConfigManagerState() {
  const context = useContext(GlobalConfigManagerStateContext);

  if (context === undefined) {
    throw new Error('useGlobalConfigManagerState must be used within a GlobalConfigManagerProvider');
  }

  return context;
}

function useGlobalConfigManagerActions() {
  const context = useContext(GlobalConfigManagerActionsContext);

  if (context === undefined) {
    throw new Error('useGlobalConfigManagerActions must be used within a GlobalConfigManagerProvider');
  }

  return context;
}

function useGlobalConfigManager() {
  return { ...useGlobalConfigManagerState(), ...useGlobalConfigManagerActions() };
}

export {
  GlobalConfigManagerProvider,
  useGlobalConfigManagerState,
  useGlobalConfigManagerActions,
  useGlobalConfigManager,
};
