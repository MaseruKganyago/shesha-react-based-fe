import { Button, Divider, Form, message, Space } from 'antd';
import { DynamicDtoComponentGuid } from 'api/component';
import { MaintenanceFormsDeleteButton, TreeHierachyFormsSkeleton } from 'components';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useTreeHierachy } from 'providers';
import { FC, useEffect, useState } from 'react';
import { useMutate } from 'restful-react';
import { StyledConfigurableForm, TreeHierachyMaintenanceBtnsFooter } from './styles';
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
  const [form] = Form.useForm<DynamicDtoComponentGuid>();
  const {
    componentCreateEditState,
    selectedTreeNode,
    selectedComponentDetails,
    fetchTreeDataRequest,
    toggleFormRendererMode,
  } = useTreeHierachy();
  const [showSkeleton, setShowSkeleton] = useState<IFormLoader>(INITIAL_STATE_FORM_LOADER);
  const {
    query: { id },
  } = useRouter();

  const isCreateMode = componentCreateEditState?.mode === 'create';
  const isEditMode = componentCreateEditState?.mode === 'edit';
  const verbPath: IApiVerbPath = isCreateMode ? { verb: 'POST', path: 'Create' } : { verb: 'PUT', path: 'Update' };

  const { mutate: createUpdateComponentHttp, loading } = useMutate({
    path: `/api/services/Epm/Component/${verbPath?.path}`,
    verb: verbPath?.verb as any,
  });

  useEffect(() => {
    setShowSkeleton({ ...showSkeleton, doneLoading: false });
  }, [componentCreateEditState]);

  useEffect(() => {
    if (!_.isEmpty(selectedTreeNode?.key) && isCreateMode)
      form.setFieldsValue({ ...form.getFieldsValue(), parent: selectedTreeNode?.key.toString() });
    else if (isEditMode) {
      prepareFormForEdit(form, selectedComponentDetails);
    }
  }, [selectedTreeNode, selectedComponentDetails]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = preparePayload(values, componentCreateEditState, selectedTreeNode);
      createUpdateComponentHttp(payload).then((res) => {
        if (res?.success) {
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
    <div className="tree-hierachy-maintenance-forms">
      {showSkeleton?.doneLoading ? (
        <StyledConfigurableForm
          className="dynamic-form"
          mode="edit"
          form={form}
          formId={formId}
          initialValues={!isCreateMode && initiateValues(selectedComponentDetails)}
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
        <MaintenanceFormsDeleteButton />

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
