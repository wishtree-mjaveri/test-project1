import React from 'react';
import { Card, Input } from 'antd';

const { TextArea } = Input;

const TextAreas = () => (
  <Card className="gx-card" title="Text Areas">
    <TextArea rows={4} />
  </Card>
);

export default TextAreas;
