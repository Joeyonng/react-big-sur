`Button` and `IconButton` have 4 variants.

```jsx
import Button from "./Button";

<div className="row">
  <Button variant='primary'>Joeyonng</Button>
  <Button variant='secondary'>Joeyonng</Button>
  <Button variant='subdued'>Joeyonng</Button>
  <Button variant='disabled'>Joeyonng</Button>
</div>
```

```jsx
import IconButton from "./IconButton";
import {X, Calendar, Star, Bookmark} from "react-feather";

<div className="row">
  <IconButton variant='primary'>J</IconButton>
  <IconButton variant='secondary'>J</IconButton>
  <IconButton variant='subdued'>J</IconButton>
  <IconButton variant='disabled'>J</IconButton>
</div>
```

You can also pass in icons.

```jsx
import Button from "./Button";
import {X, Calendar, Star, Bookmark} from "react-feather";

<div className="row">
  <Button variant='primary'><X/></Button>
  <Button variant='secondary'><Calendar/></Button>
  <Button variant='subdued'><Star/></Button>
  <Button variant='disabled'><Bookmark/></Button>
</div>
```

```jsx
import IconButton from "./IconButton";
import {X, Calendar, Star, Bookmark} from "react-feather";

<div className="row">
  <IconButton variant='primary'><X/></IconButton>
  <IconButton variant='secondary'><Calendar/></IconButton>
  <IconButton variant='subdued'><Star/></IconButton>
  <IconButton variant='disabled'><Bookmark/></IconButton>
</div>
```

`Button` has 2 different sizes and `IconButton` has 3 sizes.

```jsx
import Button from "./Button";
import {Star, Bookmark} from "react-feather";

<div className="row">
  <Button size="large">Joeyonng</Button>
  <Button size="small">Joeyonng</Button>
  <Button size="large"><Star/></Button>
  <Button size="small"><Bookmark/></Button>
</div>
```

```jsx
import IconButton from "./IconButton";
import {Star, Bookmark} from "react-feather";

<div className="row">
  <IconButton size="large">J</IconButton>
  <IconButton size="medium">J</IconButton>
  <IconButton size="small">J</IconButton>
  <IconButton size="large"><Star width="100%" height="100%"/></IconButton>
  <IconButton size="medium"><Star width="100%" height="100%"/></IconButton>
  <IconButton size="small"><Star width="100%" height="100%"/></IconButton>
</div>
```

`Button` and `IconButton` with `disabled={true}` have no clicked down effect.

```jsx
import Button from "./Button";
import IconButton from "./IconButton";
import {Star, Bookmark} from "react-feather";

<div className="row">
  <Button disabled={true}>Joeyonng</Button>
  <Button disabled={true}><Star/></Button>
</div>
```

```jsx
import IconButton from "./IconButton";
import {Star, Bookmark} from "react-feather";

<div className="row">
  <IconButton disabled={true}>J</IconButton>
  <IconButton disabled={true}><Star/></IconButton>
</div>
```

`ToolbarItem` is a special type of Button that should only be used on the toolbar of the window. 
`ToolbarItem` has 4 different variants from `Button`.
```jsx
import ToolbarItem from "./ToolbarItem";
import {X, Calendar, Star, Bookmark} from "react-feather";

<div className="row">
  <ToolbarItem variant="focused"><X/></ToolbarItem>
  <ToolbarItem variant="selected"><Calendar/></ToolbarItem>
  <ToolbarItem variant="deselected"><Star/></ToolbarItem>
  <ToolbarItem variant="disabled"><Bookmark/></ToolbarItem>
</div>
```

`ToolbarItem` with `disabled={true}` has no hover or clicked down effect.
```jsx padded
import ToolbarItem from "./ToolbarItem";
import {X, Calendar, Star, Bookmark} from "react-feather";

<div className="row">
  <ToolbarItem disabled={true} variant="focused"><X/></ToolbarItem>
  <ToolbarItem disabled={true} variant="selected"><Calendar/></ToolbarItem>
  <ToolbarItem disabled={true} variant="deselected"><Star/></ToolbarItem>
  <ToolbarItem disabled={true} variant="disabled"><Bookmark/></ToolbarItem>
</div>
```