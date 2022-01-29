You can choose 2 variants of `Slider` in React Big Sur.
```jsx
import Slider from "./Slider";

<>
  <Slider defaultValue={50} variant="large"/>
  <Slider defaultValue={50} variant="small"/>
</>
```

You can optionally add a header icon to `Slider` with `variant='large'`.
```jsx
import Slider from "./Slider";
import {Volume2} from "react-feather";

<>
  <Slider defaultValue={50} variant="large" header={<Volume2/>}/>
</>
```
