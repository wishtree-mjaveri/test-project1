import React from 'react';
import { Card } from 'antd';

import MarkerClustererExample from './Components/MarkerClustererEx';
import IntlMessages from '../../../../../util/IntlMessages';

const MapClustering = () => (
  <Card className="gx-card" title={<IntlMessages id="sidebar.map.mapClustering" />}>
    <MarkerClustererExample />
  </Card>
);

export default MapClustering;
