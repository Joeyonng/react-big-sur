import React, {useState, useCallback, forwardRef} from "react";
import PropTypes from "prop-types";

import "./Slider.scss"
import * as style from "../../style";

const Slider = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {variant, minValue, maxValue, defaultValue, header, onChange, ...rootProps} = curProps;

  const [state, setState] = useState({
    value: defaultValue,
    sliderRef: null
  });

  const onSliderRefChange = useCallback(node => {
    setState(state => ({...state, sliderRef: node}));
  }, []);

  return (
    <div className="slider-container">
      <div
        ref={onSliderRefChange}
        className={`slider-track-${variant}`}
        {...rootProps}
      >
        <div
          className="slider-fill"
          style={{
            width: state.sliderRef === null ? 0 : state.value / 100
              * (state.sliderRef.offsetWidth - style.rmPx(style.height10) - 2) + style.rmPx(style.height10)
          }}
        />

        <input
          className="slider-input"
          type="range"
          min={minValue}
          max={maxValue}
          value={state.value}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setState({...state, value: value});
            if (onChange !== undefined) onChange(value);
          }}
        />

        {variant === 'small' ? null : React.Children.map(header, (item) => (
          React.cloneElement(header, {
            className: "slider-header"
          })
        ))}
      </div>
    </div>
  )
});

Slider.propTypes = {
  /** The variant to use */
  variant: PropTypes.oneOf(['small', 'large']),
  /** The minimum of the slider. */
  minValue: PropTypes.number,
  /** The maximum of the slider. */
  maxValue: PropTypes.number,
  /** The default value of the slider */
  defaultValue: PropTypes.number,
  /** The icon appeared at front of the slider */
  header: PropTypes.node,
  /** Callback function fired when the value of the slider is changed. */
  onChange: PropTypes.func,
}

Slider.defaultProps = {
  variant: 'large',
  minValue: 0,
  maxValue: 100,
  defaultValue: 0,
}

export default Slider;
