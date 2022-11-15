import { FacilityContextPicker, FacilityContextPickerProvider } from '@shesha/module-his';
import React, { FC } from 'react';

const URL_PATH = '/api/v1/Bookings/HisUser/GetFacilitiesAssociatedToUser';
const HEADER_KEY = 'boxhis-facilityId';
const HEADING = 'Please Select Facility from List';

const CustomComponent: FC = () => {
  return (
    <FacilityContextPickerProvider path={URL_PATH} headerKey={HEADER_KEY}>
      <FacilityContextPicker facilityHeader={HEADING} />
    </FacilityContextPickerProvider>
  );
};

export default CustomComponent;
