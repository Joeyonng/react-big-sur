A simple `List`.

```jsx
import {List, ListItem, ListHeader, ListDivider} from "react-big-sur";
import {GitHub, Star} from "react-feather";

<div className="row">
  <List width={200}>
    <ListHeader title="A List Header"/>
    <ListItem primary="A ListItem No Icon"/>
    <ListItem primary="Divided by a ListDivider"/>
    <ListDivider/>
    <ListItem primary="Divided by a narrow ListDivider"/>
    <ListDivider narrow/>
    <ListItem primary="Star Icon" icon={<Star/>}/>
    <ListItem primary="Github Icon" icon={<GitHub/>}/>
  </List>
</div>
```

A special type of list that is collapsable.
```jsx
import {DropdownList, ListItem, ListDivider} from "react-big-sur";
import {GitHub, Star} from "react-feather";

<div className="row">
  <DropdownList title="DropdownList" width={200}>
    <ListItem primary="Click arrow to expand"/>
    <ListDivider/>
    <ListItem primary="Star Icon" icon={<Star/>}/>
  </DropdownList>
  
  <DropdownList title="DropdownList" width={200} loading>
    <ListItem primary="My parent is loading"/>
    <ListItem primary="Nothing to show here"/>
  </DropdownList>
</div>
```

`ListItem` with only `primary` text has 3 sizes and 5 variants.

```jsx
import {List, ListItem} from "react-big-sur";
import {Star, ChevronRight} from "react-feather";
import ListHeader from "./ListHeader";

const sizes = ['large', 'medium', 'small']
const variants = ['primary', 'secondary', 'subdued', 'normal', 'disabled'];

<div className="row">
  {sizes.map((size, index) => (
    <List key={index} width={200}>
      {variants.map((variant, index) => (
        <ListItem
          key={index}
          size={size}
          variant={variant}
          primary={variant}
          icon={<Star/>}
        />
      ))}
    </List>
  ))}
</div>
```

You can also add a `secondary` text, in which the `size` prop will be ignored.

```jsx
import {List, ListItem, IconButton} from "react-big-sur";
import {Star} from "react-feather";

const variants = ['primary', 'secondary', 'subdued', 'normal', 'disabled'];

<div className="row">
  <List width={200}>
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        size="large"
        variant={variant}
        primary={variant}
        secondary="ignored size large"
        icon={<IconButton><Star/></IconButton>}
      />
    ))}
  </List>

  <List width={200}>
    {variants.map((variant, index) => (
      <ListItem
        key={index}
        size="small"
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
import {List, ListItem, IconButton} from "react-big-sur";
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
import {List, ListItem, IconButton} from "react-big-sur";
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

You can specify `size`, `variant` and `noPadding` props on `List` as shortcuts for all children `ListItem`, which will
overwrite the same props passed to children `ListItem`.

```jsx
import {List, ListItem, ListHeader, ListDivider} from "react-big-sur";
import {GitHub, Star} from "react-feather";

<div className="row">
  <List width={200} size="large" variant="disabled">
    <ListItem 
      size="small" 
      variant="primary"
      primary="Small primary item"
      icon={<GitHub/>}
    />
    <ListItem
      size="large"
      variant="secondary"
      primary="Large secondary item" 
      icon={<Star/>}
    />
  </List>
</div>
```