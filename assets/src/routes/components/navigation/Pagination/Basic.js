import React from 'react';
import { Card, Pagination } from 'antd';

const Basic = () => (
  <Card className="gx-card" title="Basic Pagination">
    <Pagination defaultCurrent={1} total={50} />
  </Card>
);

export default Basic;
