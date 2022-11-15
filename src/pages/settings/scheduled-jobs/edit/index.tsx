import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { CollapsiblePanel, IndexToolbar, IToolbarItem, ValidationErrors } from '@shesha/reactjs';
import { Form, Spin } from 'antd';
import { ScheduledJobDto, useScheduledJobGet, useScheduledJobUpdate } from 'api/scheduledJob';
import { ScheduledJobsEditForm } from 'components';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import HisMainLayout from 'src/components/global/hisMainLayout';

interface IProps {
  id?: string;
}

const DetailsPage: NextPage<IProps> = (props) => {
  const {
    loading: loading,
    refetch: doFetch,
    error: fetchError,
    data: serverData,
  } = useScheduledJobGet({
    lazy: true,
  }); // todo: check headers issue (RestfulProvider is added, but they are empty)

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  const [form] = Form.useForm();

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const { mutate: save, loading: saving /*, error: savingError*/ } = useScheduledJobUpdate({});

  const goBack = () => {
    // todo: return to previous one with fallback to details
    router.push(`/settings/scheduledJobs/details?id=${props.id}`);
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

  const model: ScheduledJobDto = serverData?.result;
  const handleSubmit = (values: ScheduledJobDto) => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <HisMainLayout title={'Edit Scheduled Job'} toolbar={<IndexToolbar items={toolbarItems} />}>
        <ValidationErrors error={fetchError} />

        {model && (
          <CollapsiblePanel header="Scheduled Job Details">
            <ScheduledJobsEditForm form={form} model={model} onSubmit={handleSubmit} />
          </CollapsiblePanel>
        )}
      </HisMainLayout>
    </Spin>
  );
};

export default DetailsPage;
