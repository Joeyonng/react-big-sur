import React, {forwardRef, useEffect, useRef, useState} from "react";
import * as style from "../../style";

const MenuButtonGroup = forwardRef((props) => {
  const {classNames, styles, children, ...curProps} = props;
  const {reverse, ...rootProps} = curProps;

  const [state, setState] = useState({
    openIndex: -1,
  })

  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setState({...state, openIndex: -1});
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  return (
    <div
      ref={ref}
      className="menu-button-group"
      style={{
      }}
    >
      {React.Children.map(children, (item, index) => (
        React.cloneElement(item, {
          key: index,
          styles: {
            button: {
              left: -style.rmPx(style.space7) * index,
            }
          },
          open: state.openIndex === index,
          onMenuOpen: () => {
            setState({...state, openIndex: index})
          },
          onMenuClose: () => {
            setState({...state, openIndex: -1})
          },
          onMouseOver: () => {
            if (state.openIndex !== -1) {
              setState({...state, openIndex: index})
            }
          },
        })
      ))}
    </div>
  )
});

export default MenuButtonGroup;