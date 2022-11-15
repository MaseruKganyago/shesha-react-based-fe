import React, { ReactElement } from 'react';
import HisMainLayout from 'src/components/global/hisMainLayout';

/**
 * Returns the component wrapped up in a layout
 * @param page the page to be rendered within the layout
 * @returns the component wrapped up in a layout
 */
export const getLayout = (page: ReactElement): JSX.Element => {
  return <HisMainLayout noPadding>{page}</HisMainLayout>;
};

export default getLayout;
