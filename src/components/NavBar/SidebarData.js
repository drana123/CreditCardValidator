import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as FcIcons from 'react-icons/fc';


export const SidebarData = [
  {
    title: 'API Configuration',
    path: '/apiConfig',
    icon: <FcIcons.FcDataConfiguration />,
    testId: 'apiConfigTest',
    cName: 'nav-text',
    
  },
  {
    title: 'Users Management',
    path: '/usersManagement',
    icon: <IoIcons.IoMdPeople />,
    testId: 'usersManagementTest',
    cName: 'nav-text'
  },
  {
    title: 'Nightly Batch Process',
    path: '/nightlyBatchProcess',
    icon: <FcIcons.FcProcess color="white" />,
    testId: 'nightlyBatchTest',
    cName: 'nav-text'
  },
  {
    title: 'Pricing View',
    path: '/pricingView',
    icon: <IoIcons.IoMdPeople />,
    testId: 'pricingViewTest',
    cName: 'nav-text'
  }
];