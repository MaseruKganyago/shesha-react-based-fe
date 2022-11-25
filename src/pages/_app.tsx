require('@shesha/reactjs/dist/styles.less');
require('antd/dist/antd.less');
require('src/styles/custom-n-progress.less');

import { designerConfig } from '@shesha/module-his';
import {
  DynamicModalProvider,
  GlobalStateProvider,
  PageWithLayout,
  ShaApplicationProvider,
  StoredFilesProvider,
  UiProvider,
} from '@shesha/reactjs';
import { CustomErrorBoundary, CustomNProgress } from 'components';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { GlobalConfigManagerProvider, TreeHiearachyProvider } from 'providers';
import React, { useEffect } from 'react';
import { BASE_URL } from 'src/api/utils/constants';
import { StyledThemeProvider } from 'src/definitions/styled-components';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    setAppInsights();
  }, []);

  const setAppInsights = () => {
    // Register Application Insights
    if (process.browser && process.env.NODE_ENV === 'production') {
      import('utils/applicationInsights').then(({ initAppInsights }) => {
        initAppInsights();
      });
    }
  };

  // Use the layout defined at the page level, if available
  const getLayout = (Component as PageWithLayout<any>).getLayout ?? ((page) => page);
  return (
    <CustomErrorBoundary>
      <StyledThemeProvider>
        <GlobalStateProvider>
          <ShaApplicationProvider backendUrl={BASE_URL} router={router as any} toolboxComponentGroups={designerConfig}>
            <DynamicModalProvider>
              <CustomNProgress />
              <StoredFilesProvider baseUrl={BASE_URL} ownerId={''} ownerType={''}>
                <GlobalConfigManagerProvider>
                  <TreeHiearachyProvider>
                    <UiProvider>{getLayout(<Component {...(router?.query || {})} {...pageProps} />)}</UiProvider>
                  </TreeHiearachyProvider>
                </GlobalConfigManagerProvider>
              </StoredFilesProvider>
            </DynamicModalProvider>
          </ShaApplicationProvider>
        </GlobalStateProvider>
      </StyledThemeProvider>
    </CustomErrorBoundary>
  );
}

export default MyApp;
