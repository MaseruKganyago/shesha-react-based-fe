import { QuestionCircleOutlined } from '@ant-design/icons';
import { ValidationErrors } from '@shesha/reactjs';
import { Button, Form, Input, message, Select, Spin, Tooltip } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useSmsGatewaysGetAll } from 'api/smsGateways';
import { SmsSettingsDto, useSmsSettingsGetSettings, useSmsSettingsUpdateSettings } from 'api/smsSettings';
import { BulkSmsSettings, ClickatellSettings, SmsPortalSettings, Xml2SmsSettings } from 'components';
import React, { FC, useEffect, useRef, useState } from 'react';
import HisMainLayout from 'src/components/global/hisMainLayout';

interface IClassDropdownProps {
  value?: string;
  displayText?: string;
}

const GatewaysDropdown: FC<IClassDropdownProps> = (props) => {
  const { loading, data: listItems } = useSmsGatewaysGetAll({ lazy: false });

  const options = listItems?.result?.map((d) => (
    <Select.Option key={d.uid} value={d.uid}>
      {d.name}
    </Select.Option>
  ));

  const selectProps = { ...props, value: options ? props.value?.toString() : null };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      notFoundContent={null}
      allowClear={true}
      loading={loading}
      {...selectProps}
    >
      {options}
    </Select>
  );
};

interface ISmsSettingsFormProps {
  model?: SmsSettingsDto;
}

const SmsSettingsForm: FC<ISmsSettingsFormProps> = ({ model }) => {
  const { mutate: save, loading: saving, error: savingError } = useSmsSettingsUpdateSettings({});

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  const gatewayFormRef = useRef<FormInstance>(null);

  const handleGatewaySettingsSaved = () => {
    const values = form.getFieldsValue(); // already validated
    save(values).then(() => {
      message.success('Saved successfully');
    });
  };

  const onFinish = () => {
    if (gatewayFormRef.current) {
      gatewayFormRef.current.validateFields().then(() => {
        gatewayFormRef.current.submit();
      });
    } else {
      // gateway not selected - save main settings
      handleGatewaySettingsSaved();
    }
  };

  const [gatewayId, setGatewayId] = useState(model?.gateway);
  const handleValuesChange = (values) => {
    if (values.gateway) setGatewayId(values.gateway);
  };

  return (
    <Spin spinning={saving} tip="Please wait...">
      {savingError && <ValidationErrors error={savingError} />}
      <Form
        form={form}
        className="table-form"
        layout="horizontal"
        {...formItemLayout}
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          name="gateway"
          label="Gateway"
          initialValue={model.gateway}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <GatewaysDropdown />
        </Form.Item>
        <Form.Item
          name="redirectAllMessagesTo"
          label={
            <span>
              Redirect all messages to&nbsp;
              <Tooltip title="Is used for testing purposes only">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          initialValue={model.redirectAllMessagesTo}
        >
          <Input />
        </Form.Item>
        <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
          {gatewayId === 'fb8e8757-d831-41a3-925f-fd5c5088ef9b' && (
            <ClickatellSettings formRef={gatewayFormRef} onSaved={handleGatewaySettingsSaved} />
          )}
          {gatewayId === 'e77da5f3-a406-4b8a-bb6f-e3c2d5d20c8a' && (
            <BulkSmsSettings formRef={gatewayFormRef} onSaved={handleGatewaySettingsSaved} />
          )}
          {gatewayId === '2a85c238-9648-4292-8849-44c61f5ab705' && (
            <SmsPortalSettings formRef={gatewayFormRef} onSaved={handleGatewaySettingsSaved} />
          )}
          {gatewayId === 'EA33034D-73C6-4D3D-94F0-EE0D4C56D97C' && (
            <Xml2SmsSettings formRef={gatewayFormRef} onSaved={handleGatewaySettingsSaved} />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const SmsSettings = () => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useSmsSettingsGetSettings({
    lazy: true,
  }); // todo: check headers issue (RestfulProvider is added, but they are empty)
  const fetchData = async () => {
    await doFetch();
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const model = serverData?.result;
  return (
    <Spin spinning={loading} tip="Please wait...">
      <HisMainLayout title="SMS" description="">
        {fetchError && <ValidationErrors error={fetchError} />}
        {model && <SmsSettingsForm model={model} />}
      </HisMainLayout>
    </Spin>
  );
};

export default SmsSettings;
