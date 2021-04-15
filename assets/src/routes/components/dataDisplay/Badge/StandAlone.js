import React from 'react';
import { Badge, Card } from 'antd';

const StandAlone = () => (
  <Card className="gx-card" title="Stand Alone">
    <Badge count={25} />
    <Badge count={4} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
    <Badge count={109} style={{ backgroundColor: '#52c41a' }} />
  </Card>
);

export default StandAlone;
