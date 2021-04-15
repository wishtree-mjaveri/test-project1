import React from 'react';
import { Card, Pagination } from 'antd';

function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return <span className="gx-link">Previous</span>;
  } if (type === 'next') {
    return <span className="gx-link">Next</span>;
  }
  return originalElement;
}

const PrevAndNext = () => (
  <Card className="gx-card" title="Prev And Next Pagination">
    <Pagination total={500} itemRender={itemRender} />
  </Card>
);

export default PrevAndNext;
