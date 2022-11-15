import React, { useEffect } from 'react';
import { PageWithLayout, Page, IToolbarItem } from '@shesha/reactjs';
import { getLayout } from 'src/components/layouts';
import { CustomToolbarDropdown, TreeHierachy } from 'components';
import { NodeIndexOutlined, PlusOutlined } from '@ant-design/icons';
import { ICustomToolbarDropdownProps } from 'src/components/global/customToolbarDropdown';
import { useGet } from 'restful-react';
import _ from 'lodash';
import { IPerformanceReportDto } from 'models';
import { cTypeFormPathId } from 'src/components/global/customToolbarDropdown/util';
import { useTreeHierachy } from 'providers';
import { ComponentTypeIcons } from 'src/enums/componentTypeIcons';

export const PerfomanceReportPanningPage: PageWithLayout<{ id: string }> = ({ id }) => {
  const { data, refetch, loading } = useGet({
    lazy: true,
    path: '/api/services/Epm/PerformanceReport/Get',
    queryParams: { id },
  });
  const performanceReport: IPerformanceReportDto = data?.result;

  const {
    actionComponentCreate,
    toggleFormRendererMode,
    fetchTreeDataRequest,
    selectedTreeNode,
    storeSelectedTreeNode,
  } = useTreeHierachy();
  const isOnParentableNode =
    !_.isEmpty(selectedTreeNode?.key) && selectedTreeNode?.iconLevel !== ComponentTypeIcons.Level5;

  useEffect(() => {
    storeSelectedTreeNode(null);
    fetchTreeDataRequest();
    if (!_.isEmpty(id)) refetch();
  }, []);

  const onClick = ({ key }) => {
    const { componentTypeId, formPath } = cTypeFormPathId(key);
    actionComponentCreate({ componentTypeId, formPath, performanceReportId: id });
    toggleFormRendererMode('editable');
  };

  const TOP_LEVEL_DROPDOWN: ICustomToolbarDropdownProps = {
    onClick: onClick as any,
    templateId: performanceReport?.template,
    title: 'Add Top Level Item',
    isRootNode: true,
    icon: <PlusOutlined />,
  };
  const CHILD_ITEM_DROPDOWN: ICustomToolbarDropdownProps = {
    onClick: onClick as any,
    templateId: performanceReport?.template,
    title: 'Add Child Item',
    isRootNode: false,
    icon: <NodeIndexOutlined />,
  };

  const toolbarItems: IToolbarItem[] = [
    {
      title: <CustomToolbarDropdown {...TOP_LEVEL_DROPDOWN} />,
    },
    {
      title: <CustomToolbarDropdown {...CHILD_ITEM_DROPDOWN} />,
      disabled: !isOnParentableNode,
    },
  ];

  return (
    <Page title={`${performanceReport?.name}`} toolbarItems={toolbarItems} loading={loading}>
      <TreeHierachy />
    </Page>
  );
};

PerfomanceReportPanningPage.getLayout = getLayout;

export default PerfomanceReportPanningPage;
