import { Button, Result } from 'antd';
import { getLayout } from 'src/components/layouts';
import { NextPageWithLayout } from 'models';
import { useRouter } from 'next/router';
import React from 'react';

const Page: NextPageWithLayout = () => {
  const { push } = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => push('/')}>
          Back Home
        </Button>
      }
    />
  );
};

export default Page;

Page.getLayout = getLayout;
