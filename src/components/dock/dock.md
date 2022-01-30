```jsx
import {useState} from "react";
import Dock from "./Dock";
import DockContainer from "./DockContainer";
import DockItem from "./DockItem";
import Button from "../buttons/Button";

import calculator from "../../media/icons/app-calculator.png";
import calendar from "../../media/icons/app-calendar.png";
import facetime from "../../media/icons/app-facetime.png";
import finder from "../../media/icons/app-finder.png";
import home from "../../media/icons/app-home.png";
import mail from "../../media/icons/app-mail.png";
import maps from "../../media/icons/app-maps.png";
import messages from "../../media/icons/app-messages.png";
import news from "../../media/icons/app-news.png";
import settings from "../../media/icons/app-settings.png";
import safari from "../../media/icons/app-safari.png";
import store from "../../media/icons/app-store.png";

const allApps = [
  {name: 'Calculator', icon: calculator,},
  {name: 'Calendar', icon: calendar,},
  {name: 'Facetime', icon: facetime,},
  {name: 'Finder', icon: finder,},
  {name: 'Home', icon: home,},
  {name: 'Mail', icon: mail,},
  {name: 'maps', icon: maps,},
  {name: 'messages', icon: messages,},
  {name: 'news', icon: news,},
  {name: 'System Preferences', icon: settings,},
  {name: 'Safari', icon: safari,},
  {name: 'App Store', icon: store,},
]
const [choices, setChoices] = useState([0, 1, 2, 3, 4]);

<div 
  className="canvas background"
>
  <Button
    onClick={() => {
      let randomIndex = Math.floor(Math.random() * choices.length);
      let newChoices = [...choices];
      newChoices.splice(randomIndex, 0, Math.max(...choices) + 1);
      // newChoices.splice(randomIndex, 1);
      setChoices(newChoices);
    }}
  >
    Random
  </Button>

  <Dock
    tileSize={64}
    largeSize={128}
    orientation="top"
    debug={false}
  >
    {choices.map((choice, index) =>
      <DockItem
        key={allApps[choice].name}
        id={allApps[choice].name}
        name={allApps[choice].name}
        onClick={() => {
          let newChoices = [...choices];
          newChoices.splice(index, 0, Math.max(...choices) + 1);
          // newChoices.splice(index, 1);
          setChoices(newChoices);
        }}
      >
        <img src={allApps[choice].icon}/>
      </DockItem>
    )}
  </Dock>
  
  <Dock
    tileSize={64}
    largeSize={128}
    orientation="bottom"
    debug={false}
  >
    {choices.map((choice, index) =>
      <DockItem
        key={allApps[choice].name}
        id={allApps[choice].name}
        name={allApps[choice].name}
        running={true}
        onClick={() => {
          let newChoices = [...choices];
          newChoices.splice(index, 0, Math.max(...choices) + 1);
          // newChoices.splice(index, 1);
          setChoices(newChoices);
        }}
      >
        <img src={allApps[choice].icon}/>
      </DockItem>
    )}
  </Dock>
</div>
```