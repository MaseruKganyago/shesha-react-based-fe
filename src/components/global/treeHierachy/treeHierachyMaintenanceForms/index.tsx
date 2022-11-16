import { ConfigurableForm } from '@shesha/reactjs';
import { Button, Divider, Form, message, Result, Space } from 'antd';
import { TreeHierachyFormsSkeleton } from 'components';
import _ from 'lodash';
import { ComponentDto } from 'models/component';
import { useTreeHierachy } from 'providers';
import { FC, useEffect, useState } from 'react';
import { useMutate } from 'restful-react';
import { DeleteButton, DynamicForm, TreeHierachyMaintenanceBtnsFooter } from './styles';
import { initiateValues, prepareFormForEdit, preparePayload } from './util';

export interface ITreeHierachyMaintenanceForms {
  formId: string;
}

interface IApiVerbPath {
  verb: string;
  path: string;
}

export interface IFormLoader {
  showSkeleton?: boolean;
  doneLoading?: boolean;
}

const INITIAL_STATE_FORM_LOADER: IFormLoader = {
  showSkeleton: false,
  doneLoading: false,
};

export const TreeHierachyMaintenanceForms: FC<ITreeHierachyMaintenanceForms> = ({ formId }) => {
  const [form] = Form.useForm<ComponentDto>();
  const { componentCreateEditState, selectedTreeNode, fetchTreeDataRequest, toggleFormRendererMode } =
    useTreeHierachy();
  const [showSkeleton, setShowSkeleton] = useState<IFormLoader>(INITIAL_STATE_FORM_LOADER);

  const isCreateMode = componentCreateEditState?.mode === 'create';
  const isEditMode = componentCreateEditState?.mode === 'edit';
  const verbPath: IApiVerbPath = isCreateMode ? { verb: 'POST', path: 'Create' } : { verb: 'PUT', path: 'Update' };

  const { mutate: createUpdateComponentHttp, loading } = useMutate({
    path: `/api/services/Epm/Component/${verbPath?.path}`,
    verb: verbPath?.verb as any,
  });

  const { mutate: deleteComponent, loading: isDeleting } = useMutate({
    path: `/api/services/Epm/Component/Delete`,
    verb: 'DELETE',
    queryParams: { id: selectedTreeNode?.key },
  });

  useEffect(() => {
    setShowSkeleton({ ...showSkeleton, doneLoading: false });
  }, [componentCreateEditState?.mode]);

  useEffect(() => {
    if (!_.isEmpty(selectedTreeNode?.key) && isCreateMode)
      form.setFieldsValue({ ...form.getFieldsValue(), parent: selectedTreeNode?.key.toString() });
    else if (isEditMode) {
      prepareFormForEdit(form, selectedTreeNode);
    }
  }, [selectedTreeNode]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = preparePayload(values, componentCreateEditState, selectedTreeNode);
      createUpdateComponentHttp(payload).then((res) => {
        if (res?.success) {
          message.success(`Component was succesfull ${verbPath?.path}d.`);
          toggleFormRendererMode(null);
          fetchTreeDataRequest();
        }
      });
    });
  };

  const handleCancel = () => {
    toggleFormRendererMode(null);
  };

  const handleDelete = () => {
    deleteComponent({}).then((res) => {
      if (res?.success) {
        message.success(`Component was succesfull Deleted.`);
        fetchTreeDataRequest();
      }
    });
  };

  return (
    <div className="tree-hierachy-maintenance-forms">
      {showSkeleton?.doneLoading ? (
        <DynamicForm
          className="dynamic-form"
          mode="edit"
          form={form}
          formId={formId}
          initialValues={!isCreateMode && initiateValues(selectedTreeNode)}
          layout="horizontal"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
        />
      ) : (
        <TreeHierachyFormsSkeleton formId={formId} {...{ showSkeleton, setShowSkeleton }} />
      )}

      <div style={{ marginBottom: '15px' }} />
      <Divider />

      <TreeHierachyMaintenanceBtnsFooter className="tree-hierachy-maintenance-btns-footer">
        <DeleteButton className="delete-btn">
          <Button onClick={handleDelete} type="primary" danger disabled={isCreateMode}>
            Delete
          </Button>
        </DeleteButton>

        <div className="cancel-save-btns">
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>

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
