### `Slider` implements [Sliders][1].
[1]: https://developer.apple.com/design/human-interface-guidelines/macos/selectors/sliders/

There are 2 variants of `Slider`.

```jsx
import Slider from "./Slider";

<div className="row">
  <Slider defaultValue={50} variant="large"/>
  <Slider defaultValue={50} variant="small"/>
</div>
```

You can optionally add a header icon to `Slider` with `variant='large'`.

```jsx
import Slider from "./Slider";
import {Volume2} from "react-feather";

<div>
  <Slider defaultValue={50} variant="large" header={<Volume2/>}/>
</div>
```
