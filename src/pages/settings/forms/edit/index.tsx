import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { CollapsiblePanel, IndexToolbar, IToolbarItem, ValidationErrors } from '@shesha/reactjs';
import { Form, Input, Spin } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormDto, useFormGet, useFormUpdate } from 'api/form';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';
import HisMainLayout from 'src/components/global/hisMainLayout';

interface IProps {
  id?: string;
}

interface IEditFormProps {
  form: FormInstance;
  model: FormDto;
  onSubmit?: (e: FormDto) => void;
}

const EditForm: FC<IEditFormProps> = ({ form, model, onSubmit }) => {
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <CollapsiblePanel header="Form Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout} form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          initialValue={model.name}
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input autoFocus />
        </Form.Item>
        <Form.Item label="Description" name="description" initialValue={model.description}>
          <Input />
        </Form.Item>

        <Form.Item label="Path" name="path" initialValue={model.path}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Markup"
          name="markup"
          initialValue={model.markup}
          //hidden={true}
        >
          <Input />
        </Form.Item>
      </Form>
    </CollapsiblePanel>
  );
};

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useFormGet({
    queryParams: { id: props?.id },
    lazy: true,
  });

  const fetchData = async () => {
    console.log('id', props.id)
    await doFetch();
  };

  const [form] = Form.useForm();

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, loading: saving, error: savingError } = useFormUpdate({});

  const goBack = () => {
    router.push(`/dynamic/forms-v2`);
  };

  const router = useRouter();
  const toolbarItems: IToolbarItem[] = [
    {
      title: 'Save',
      icon: <SaveOutlined />,
      onClick: () => {
        form.submit();
      },
    },
    {
      title: 'Close',
      icon: <CloseOutlined />,
      onClick: () => goBack(),
    },
  ];

  const handleSubmit = (values) => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  const model = (serverData as any)?.result;

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <HisMainLayout
        title={'Edit Form' + (model ? `: ${model.name}` : '')}
        showHeading={false}
        toolbar={<IndexToolbar items={toolbarItems} />}
      >
        <ValidationErrors error={fetchError} />
        <ValidationErrors error={savingError} />
        {model && <EditForm form={form} model={model} onSubmit={handleSubmit} />}
      </HisMainLayout>
    </Spin>
  );
};

export default DetailsPage;
