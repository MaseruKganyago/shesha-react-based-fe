import {
  AppstoreFilled,
  BulbTwoTone,
  RightCircleTwoTone,
  SafetyCertificateTwoTone,
  StarTwoTone,
  WarningTwoTone,
} from '@ant-design/icons';
import { CustomDataNode } from 'models/treeHierachy';
import { Children, FC } from 'react';
import { ComponentTypeIcons } from 'src/enums/componentTypeIcons';

export interface ITreeNodeIconRenderer {
  iconLevel: string;
}

const TreeNodeIconRenderer: FC<ITreeNodeIconRenderer> = ({ iconLevel }) => {
  switch (iconLevel) {
    case ComponentTypeIcons.Level1:
      return <AppstoreFilled />;

    case ComponentTypeIcons.Level2:
      return <RightCircleTwoTone twoToneColor="#FFA500" />;

    case ComponentTypeIcons.Level3:
      return <StarTwoTone twoToneColor="#632000" />;

    case ComponentTypeIcons.Level4:
      return <BulbTwoTone twoToneColor="#E0B0FF" />;

    case ComponentTypeIcons.Level5:
      return <SafetyCertificateTwoTone twoToneColor="#E32227" />;

    default:
      return <WarningTwoTone twoToneColor="#FF0000" />;
  }
};

export default TreeNodeIconRenderer;

export const assignNodeIcons = (node: CustomDataNode): CustomDataNode => {
  return {
    ...node,
    icon: <TreeNodeIconRenderer iconLevel={node?.iconLevel} />,
    children: node?.children?.map((childNode) => assignNodeIcons(childNode)),
  };
};
