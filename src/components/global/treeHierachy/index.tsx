import { Divider, Tree, TreeProps, Typography } from 'antd';
import { EventDataNode } from 'antd/lib/tree';
import { FC } from 'react';
import { TreeeContainer, TreeHierachyContainer, TreeSelectedInfo } from './styles';
import { TreeHierachyFormsRenderer, TreeNodeIconRenderer } from 'components';
import { useTreeHierachy } from 'providers';
import { CustomDataNode } from 'models/treeHierachy';
import { assignNodeIcons } from '../treeNodeIconRenderer';

interface IProps extends TreeProps {}

const { Title } = Typography;

const TreeHierachy: FC<IProps> = ({}) => {
  const { treeData, storeSelectedTreeNode, actionComponentEdit, toggleFormRendererMode } = useTreeHierachy();
  const ICONED_TREE_DATA = treeData?.map((a) => assignNodeIcons(a));

  const onSelect = (key: React.Key[], info: any) => {
    const selectedNode = info.node as EventDataNode<CustomDataNode>;
    console.log('selectedNode :>> ', selectedNode);

    storeSelectedTreeNode(selectedNode);
    actionComponentEdit({
      componentTypeId: selectedNode?.ComponentType,
      formPath: selectedNode?.adminTreeCreateForm,
      performanceReportId: selectedNode?.performanceReport,
    });
    toggleFormRendererMode('editable');
  };

  return (
    <TreeHierachyContainer sizes={[55, 45]} cursor="col-resize">
      <TreeeContainer className="tree-container">
        <Title level={4}>Tree Hierachy</Title>
        <Divider />

        <div style={{ marginBottom: '5px' }} />

        <Tree showIcon showLine treeData={ICONED_TREE_DATA} onSelect={onSelect} />
      </TreeeContainer>

      <TreeSelectedInfo className="tree-selected-info">
        <TreeHierachyFormsRenderer />
      </TreeSelectedInfo>
    </TreeHierachyContainer>
  );
};

export default TreeHierachy;
