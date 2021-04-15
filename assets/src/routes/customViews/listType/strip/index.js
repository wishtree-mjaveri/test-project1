import React from 'react';
import { Col, Row } from 'antd';
import StripListItem from '../Component/StripListItem';
import { data } from '../data';
import ContainerHeader from '../../../../components/ContainerHeader/index';
import IntlMessages from '../../../../util/IntlMessages';

const StripList = ({ match }) => (
  <div className="gx-main-content gx-pb-sm-4">
    <Row>
      <Col span={24}>
        <ContainerHeader title={<IntlMessages id="sidebar.listType.withDivider" />} match={match} />
      </Col>
      <Col span={24}>
        {data.map((data, index) => (
          <StripListItem key={index} data={data} styleName="gx-card-strip" />
        ))}
      </Col>
    </Row>
  </div>
);

export default StripList;
