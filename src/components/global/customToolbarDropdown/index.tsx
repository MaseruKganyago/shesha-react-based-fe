import { FC, ReactNode, useEffect } from 'react';
import { Dropdown, MenuProps, Space } from 'antd';
import {
  usePerformanceReportAllowedComponentTypesGetFlattenedAllowedComponentTypesByTemplateId,
  FlattenedAllowedComponentTypesDto,
} from 'src/api/performanceReportAllowedComponentTypes';
import _ from 'lodash';
import { useTreeHierachy } from 'providers';

export interface ICustomToolbarDropdownProps {
  onClick: ({ key }: any) => MenuProps['onClick'];
  title: string;
  icon?: ReactNode;
  templateId: string;
  isRootNode?: boolean;
}

const CustomToolbarDropdown: FC<ICustomToolbarDropdownProps> = ({ onClick, icon, title, templateId, isRootNode }) => {
  const { selectedTreeNode } = useTreeHierachy();

  const { data, refetch } = usePerformanceReportAllowedComponentTypesGetFlattenedAllowedComponentTypesByTemplateId({
    lazy: true,
    queryParams: { id: templateId, parentComponentId: selectedTreeNode?.key.toString() },
  });

  const componentTypes: FlattenedAllowedComponentTypesDto[] = (data as any)?.result;
  const items: MenuProps['items'] =
    componentTypes
      ?.filter((a) => a.canBeRoot === isRootNode)
      .map((a) => ({ label: a.componentTypeName, key: `${a.formPath}~${a.componentTypeId}` })) ?? [];

  useEffect(() => {
    if (!_.isEmpty(templateId)) {
      refetch();
    }
  }, [templateId, selectedTreeNode]);

  return (
    <Dropdown menu={{ items, onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {icon && icon}

          {title}
        </Space>
      </a>
    </Dropdown>
  );
};

export default CustomToolbarDropdown;
