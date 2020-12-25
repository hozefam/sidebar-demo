import React from 'react';
import * as s from './App.styles';

import Sidebar from './components/Sidebar/Sidebar';
import MainView from './components/MainView/MainView';

const App = () => {
  const backgroundImage = 'images/mountain.jpg';
  const sidebarHeader = {
    fullname: 'Travellers',
    shortname: 'TrS',
  };
  const sidebarMenuItems = [
    { name: 'Home', to: '/', icon: '/icons/home.svg', subMenuItems: [] },
    {
      name: 'About',
      to: '/about',
      icon: '/icons/globe-alt.svg',
      subMenuItems: [],
    },
    {
      name: 'Destinations',
      to: '/destinations',
      icon: '/icons/location-marker.svg',
      subMenuItems: [
        { name: 'Canada', to: '/canada' },
        { name: 'India', to: '/india' },
        { name: 'Spain', to: '/spain' },
        { name: 'Brazil', to: '/brazil' },
      ],
    },
    { name: 'Blog', to: '/blog', icon: '/icons/rss.svg', subMenuItems: [] },
    {
      name: 'Services',
      to: '/services',
      icon: '/icons/desktop-computer.svg',
      subMenuItems: [],
    },
    {
      name: 'Contacts',
      to: '/contacts',
      icon: '/icons/device-mobile.svg',
      subMenuItems: [],
    },
  ];
  const fonts = {
    header: 'Mountains of Christmas',
    menu: 'IBM Plex Sans',
  };

  return (
    <s.App>
      <Sidebar
        backgroundImage={backgroundImage}
        sidebarHeader={sidebarHeader}
        sidebarMenuItems={sidebarMenuItems}
        fonts={fonts}
      />
      <MainView />
    </s.App>
  );
};

export default App;
