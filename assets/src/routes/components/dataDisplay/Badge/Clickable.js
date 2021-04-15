import React from 'react';
import { Badge, Card } from 'antd';

const Clickable = () => (
  <Card className="gx-card" title="Clickable">
    <span className="gx-link">
      <Badge count={5}>
        <span className="head-example" />
      </Badge>
    </span>
  </Card>
);

export default Clickable;
