Simple `List`.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";
import ListDivider from "./ListDivider";
import {GitHub, Star} from "react-feather";

<div className="row">
  <List width={200}>
    <ListHeader title="List Header"/>
    <ListItem primary="ListItem No Icon"/>
    <ListItem primary="Divided by ListDivider"/>
    <ListDivider/>
    <ListItem primary="Star Icon" icon={<Star/>}/>
    <ListItem primary="Github Icon" icon={<GitHub/>}/>
  </List>
</div>
```

Part of the list is collapsable using `Collapse`.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import ListHeader from "./ListHeader";
import ListDivider from "./ListDivider";
import {GitHub, Star, ChevronDown} from "react-feather";
import Collapse from "../utils/Collapse";
import {useState} from "react";

const [open, setOpen] = useState(true);

<div className="row">
  <List width={300}>
    <ListItem primary="Dummy ListItem 1"/>
    <ListItem primary="Below me is a list header"/>
    <ListDivider/>
    <ListHeader
      title="DropdownList"
      tail={<ChevronDown/>}
      onClick={() => setOpen(!open)}
    />
    <Collapse open={open}>
      <ListItem primary="ListItem No Icon"/>
      <ListItem primary="Divided by ListDivider"/>
      <ListItem primary="Star Icon" icon={<Star/>}/>
      <ListItem primary="Github Icon" icon={<GitHub/>}/>
    </Collapse>
  </List>
</div>
```

`ListItem` with only `primary` text has 3 sizes.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import IconButton from "../buttons/IconButton";
import {Star, ChevronRight} from "react-feather";

const variants = ['primary', 'secondary', 'subdued', 'normal', 'disabled'];

<div className="row">
  <List width={200} size="large">
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        variant={variant}
        primary={variant}
        icon={<Star/>}
      />
    ))}
  </List>

  <List width={200} size="medium">
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        variant={variant}
        primary={variant}
        icon={<Star/>}
      />
    ))}
  </List>

  <List width={200} size="small">
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        size="medium"
        variant={variant}
        primary={variant}
        icon={<Star/>}
      />
    ))}
  </List>
</div>
```

You can also add a `secondary` text, in which the `size` prop will be ignored.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import IconButton from "../buttons/IconButton";
import {Star} from "react-feather";

const variants = ['primary', 'secondary', 'subdued', 'normal', 'disabled'];

<div className="row">
  <List width={200} size="large">
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        variant={variant}
        primary={variant}
        secondary="ignored size large"
        icon={<IconButton><Star/></IconButton>}
      />
    ))}
  </List>

  <List width={200} size="small">
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        variant={variant}
        primary={variant}
        secondary="ignored size small"
        icon={<IconButton><Star/></IconButton>}
      />
    ))}
  </List>
</div>
```

Arbitrary component can be appended to the end of a `ListItem` by using `tail` prop. `tail` is not controlled, so you
need to properly style it to fit in `ListItem`.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import IconButton from "../buttons/IconButton";
import {Star, ChevronRight} from "react-feather";

<div className="row">
  <List width={300}>
    <ListItem
      size="large"
      variant="normal"
      primary="ListItem with a icon tail"
      icon={<IconButton><Star/></IconButton>}
      tail={<ChevronRight width={20} height={20}/>}
    />
    <ListItem
      size="large"
      variant="normal"
      primary="ListItem with a text tail"
      icon={<IconButton><Star/></IconButton>}
      tail={<div style={{backgroundColor: "yellow"}}>Text tail</div>}
    />
  </List>
</div>
```

You can remove the paddings on the sides of the `ListItem` using `noPadding` prop.

```jsx
import List from "./List";
import ListItem from "./ListItem";
import IconButton from "../buttons/IconButton";
import {Star, ChevronRight} from "react-feather";

<div className="row">
  <List width={300}>
    <ListItem
      size="large"
      variant="secondary"
      noPadding={true}
      primary="ListItem without side paddings"
      icon={<IconButton><Star/></IconButton>}
    />
    <ListItem
      size="large"
      variant="secondary"
      noPadding={false}
      primary="ListItem without side paddings"
      icon={<IconButton><Star/></IconButton>}
    />
    <ListItem
      size="large"
      variant="secondary"
      noPadding={false}
      primary="ListItem with empty icon"
      icon={<div/>}
    />
  </List>
</div>
```


```jsx
import DropdownList from "./DropdownList";
import ListItem from "./ListItem";
import ListDivider from "./ListDivider";
import {GitHub, Star} from "react-feather";

<div className="row">
  <DropdownList title="DropdownList" width={200}>
    <ListItem primary="ListItem No Icon"/>
    <ListItem primary="Divided by ListDivider"/>
    <ListDivider/>
    <ListItem primary="Star Icon" icon={<Star/>}/>
    <ListItem primary="Github Icon" icon={<GitHub/>}/>
  </DropdownList>
</div>
```
