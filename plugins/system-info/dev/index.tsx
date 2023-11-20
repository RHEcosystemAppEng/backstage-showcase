import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { systemInfoPlugin, SystemInfoPage } from '../src/plugin';

createDevApp()
  .registerPlugin(systemInfoPlugin)
  .addPage({
    element: <SystemInfoPage />,
    title: 'Root Page',
    path: '/system-info',
  })
  .render();
