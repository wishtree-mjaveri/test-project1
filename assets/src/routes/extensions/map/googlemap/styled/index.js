import React from 'react';
import { Card } from 'antd';

import StyledMap from './Components/StyledMap';
import IntlMessages from '../../../../../util/IntlMessages';

const Styled = () => (
  <Card className="gx-card" title={<IntlMessages id="sidebar.map.styled" />}>
    <StyledMap />
  </Card>
);

export default Styled;
