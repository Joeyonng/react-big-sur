Simple `Menu` with `MenuItem`.

```jsx
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import MenuDivider from "./MenuDivider";

<div className="row">
  <Menu size="small">
    <MenuItem primary="I am a MenuItem"/>
    <MenuItem primary="Menu = <div/>"/>
    <MenuItem primary="MenuItem = ListItem"/>
    <MenuDivider/>
    <MenuItem primary="MenuDivider = ListDivider"/>
  </Menu>
  
  <Menu size="medium">
    <MenuItem primary="I am a MenuItem"/>
    <MenuItem primary="Menu = <div/>"/>
    <MenuItem primary="MenuItem = ListItem"/>
    <MenuDivider/>
    <MenuItem primary="MenuDivider = ListDivider"/>
  </Menu>

  <Menu size="large">
    <MenuItem primary="I am a MenuItem"/>
    <MenuItem primary="Menu = <div/>"/>
    <MenuItem primary="MenuItem = ListItem"/>
    <MenuDivider/>
    <MenuItem primary="MenuDivider = ListDivider"/>
  </Menu>
</div>
```

Part of the `Menu` is selectable using `MenuSelection`.

```jsx
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import MenuSelection from "./MenuSelection";
import MenuDivider from "./MenuDivider";

<div className="row">
  <Menu>
    <MenuSelection variant="indent">
      <MenuItem primary="Click has no effect"/>
      <MenuItem primary="also no effect ..."/>
    </MenuSelection>
    <MenuDivider/>
    
    <MenuSelection variant="select">
      <MenuItem primary="Click me to select me"/>
      <MenuItem primary="Click me also deselect others"/>
      <MenuItem primary="Above is true"/>
    </MenuSelection>
    <MenuDivider/>
    
    <MenuSelection variant="check">
      <MenuItem primary="Click me to select me"/>
      <MenuItem primary="Click me won't deselect others"/>
      <MenuItem primary="Click me again to deselect me"/>
    </MenuSelection>
  </Menu>
</div>
```

If a `Menu` is nested in a `MenuItem`, it becomes a submenu of that `MenuItem`.

```jsx
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import MenuSelection from "./MenuSelection";
import MenuDivider from "./MenuDivider";

<div className="row">
  <Menu>
    <MenuItem primary="I have a submenu :)">
      <Menu>
        <MenuItem primary="I am in a submenu!"/>
        <MenuItem primary="Look how pretty I am"/>
      </Menu>
    </MenuItem>
    <MenuItem primary="I don't have a submenu :("/>
    <MenuItem primary="I also have a submenu :)">
      <Menu>
        <MenuItem primary="I am in another submenu!"/>
        <MenuItem primary="Look how pretty I am"/>
      </Menu>
    </MenuItem>
  </Menu>
</div>
```

```jsx
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import MenuButton from "./MenuButton";
import MenuButtonGroup from "./MenuButtonGroup";


<div className="row background">
  <MenuButtonGroup>
    <MenuButton title="Menu1">
      <Menu>
        <MenuItem primary="I have a submenu :)">
          <Menu>
            <MenuItem primary="I am in a submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
        <MenuItem primary="I don't have a submenu :("/>
        <MenuItem primary="I also have a submenu :)">
          <Menu>
            <MenuItem primary="I am in another submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
      </Menu>
    </MenuButton>

    <MenuButton title="Menu2">
      <Menu>
        <MenuItem primary="I have a submenu :)">
          <Menu>
            <MenuItem primary="I am in a submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
        <MenuItem primary="I don't have a submenu :("/>
        <MenuItem primary="I also have a submenu :)">
          <Menu>
            <MenuItem primary="I am in another submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
      </Menu>
    </MenuButton>
    
    <MenuButton title="Menu2">
      <Menu>
        <MenuItem primary="I have a submenu :)">
          <Menu>
            <MenuItem primary="I am in a submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
        <MenuItem primary="I don't have a submenu :("/>
        <MenuItem primary="I also have a submenu :)">
          <Menu>
            <MenuItem primary="I am in another submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
      </Menu>
    </MenuButton>
    <MenuButton title="Menu2">
      <Menu>
        <MenuItem primary="I have a submenu :)">
          <Menu>
            <MenuItem primary="I am in a submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
        <MenuItem primary="I don't have a submenu :("/>
        <MenuItem primary="I also have a submenu :)">
          <Menu>
            <MenuItem primary="I am in another submenu!"/>
            <MenuItem primary="Look how pretty I am"/>
          </Menu>
        </MenuItem>
      </Menu>
    </MenuButton>
  </MenuButtonGroup>
</div>
```