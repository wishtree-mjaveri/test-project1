import React from 'react';
import { Card, Spin } from 'antd';

const Container = () => (
  <Card title="Container" className="gx-card">
    <Spin className="gx-loader-container" />
  </Card>
);

export default Container;
