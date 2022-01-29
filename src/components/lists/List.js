import React, {forwardRef} from "react";
import PropTypes from "prop-types";

import "./DropdownList.scss";

const List = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {width, size, variant, noPadding, ...rootProps} = curProps;

  return (
    <div
      ref={ref}
      style={{
        width: width,
        ...rootProps.style,
      }}
      {...rootProps}
    >
      {React.Children.map(props.children, item => {
        let newProps = {};
        if (size) newProps['size'] = size;
        if (variant) newProps['variant'] = variant;
        if (noPadding) newProps['noPadding'] = noPadding;

        return React.cloneElement(item, newProps)
      })}
    </div>
  )
});

List.propTypes = {
  /** The width of the list. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** The size of the list items in the list. */
  size: PropTypes.oneOf(['large', 'medium', 'small', undefined]),
  /** Different variance of the list items highlight style in the list. */
  variant: PropTypes.oneOf(['primary', 'secondary', undefined]),
  /** Whether add side paddings to list items in the list */
  noPadding: PropTypes.bool,
}

List.defaultProps = {
  width: "100%",
}

export default List;