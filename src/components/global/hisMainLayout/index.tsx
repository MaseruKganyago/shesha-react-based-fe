import { IMainLayoutProps, MainLayout } from '@shesha/reactjs';
import React, { FC } from 'react';
import CustomComponent from './customComponent';

const HisMainLayout: FC<IMainLayoutProps> = (props) => {
  return (
    <MainLayout {...props} customComponent={<CustomComponent />}>
      {props.children}
    </MainLayout>
  );
};

export default HisMainLayout;
