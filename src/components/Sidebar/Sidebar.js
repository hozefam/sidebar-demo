import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  const [subMenuItemsState, setSubMenus] = useState({});

  // Effects

  // Update Header state
  useEffect(() => {
    isSidebarOpen
      ? setTimeout(() => {
          setHeader(sidebarHeader.fullname);
        }, 200)
      : setHeader(sidebarHeader.shortname);
  }, [isSidebarOpen, sidebarHeader]);

  // Add Index of menu items to sub menus state
  useEffect(() => {
    let newSubMenus = {};

    sidebarMenuItems.forEach((item, index) => {
      const hasSubMenus = !!item.subMenuItems.length;
      if (hasSubMenus) {
        newSubMenus[index] = {};
        newSubMenus[index]['isOpen'] = false;
        newSubMenus[index]['isSelected'] = null;
      }
    });

    setSubMenus(newSubMenus);
  }, [sidebarMenuItems]);

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

  const handleMenuItemClick = (name, index) => {
    setSelectedMenuItem(name);
    const subMenusCopy = JSON.parse(JSON.stringify(subMenuItemsState));
    if (subMenuItemsState.hasOwnProperty(index)) {
      subMenusCopy[index]['isOpen'] = !subMenuItemsState[index]['isOpen'];
      setSubMenus(subMenusCopy);
    } else {
      for (let item in subMenuItemsState) {
        subMenusCopy[item]['isOpen'] = false;
        subMenusCopy[item]['isSelected'] = null;
      }
      setSubMenus(subMenusCopy);
    }
  };

  const menuItemsJSX = sidebarMenuItems.map((item, index) => {
    const isItemSelected = selectedMenuItem === item.name;
    const hasSubMenus = !!item.subMenuItems.length;
    const isOpen = subMenuItemsState[index]?.isOpen;

    const handleSubMenuItemClick = (menuItemIndex, subMenuItemIndex) => {
      const subMenuCopy = JSON.parse(JSON.stringify(subMenuItemsState));
      subMenuCopy[menuItemIndex]['selected'] = subMenuItemIndex;
      setSubMenus(subMenuCopy);
    };

    const subMenusJSX = item.subMenuItems.map(
      (subMenuItem, subMenuItemIndex) => {
        const isSubMenuItemSelected =
          subMenuItemsState[index]?.selected === subMenuItemIndex;
        return (
          <Link
            to={`${item.to}${subMenuItem.to}`}
            key={subMenuItemIndex}
            style={{ textDecoration: 'none' }}
          >
            <s.SubMenuItem
              onClick={() => handleSubMenuItemClick(index, subMenuItemIndex)}
              selected={isSubMenuItemSelected}
            >
              {subMenuItem.name}
            </s.SubMenuItem>
          </Link>
        );
      }
    );

    return (
      <s.ItemContainer key={index}>
        <Link to={item.to} style={{ textDecoration: 'none' }}>
          <s.MenuItem
            isSelected={isItemSelected}
            font={fonts.menu}
            onClick={() => handleMenuItemClick(item.name, index)}
            isSidebarOpen={isSidebarOpen}
            isOpen={isOpen}
          >
            <s.Icon src={item.icon} isSidebarOpen={isSidebarOpen}></s.Icon>
            <s.Text isSidebarOpen={isSidebarOpen}>{item.name}</s.Text>

            {hasSubMenus && isSidebarOpen && (
              <s.DropdownIcon
                isOpen={isOpen}
                isSelected={isItemSelected}
              ></s.DropdownIcon>
            )}
          </s.MenuItem>
        </Link>

        <AnimatePresence>
          {hasSubMenus && isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <s.SubMenuItemContainer isSidebarOpen={isSidebarOpen}>
                {subMenusJSX}
              </s.SubMenuItemContainer>
            </motion.nav>
          )}
        </AnimatePresence>
      </s.ItemContainer>
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
