import React from 'react';
import { Card } from 'antd';

import MapDirections from './Components/MapDirections';
import IntlMessages from '../../../../../util/IntlMessages';

const Directions = () => (
  <Card className="gx-card" title={<IntlMessages id="sidebar.map.mapDirection" />}>
    <MapDirections />
  </Card>
);

export default Directions;
