import { ValidationErrors } from '@shesha/reactjs';
import { Form, Modal, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { NotificationDto, useNotificationCreate } from 'api/notification';
import React, { FC } from 'react';
import EditNotificationForm from './editNotificationForm';

const defaultModel: NotificationDto = {};

interface ICreateNotificationModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: (form: FormInstance) => void;
}

const CreateNotificationModal: FC<ICreateNotificationModalProps> = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const { mutate: save, error, loading } = useNotificationCreate({});

  const submitForm = () => {
    form.submit();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSubmit = (values) => {
    const data = { ...values };
    save(data).then(() => {
      onSuccess(form);
    });
  };

  return (
    <Modal
      width="60%"
      visible={visible}
      title="New Notification"
      okText="Create"
      onCancel={handleCancel}
      onOk={submitForm}
      confirmLoading={loading}
    >
      <Spin spinning={loading} tip="Please wait...">
        <ValidationErrors error={error}></ValidationErrors>
        <EditNotificationForm model={defaultModel} onSubmit={handleSubmit} form={form} />
      </Spin>
    </Modal>
  );
};

export default CreateNotificationModal;
