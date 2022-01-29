import React, {forwardRef} from "react";

import './ListDivider.scss';

const ListDivider = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="list-divider"
    />
  )
});

export default ListDivider;

