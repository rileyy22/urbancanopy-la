'use client';

import classNames from 'classnames';
import { useState } from 'react';

import ChevronSvg from '@/assets/chevron.svg';
import SiteLogo from '@/client/SiteLogo';

import './SidePanel.scss';

const SidePanel = () => {
  const [isCollapsed, setIsCollapsed] =
    useState<boolean>(false);

  return (
    <aside
      className={classNames('SidePanel', {
        collapsed: isCollapsed,
      })}
      aria-label='Map options'
    >
      <div className='header'>
        <SiteLogo />
        <button
          className='toggle'
          aria-expanded={!isCollapsed}
          aria-label='Toggle map options'
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          <ChevronSvg className='chevron' />
        </button>
      </div>
      <div className='body' />
    </aside>
  );
};

export default SidePanel;
