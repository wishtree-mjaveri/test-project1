import React from 'react';
import Widget from '../Widget/index';

const IconCard = ({ color, icon }) => (
  <Widget styleName={`gx-card-full gx-p-2 gx-text-center gx-text-primary ${color}`}>
    <i className={`icon icon-${icon} gx-fs-iconcard`} />
  </Widget>
);

export default IconCard;
