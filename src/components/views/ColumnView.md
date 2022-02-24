```jsx
import {useRef, useState} from "react";
import {ColumnView, ToolbarWindow, ToolbarItem} from "react-big-sur";
import {ChevronRight, ChevronLeft} from "react-feather";
import isEqual from "react-fast-compare";


const nodes = {
  0: {
    selectedId: "1",
    minWidth: 150,
    children: {
      1: {
        selectedId: "4",
        minWidth: 200,
        children: {
          4: {
            children: {},
          },
          5: {
            children: {
              6: {
                children: {},
              },
            },
          },
        },
      },
      2: {
        children: {},
      },
      3: {
        children: {},
      },
    }
  }
};

const [ids, setIds] = useState({0: "1", 1: "4"});

const parse = (parent) => {
  return (Object.entries(parent).map(([key, value]) =>
    <ColumnView
      key={key}
      id={key}
      label={`Label-${key}`}
      minWidth={value.minWidth}
      selectedId={ids[key]}
      onSelect={(id) => {
        let curIds = Object.assign({}, ids);
        curIds[key] = id;
        setIds(curIds);
      }}
    >
      {value.children ? parse(value.children) : null}
    </ColumnView>
  ))
}

<ToolbarWindow
  width={640}
  height={360}
>
  {parse(nodes)}
</ToolbarWindow>
```