import { Button, message } from 'antd';
import { useTreeHierachy } from 'providers';
import { FC } from 'react';
import { useMutate } from 'restful-react';
import { DeleteButton } from './styles';

interface IMaintenanceFormDeleteButton {
  isCreateMode: boolean;
}

export const MaintenaceFormDeleteButton: FC<IMaintenanceFormDeleteButton> = ({ isCreateMode }) => {
  const { selectedTreeNode, fetchTreeDataRequest, toggleFormRendererMode } = useTreeHierachy();

  const { mutate: deleteComponent, loading } = useMutate({
    path: `/api/services/Epm/Component/Delete`,
    verb: 'DELETE',
    queryParams: { id: selectedTreeNode?.key },
  });

  const handleDelete = () => {
    deleteComponent({}).then((res) => {
      if (res?.success) {
        message.success(`Component was succesfull Deleted.`);
        fetchTreeDataRequest();
        toggleFormRendererMode(null);
      }
    });
  };

  return (
    <DeleteButton className="delete-btn">
      <Button onClick={handleDelete} type="primary" danger disabled={isCreateMode} loading={loading}>
        Delete
      </Button>
    </DeleteButton>
  );
};

export default MaintenaceFormDeleteButton;
