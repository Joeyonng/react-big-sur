Notification center consists of two parts: notifications and widgets. 

```jsx
import Button from "../buttons/Button";
import {useState} from "react";

import settingIcon from "../../media/icons/app-settings.png";
import NotificationCenter from "./NotificationCenter";
import Notifications from "./Notifications";
import Notification from "./Notification";
import Widgets from "./Widgets";
import Widget from "./Widget";

const [open, setOpen] = useState(true);
const [notifications, setNotifications] = useState({});
const [nextId, setNextId] = useState(0);

const deleteNotification = (prevNotifications, notificationId) => {
  let newNotifications = {...prevNotifications};
  delete newNotifications[notificationId];
  return newNotifications;
}

const dummyWidgets = (size) => {
  return (
    <Widget size={size}>
      <div style={{width: "100%", height: "100%", backgroundColor: "grey"}}/>
    </Widget>
  )
}

<div className="row">
  <Button onClick={() => setOpen(!open)}>
    Toggle Notification Center
  </Button>

  <Button
    onClick={() => {
      setNextId(nextId + 1);
      let newNotifications = {...notifications};
      newNotifications[nextId] = {
        id: nextId,
        headerIcon: <img src={settingIcon} width="100%" height="100%"/>,
        header: "header",
        primary: "I am a primary text.",
        secondary: "I am a secondary text.",
      };
      setNotifications(newNotifications);
    }}
  >
    Add notification
  </Button>

  <div 
    style={{
      zIndex: 1,
    }}
  >
    <NotificationCenter
      open={open}
      notifications={
        <Notifications>
          {Object.values(notifications).map((notification, index) => (
            <Notification
              key={notification.id}
              id={notification.id}
              headerIcon={notification.headerIcon}
              header={notification.header}
              primary={notification.primary}
              secondary={notification.secondary}
              onTimeout={() => {
                setNotifications(prevNotifications =>
                  deleteNotification(prevNotifications, notification.id)
                );
              }}
              onCloseClick={() => {
                setNotifications(deleteNotification(notifications, notification.id));
              }}
            />
          ))}
        </Notifications>
      }
    >
      <Widgets numRows={6}>
        {['medium', 'small', 'large', 'small', 'small', 'medium'].map(size => dummyWidgets(size))}
      </Widgets>
    </NotificationCenter>
  </div>
</div>
```

The notifications can be used separately. You can customize the way it enters.

```jsx
import Button from "../buttons/Button";
import settingIcon from "../../media/icons/app-settings.png";
import {useState} from "react";
import Notification from "./Notification";
import Notifications from "./Notifications";

const [notifications, setNotifications] = useState({});
const [nextId, setNextId] = useState(0);

const deleteNotification = (prevNotifications, notificationId) => {
  let newNotifications = {...prevNotifications};
  delete newNotifications[notificationId];
  return newNotifications;
}

<div className="row">
  <Button
    onClick={() => {
      setNextId(nextId + 1);
      let newNotifications = {...notifications};
      newNotifications[nextId] = {
        id: nextId,
        headerIcon: <img src={settingIcon} width="100%" height="100%"/>,
        header: "header",
        primary: "I am a primary text.",
        secondary: "I am a secondary text.",
      };
      setNotifications(newNotifications);
    }}
  >
    Add notification
  </Button>

  <Notifications
    horizontal="right"
    vertical="top"
  >
    {Object.values(notifications).map((notification) => (
      <Notification
        key={notification.id}
        id={notification.id}
        headerIcon={notification.headerIcon}
        header={notification.header}
        primary={notification.primary}
        secondary={notification.secondary}
        onCloseClick={() => {
          setNotifications(deleteNotification(notifications, notification.id));
        }}
        onTimeout={() => {
          setNotifications(prevNotifications => 
            deleteNotification(prevNotifications, notification.id)
          );
        }}
      />
    ))}
  </Notifications>
</div>
```

```jsx
import Notification from "./Notification";
import settingIcon from "../../media/icons/app-settings.png";

<div className="row">
  <Notification
    headerIcon={<img src={settingIcon} width="100%" height="100%"/>}
    header="header"
    primary="I am a primary text."
    secondary="I am a secondary text"
  />
</div>
```

