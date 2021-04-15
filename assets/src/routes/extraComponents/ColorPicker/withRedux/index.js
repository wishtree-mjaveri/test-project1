import React from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import { actions as appActions } from './reducer';

const WithRedux = ({ color, onChangeColor }) => (
  <SketchPicker
    color={color}
    onChangeComplete={onChangeColor}
  />
);

const mapStateToProps = (state) => ({
  color: state.color,
});

const mapDispatchToProps = {
  onChangeColor: appActions.changeColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(WithRedux);
