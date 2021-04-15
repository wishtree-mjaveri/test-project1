import React from 'react';
import { Col, Row } from 'antd';

import './index.less';
import Basic from './Basic';
import Vertical from './Vertical';
import FadeIn from './FadeIn';
import ScrollAutomatically from './ScrollAutomatically';

const Carousel = () => (
  <Row>
    <Col lg={12} md={12} sm={24} xs={24}>
      <FadeIn />
      <ScrollAutomatically />
    </Col>

    <Col lg={12} md={12} sm={24} xs={24}>
      <Basic />
      <Vertical />
    </Col>

  </Row>
);

export default Carousel;
