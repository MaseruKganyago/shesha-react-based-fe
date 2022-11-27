import { ConfigurableForm } from '@shesha/reactjs';
import styled from 'styled-components';

export const TreeHierachyMaintenanceBtnsFooter = styled.div`
  display: flex;
`;

export const StyledConfigurableForm = styled(ConfigurableForm)`
  min-height: 100px;
`;

export const FormContainer = styled.div`
  max-height: 480px;
  &.scroll {
    margin: 0 !important;
  }
`;
