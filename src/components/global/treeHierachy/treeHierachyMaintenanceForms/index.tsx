import { Divider, Form } from 'antd';
import { DynamicDtoComponentGuid } from 'api/component';
import { MaintenanceFormsDeleteButton, MaintenanceFormsSaveCancelButton, TreeHierachyFormsSkeleton } from 'components';
import _ from 'lodash';
import { useTreeHierachy } from 'providers';
import { FC, useEffect, useState } from 'react';
import { FormContainer, StyledConfigurableForm, TreeHierachyMaintenanceBtnsFooter } from './styles';
import { initiateValues, prepareFormForEdit } from './util';

export interface ITreeHierachyMaintenanceForms {
  formId: string;
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
  const { componentCreateEditState, selectedTreeNode, selectedComponentDetails } = useTreeHierachy();
  const [showSkeleton, setShowSkeleton] = useState<IFormLoader>(INITIAL_STATE_FORM_LOADER);

  const isCreateMode = componentCreateEditState?.mode === 'create';
  const isEditMode = componentCreateEditState?.mode === 'edit';

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

  return (
    <div className="tree-hierachy-maintenance-forms">
      {showSkeleton?.doneLoading ? (
        <FormContainer className="form-container scroll scroll-y">
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
        </FormContainer>
      ) : (
        <TreeHierachyFormsSkeleton formId={formId} {...{ showSkeleton, setShowSkeleton }} />
      )}

      <div style={{ marginBottom: '15px' }} />
      <Divider />

      <TreeHierachyMaintenanceBtnsFooter className="tree-hierachy-maintenance-btns-footer">
        <MaintenanceFormsDeleteButton />

        <div className="cancel-save-btns">
          <MaintenanceFormsSaveCancelButton form={form} />
        </div>
      </TreeHierachyMaintenanceBtnsFooter>
    </div>
  );
};

export default TreeHierachyMaintenanceForms;
