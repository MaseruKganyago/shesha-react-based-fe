import { Button, FormInstance, message, Space } from 'antd';
import { DynamicDtoComponentGuid, useComponentCreate } from 'api/component';
import { useRouter } from 'next/router';
import { useTreeHierachy } from 'providers';
import { FC } from 'react';
import { preparePayload } from './util';

interface IMaintenanceFormsSaveCancelButton {
  form: FormInstance<DynamicDtoComponentGuid>;
}

interface IApiVerbPath {
  verb: string;
  path: string;
}

const MaintenanceFormsSaveCancelButton: FC<IMaintenanceFormsSaveCancelButton> = ({ form }) => {
  const { componentCreateEditState, selectedTreeNode, fetchTreeDataRequest, toggleFormRendererMode } =
    useTreeHierachy();

  const isCreateMode = componentCreateEditState?.mode === 'create';
  const verbPath: IApiVerbPath = isCreateMode ? { verb: 'POST', path: 'Create' } : { verb: 'PUT', path: 'Update' };

  const { mutate: createUpdateComponentHttp, loading } = useComponentCreate({});

  const {
    query: { id },
  } = useRouter();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = preparePayload(values, componentCreateEditState, selectedTreeNode);
      createUpdateComponentHttp(payload).then((res) => {
        if ((res as any)?.success) {
          message.success(`Component was succesfull ${verbPath?.path}d.`);
          toggleFormRendererMode(null);
          fetchTreeDataRequest(id.toString());
        }
      });
    });
  };

  const handleCancel = () => {
    toggleFormRendererMode(null);
  };

  return (
    <Space>
      <Button onClick={handleCancel}>Cancel</Button>

      <Button type="primary" onClick={handleSubmit} loading={loading}>
        Save
      </Button>
    </Space>
  );
};

export default MaintenanceFormsSaveCancelButton;
