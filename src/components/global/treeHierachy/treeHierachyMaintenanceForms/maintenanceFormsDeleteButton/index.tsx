import { Button, message, notification, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import { useTreeHierachy } from 'providers';
import { FC } from 'react';
import { useMutate } from 'restful-react';
import { DeleteButton } from './styles';

interface IMaintenanceFormsDeleteButton {}

const MaintenanceFormsDeleteButton: FC<IMaintenanceFormsDeleteButton> = () => {
  const { componentCreateEditState, selectedTreeNode, fetchTreeDataRequest } = useTreeHierachy();
  const {
    query: { id },
  } = useRouter();

  const isCreateMode = componentCreateEditState?.mode === 'create';

  const { mutate: deleteComponent, loading: isDeleting } = useMutate({
    path: `/api/services/Epm/Component/Delete`,
    verb: 'DELETE',
    queryParams: { id: selectedTreeNode?.key },
  });

  const handleDelete = () => {
    if (selectedTreeNode?.children.length > 0)
      notification.error({
        message: 'Item has sub-item(s).',
        description: "Can't delete Item, with sub-items. Move sub-items in a different parent item in before deleting.",
        duration: 10,
      });
    else
      deleteComponent({}).then((res) => {
        if (res?.success) {
          message.success(`Component was succesfull Deleted.`);
          fetchTreeDataRequest(id.toString());
        }
      });
  };

  console.log('selectedTreeNode :>> ', selectedTreeNode);
  return (
    <DeleteButton className="delete-btn">
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger disabled={isCreateMode} loading={isDeleting}>
          Delete
        </Button>
      </Popconfirm>
    </DeleteButton>
  );
};

export default MaintenanceFormsDeleteButton;
