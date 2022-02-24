```jsx
import {Dock, DockItem, DockDivider} from "react-big-sur"

import {bigSurIcons} from "../../media/icons/index";
const allApps = Object.entries(bigSurIcons);

<div className="canvas background">
  <Dock
    position="left"
  >
    <DockItem
      key={allApps[0][0]}
      id={allApps[0][0]}
      src={allApps[0][1]}
      name={allApps[0][0]}
    />
    <DockItem
      key={allApps[1][0]}
      id={allApps[1][0]}
      src={allApps[1][1]}
      name={allApps[1][0]}
    />
    <DockDivider
      id="divider"
    />
    <DockItem
      key={allApps[2][0]}
      id={allApps[2][0]}
      src={allApps[2][1]}
      name={allApps[2][0]}
    />
  </Dock>
</div>
```

```jsx
import {useState} from "react";
import {Dock, DockContainer, DockItem, DockDivider, Button} from "react-big-sur"

import {bigSurIcons} from "../../media/icons/index";
const allApps = Object.entries(bigSurIcons);

const [choices, setChoices] = useState([0, 1, 2]);

<div className="canvas background">
  {['top', 'bottom', 'left', 'right'].map((position, index) =>
    <Dock
      key={position}
      baseSize={32 * (index + 1)}
      largeSize={128}
      position={position}
    >
      {choices.map((choice, index) =>
        <DockItem
          key={allApps[choice][0]}
          id={allApps[choice][0]}
          src={allApps[choice][1]}
          name={allApps[choice][0]}
        >
          <img src={allApps[choice][1]}/>
        </DockItem>
      )}

      <DockDivider
        id="divider"
      />

      <DockItem
        key={allApps[10][0]}
        id={allApps[10][0]}
        src={allApps[10][1]}
        name={allApps[10][0]}
      >
        <img src={allApps[10][1]}/>
      </DockItem>
    </Dock>
  )}
</div>
```

```jsx
import {useRef, useState} from "react";
import {Dock, DockContainer, DockItem, DockDivider, Button, AnimatedWindow, TitleBarWindow} from "react-big-sur"
import {toPng} from "html-to-image";

import {bigSurIcons} from "../../media/icons/index";
const allApps = Object.entries(bigSurIcons);

const [choices, setChoices] = useState([0, 1, 2, 3]);
const [image, setImage] = useState(null);

const windowRef = useRef(null);
<div
  className="canvas background"
>
  <AnimatedWindow
    initial={{x: 100, y: 100, w: 360, h: 240}}
    cancel=".content"
    hidden={image !== null}
  >
    <TitleBarWindow
      ref={windowRef}
      width="100%"
      height="100%"
      onMinimizeClick={() => {
        toPng(windowRef.current).then(dataUrl => {
          setImage(dataUrl)
        }).catch(error => {
          console.error(error);
        });
      }}
    />
  </AnimatedWindow>

  <div
    className="row"
  >
    <Button
      onClick={() => {
        const nonSelected = []
        allApps.forEach((_, index) => {if (!choices.includes(index)) nonSelected.push(index)})

        const newIndex = Math.floor(Math.random() * nonSelected.length);
        const oldIndex = Math.floor(Math.random() * choices.length);
        let newChoices = [...choices];
        newChoices.splice(oldIndex, 0, nonSelected[newIndex]);
        setChoices(newChoices);
      }}
      disabled={choices.length === allApps.length}
      variant={choices.length === allApps.length ? 'disabled' : 'primary'}
    >
      Add DockItem
    </Button>

    <Button
      onClick={() => {
        let oldIndex = Math.floor(Math.random() * choices.length);
        let newChoices = [...choices];
        newChoices.splice(oldIndex, 1);
        setChoices(newChoices);
      }}
      disabled={choices.length === 1}
      variant={choices.length === 1 ? 'disabled' : 'secondary'}
    >
      Remove DockItem
    </Button>
  </div>

  <Dock
    tileSize={64}
    largeSize={128}
    position="bottom"
    debug={false}
  >
    {choices.map((choice, index) =>
      <DockItem
        key={allApps[choice][0]}
        id={allApps[choice][0]}
        src={allApps[choice][1]}
        subSrc={allApps[choice][1]}
        name={allApps[choice][0]}
        onClick={() => {
          let newChoices = [...choices];
          newChoices.splice(index, 1);
          setChoices(newChoices);
        }}
      />
    )}

    {!image ? undefined :
      <DockItem
        key={'image'}
        id={'image'}
        src={image}
        subSrc={allApps[10][1]}
        name={'image'}
        onClick={() => {setImage(undefined)}}
        animateDOMRect={windowRef.current.getBoundingClientRect()}
        onAnimateStop={(type, value) =>{
          if (type === 'inOut' && value === 0) setImage(null);
        }}
      />
    }
  </Dock>
</div>
```
