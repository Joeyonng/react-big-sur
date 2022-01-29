// https://codepen.io/jmak/pen/LsCet
import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import * as style from "../../style";
import "./Spinner.scss"

const Spinner = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {size, ...rootProps} = curProps;

  return (
    <div
      className="overlay"
      style={{
        width: size,
        height: size,
      }}
      {...rootProps}
    >
      <div
        className="spinner"
        style={{
          fontSize: size,
        }}
      >
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
        <div className="spinner-blade"/>
      </div>
    </div>
  )
});

Spinner.propTypes = {
  /** The size of the spinner */
  size: PropTypes.number,
}

Spinner.defaultProps = {
  size: style.height11,
}

export default Spinner;