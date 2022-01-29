import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";

import "./ListHeader.scss";

const ListHeader = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {title, tail, hideTail, ...rootProps} = curProps;

  const [state, setState] = useState({
    headerHover: false,
  });

  return (
    <div
      className="list-header"
      onMouseEnter={(e) => {
        setState({...state, headerHover: true})
        if (rootProps.onMouseEnter) rootProps.onMouseEnter(e)
      }}
      onMouseLeave={(e) => {
        setState({...state, headerHover: false})
        if (rootProps.onMouseLeave) rootProps.onMouseLeave(e)
      }}
      {...rootProps}
    >
      <div className="list-header-title">
        {title}
      </div>

      {!tail || (hideTail && !state.headerHover)? null :
        <div className="list-header-tail">
          {tail}
        </div>
      }
    </div>
  )
});

ListHeader.propTypes = {
  /** Content of the subtitle */
  title: PropTypes.string,
  /** The tail of the subtitle. */
  tail: PropTypes.node,
  /** Always show tail, if any. */
  hideTail: PropTypes.bool,
}

ListHeader.defaultProps = {
  hideTail: false,
}

export default ListHeader;