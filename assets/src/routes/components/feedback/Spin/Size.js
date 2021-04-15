import React from 'react';
import { Card, Spin } from 'antd';

const Size = () => (
  <Card title="Size" className="gx-card">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Card>
);

export default Size;
