The content of each `Segment` can be texts.
```jsx
import Segments from "./Segments";
import Segment from "./Segment";

<Segments
  defaultIndex={1}
  onChange={(prevIndex, curIndex) => console.log(prevIndex, curIndex)}
>
  <Segment>First</Segment>
  <Segment>Second</Segment>
  <Segment>Third</Segment>
  <Segment>Fourth</Segment>
</Segments>
```

The content of each `Segment` can also be Icons.
```jsx
import Segments from "./Segments";
import Segment from "./Segment";
import {X, Calendar, Star, Bookmark} from "react-feather";

<Segments
  defaultIndex={1}
  onChange={(prevIndex, curIndex) => console.log(prevIndex, curIndex)}
>
  <Segment><X/></Segment>
  <Segment><Calendar/></Segment>
  <Segment><Star/></Segment>
  <Segment><Bookmark/></Segment>
</Segments>
```
