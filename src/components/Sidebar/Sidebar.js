import React, { useState, useEffect } from 'react';
import * as s from './Sidebar.styles';

const Sidebar = (props) => {
  const {
    backgroundImage = '',
    sidebarHeader = {
      fullname: '',
      shortname: '',
    },
    sidebarMenuItems = [],
    fonts = {
      header: '',
      menu: '',
    },
  } = props;

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    sidebarMenuItems[0].name
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [header, setHeader] = useState(sidebarHeader.fullname);

  // Effects

  // Update Header state
  useEffect(() => {
    console.log(isSidebarOpen);
    isSidebarOpen
      ? setTimeout(() => {
          setHeader(sidebarHeader.fullname);
        }, 200)
      : setHeader(sidebarHeader.shortname);
  }, [isSidebarOpen, sidebarHeader]);

  // Update of Sidebar state
  useEffect(() => {
    const updateWindowWidth = () => {
      console.log('Window width', window.innerWidth);
      if (window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const handleMenuItemClick = (name) => {
    setSelectedMenuItem(name);
  };

  const menuItemsJSX = sidebarMenuItems.map((item, index) => {
    const isItemSelected = selectedMenuItem === item.name;

    return (
      <s.MenuItem
        isSelected={isItemSelected}
        key={index}
        font={fonts.menu}
        onClick={() => handleMenuItemClick(item.name)}
        isSidebarOpen={isSidebarOpen}
      >
        <s.Icon src={item.icon} isSidebarOpen={isSidebarOpen}></s.Icon>
        <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>
      </s.MenuItem>
    );
  });

  return (
    <s.SidebarContainer
      backgroundImage={backgroundImage}
      isSidebarOpen={isSidebarOpen}
    >
      <s.SidebarHeader font={fonts.header}>{header}</s.SidebarHeader>
      <s.MenuItemContainer>{menuItemsJSX}</s.MenuItemContainer>
      <s.TogglerContainer>
        <s.Toggler onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </s.TogglerContainer>
    </s.SidebarContainer>
  );
};

export default Sidebar;
