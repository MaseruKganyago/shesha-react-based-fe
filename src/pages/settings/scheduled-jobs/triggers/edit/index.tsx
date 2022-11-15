import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { CollapsiblePanel, IndexToolbar, IToolbarItem, ValidationErrors } from '@shesha/reactjs';
import { Form, Spin } from 'antd';
import {
  ScheduledJobTriggerDto,
  useScheduledJobTriggerGet,
  useScheduledJobTriggerUpdate,
} from 'api/scheduledJobTrigger';
import { ScheduledJobsTriggersForm } from 'components';
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
  } = useScheduledJobTriggerGet({
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

  const { mutate: save, loading: saving /*, error: savingError*/ } = useScheduledJobTriggerUpdate({});

  const model: ScheduledJobTriggerDto = serverData?.result;
  const goBack = () => {
    // todo: return to previous one with fallback to details
    router.push(`/settings/scheduledJobs/details?id=${model.job?.id}`);
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

  const handleSubmit = (values: ScheduledJobTriggerDto) => {
    const postData = { ...values, id: model.id };
    save(postData).then(() => {
      goBack();
    });
  };

  return (
    <Spin spinning={loading || saving} tip="Please wait...">
      <HisMainLayout title={'Edit Scheduled Job Trigger'} toolbar={<IndexToolbar items={toolbarItems} />}>
        <ValidationErrors error={fetchError} />

        {model && (
          <CollapsiblePanel header="Scheduled Job Trigger Details">
            <ScheduledJobsTriggersForm form={form} model={model} onSubmit={handleSubmit} />
          </CollapsiblePanel>
        )}
      </HisMainLayout>
    </Spin>
  );
};

export default DetailsPage;
