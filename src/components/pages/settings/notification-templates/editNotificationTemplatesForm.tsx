import { RefListDropDown } from '@shesha/reactjs';
import { Checkbox, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { NotificationTemplateDto } from 'api/notificationTemplate';
import { HtmlEditor } from 'components';
import React, { FC } from 'react';
import NotificationAutocomplete from './notificationAutocomplete';

const HtmlInput = (props) => {
  return (
    <HtmlEditor
      {...props}
      // onBlur={handleChange} // preferred to use only this option to update the content for performance reasons
    />
  );
};

const BodyEditor = (props) => {
  return props.isHtml ? <HtmlInput {...props}></HtmlInput> : <Input.TextArea rows={4} autoSize={true} {...props} />;
};

interface IEditNotificationTemplatesFormProps {
  model: NotificationTemplateDto;
  notificationId?: string;
  onSubmit?: (values: any) => void;
  form: FormInstance;
}

const EditNotificationTemplatesForm: FC<IEditNotificationTemplatesFormProps> = ({
  form,
  model,
  notificationId,
  onSubmit,
}) => {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const getFieldValue = (fieldName: string, defaultValue: any) => {
    return form.isFieldTouched(fieldName) ? form.getFieldValue(fieldName) : defaultValue;
  };
  const bodyFormat = getFieldValue('bodyFormat.itemValue', 1);

  return (
    <Form className="table-form" form={form} layout="horizontal" onFinish={handleSubmit} {...formItemLayout}>
      {!notificationId && (
        <Form.Item
          label="Notification"
          name={['notification', 'id']}
          initialValue={model.notification?.id}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <NotificationAutocomplete displayText={model.notification?.displayText} />
        </Form.Item>
      )}
      <Form.Item
        label="Name"
        name="name"
        initialValue={model.name}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <Input autoFocus />
      </Form.Item>
      <Form.Item
        label="Send Type"
        name={['sendType']}
        // name={['sendType', 'itemValue']}
        initialValue={model.sendType}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <RefListDropDown value={model.sendType} listNamespace="Shesha.Core" listName="NotificationSendType" />
      </Form.Item>
      <Form.Item
        label="Subject"
        name="subject"
        initialValue={model.subject}
        rules={[{ required: false, message: 'This field is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Body Format"
        name={['bodyFormat']}
        // name={['bodyFormat', 'itemValue']}
        initialValue={model.bodyFormat}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <RefListDropDown value={model.bodyFormat} listNamespace="Shesha.Core" listName="NotificationTemplateFormat" />
      </Form.Item>
      <Form.Item
        label="Body"
        name="body"
        initialValue={model.body}
        rules={[{ required: true, message: 'This field is required' }]}
      >
        <BodyEditor isHtml={parseInt(bodyFormat) === 1} />
      </Form.Item>
      <Form.Item label="Is Enabled" name="isEnabled" initialValue={model.isEnabled} valuePropName={'checked'}>
        <Checkbox />
      </Form.Item>
    </Form>
  );
};

export default EditNotificationTemplatesForm;
