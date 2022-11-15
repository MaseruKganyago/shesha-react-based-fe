import { ConfigurableForm } from '@shesha/reactjs';
import { Button, Divider, Form, message, Result, Space } from 'antd';
import _ from 'lodash';
import { ComponentDto } from 'models/component';
import { useTreeHierachy } from 'providers';
import { FC, useEffect } from 'react';
import { useMutate } from 'restful-react';
import { DeleteButton, TreeHierachyMaintenanceBtnsFooter } from './styles';
import { initiateValues, prepareFormForEdit, preparePayload } from './util';

export interface ITreeHierachyMaintenanceForms {
  formId: string;
}

interface IApiVerbPath {
  verb: string;
  path: string;
}

export const TreeHierachyMaintenanceForms: FC<ITreeHierachyMaintenanceForms> = ({ formId }) => {
  const [form] = Form.useForm<ComponentDto>();
  const { componentCreateEditState, selectedTreeNode, fetchTreeDataRequest } = useTreeHierachy();

  const isCreateMode = componentCreateEditState?.mode === 'create';
  const isEditMode = componentCreateEditState?.mode === 'edit';
  const verbPath: IApiVerbPath = isCreateMode ? { verb: 'POST', path: 'Create' } : { verb: 'PUT', path: 'Update' };

  const { mutate: createUpdateComponentHttp, loading } = useMutate({
    path: `/api/services/Epm/Component/${verbPath?.path}`,
    verb: verbPath?.verb as any,
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = preparePayload(values, componentCreateEditState, selectedTreeNode);
      createUpdateComponentHttp(payload).then((res) => {
        if (res?.success) {
          message.success(`Component was succesfull ${verbPath?.path}d.`);
          fetchTreeDataRequest();
        }
      });
    });
  };

  useEffect(() => {
    if (!_.isEmpty(selectedTreeNode?.key) && isCreateMode)
      form.setFieldsValue({ ...form.getFieldsValue(), parent: selectedTreeNode?.key.toString() });
    else if (isEditMode) {
      prepareFormForEdit(form, selectedTreeNode);
    }
  }, [selectedTreeNode]);

  return (
    <div className="tree-hierachy-maintenance-forms">
      <ConfigurableForm
        mode="edit"
        form={form}
        formId={formId}
        initialValues={!isCreateMode && initiateValues(selectedTreeNode)}
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 13 }}
      />

      <div style={{ marginBottom: '15px' }} />
      <Divider />

      <TreeHierachyMaintenanceBtnsFooter className="tree-hierachy-maintenance-btns-footer">
        <DeleteButton className="delete-btn">
          <Button type="primary" danger disabled={isCreateMode}>
            Delete
          </Button>
        </DeleteButton>

        <div className="cancel-save-btns">
          <Space>
            <Button>Cancel</Button>

            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Save
            </Button>
          </Space>
        </div>
      </TreeHierachyMaintenanceBtnsFooter>
    </div>
  );
};

export default TreeHierachyMaintenanceForms;
