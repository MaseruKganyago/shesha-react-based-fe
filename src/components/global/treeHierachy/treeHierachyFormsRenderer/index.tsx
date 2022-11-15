import React, { FC, Fragment, useEffect } from 'react';
import _ from 'lodash';
import { Empty } from 'antd';
import { TreeHierachyMaintenanceForms } from 'components';
import { useGet } from 'restful-react';
import { useTreeHierachy } from 'providers';
import { MODULE_NAME } from 'app-constants';
import { nameFromFormModuleName } from 'utils/string';

interface ITreeHierachyFormsRendererProps {}

const TreeHierachyFormsRenderer: FC<ITreeHierachyFormsRendererProps> = ({}) => {
  const { componentCreateEditState, formRendererMode } = useTreeHierachy();

  const { refetch, data } = useGet({
    lazy: true,
    path: '/api/services/Shesha/FormConfiguration/GetByName',
    queryParams: { module: MODULE_NAME, name: nameFromFormModuleName(MODULE_NAME, componentCreateEditState?.formPath) },
  });
  const formDetails = data?.result;

  useEffect(() => {
    if (!_.isEmpty(componentCreateEditState?.formPath)) refetch();
  }, [componentCreateEditState?.formPath]);

  const renderForms = () => {
    switch (formRendererMode) {
      case 'editable':
        return <TreeHierachyMaintenanceForms formId={formDetails?.id} />;

      case 'readonly':
        return <Empty />;

      default:
        return <Empty />;
    }
  };

  return <Fragment>{renderForms()}</Fragment>;
};

export default TreeHierachyFormsRenderer;
