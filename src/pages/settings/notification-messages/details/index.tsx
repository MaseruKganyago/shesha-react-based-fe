import { CollapsiblePanel, DisplayFormItem, MainLayout, ValidationErrors } from '@shesha/reactjs';
import { Form, Spin } from 'antd';
import { NotificationMessageDto, useNotificationMessageGet } from 'api/notificationMessage';
import { HtmlEditor } from 'components';
import moment from 'moment';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';

interface IProps {
  id?: string;
}

interface IDetailsViewProps {
  model: NotificationMessageDto;
}

const DetailsView: FC<IDetailsViewProps> = ({ model }) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const onHtmlEditorChange = () => {};

  return (
    <CollapsiblePanel header="Notification Message Details">
      <Form className="table-form" layout="horizontal" {...formItemLayout}>
        <DisplayFormItem label="Notification:">
          {model.notification != null && (
            <Link href={`/settings/notifications/details?id=${model.notification.id}`}>
              <a>{model.notification.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Template:">
          {model.template != null && (
            <Link href={`/settings/notification-templates/details?id=${model.template.id}`}>
              <a>{model.template.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Sender:">
          {model.sender != null && (
            <Link href={`/administration/user-management/details?id=${model.sender.id}`}>
              <a>{model.sender.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Recipient:">
          {model.recipient != null && (
            <Link href={`/administration/user-management/details?id=${model.recipient.id}`}>
              <a>{model.recipient.displayText}</a>
            </Link>
          )}
        </DisplayFormItem>
        <DisplayFormItem label="Send Type:">{model.sendType?.item}</DisplayFormItem>
        <DisplayFormItem label="Recipient text:">{model.recipientText}</DisplayFormItem>

        <DisplayFormItem label="Subject:">{model.subject}</DisplayFormItem>
        {/* <DisplayFormItem label="Body Format:">{model.bodyFormat?.item}</DisplayFormItem> */}
        <DisplayFormItem label="Body:">
          {/* <HtmlEditor value={model.body} config={{ readonly: true }} onChange={onHtmlEditorChange} /> */}
          <HtmlEditor value={model.body} onChange={onHtmlEditorChange} />
        </DisplayFormItem>

        <DisplayFormItem label="Send Date:">
          {model.sendDate ? moment(model.sendDate).format('DD/MM/YYYY HH:mm:ss') : null}
        </DisplayFormItem>
        <DisplayFormItem label="Status:">{model.status?.item}</DisplayFormItem>
        <DisplayFormItem label="Error Message:">{model.errorMessage}</DisplayFormItem>
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
  } = useNotificationMessageGet({
    lazy: true,
  });

  const fetchData = async () => {
    await doFetch({ queryParams: { id: props.id } });
  };

  // fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);

  const model = (serverData as any)?.result as NotificationMessageDto;

  return (
    <Spin spinning={loading} tip="Loading...">
      <MainLayout title={'Notification Message Details'} description="">
        <ValidationErrors error={fetchError} />
        {model && <DetailsView model={model}></DetailsView>}
      </MainLayout>
    </Spin>
  );
};

export default DetailsPage;
