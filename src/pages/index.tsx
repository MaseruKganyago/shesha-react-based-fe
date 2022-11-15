import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { URL_GENERAL_DASHBOARD_PAGE } from 'routes';

const Home: React.FC = () => {
  const { push } = useRouter();

  useEffect(() => {
    push(URL_GENERAL_DASHBOARD_PAGE);
  }, []);

  return <Fragment />;
};

export default Home;
