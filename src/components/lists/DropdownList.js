import React, {forwardRef, useState} from "react";
import PropTypes from "prop-types";
import {ChevronDown, ChevronRight} from "react-feather";

import Spinner from "../indicators/Spinner";
import Collapse from "../utils/Collapse";
import ListHeader from "./ListHeader";

import * as style from "../../style";
import "./DropdownList.scss";

const DropdownList = forwardRef((props, ref) => {
  const {classNames, styles, children, ...curProps} = props;
  const {title, loading, ...rootProps} = curProps;

  const [state, setState] = useState({
    open: true,
  });

  return (
    <div
      ref={ref}
      className="dropdown-list"
      {...rootProps}
    >
      <ListHeader
        title={title}
        tail={loading ? <Spinner size={style.icon1}/> :
          <div
            onClick={() => {
              setState({...state, open: !state.open})
            }}
          >
            {state.open ? <ChevronDown size={style.icon1}/> : <ChevronRight size={style.icon1}/>}
          </div>
        }
        hideTail={!loading}
      />

      <Collapse open={state.open}>
        {children}
      </Collapse>
    </div>
  )
});

DropdownList.propTypes = {
  /** Content of the subtitle */
  title: PropTypes.string,
  /** If true, the tail is a loading spinner */
  loading: PropTypes.bool,
}

DropdownList.defaultProps = {
  loading: false,
}

export default DropdownList;