'use client';

import classNames from 'classnames';
import { useState } from 'react';

import ChevronSvg from '@/assets/chevron.svg';
import EnvironmentLayerControl from '@/client/LayerControls/EnvironmentLayerControl';
import POILayerControl from '@/client/LayerControls/POILayerControl';
import LocationInsights from '@/client/LocationInsights';
import SiteLogo from '@/client/SiteLogo';
import {
  useWeatherForecast,
  useWeatherAQI,
} from '@/client/hooks/useWeatherData';
import useMapStore from '@/stores/useMapStore';

import './SidePanel.scss';

const SidePanel = () => {
  const [isCollapsed, setIsCollapsed] =
    useState<boolean>(false);

  const userLocation = useMapStore(s => s.userLocation);

  const { data: forecastData, error: forecastError } =
    useWeatherForecast(userLocation);

  const { data: aqiData, error: aqiError } =
    useWeatherAQI(userLocation);

  const isWeatherError = forecastError || aqiError;

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
      <div className='body'>
        {!isWeatherError && (
          <section>
            <h2>Current Conditions</h2>
            <LocationInsights
              isLoading={!forecastData || !aqiData}
              userLocation={userLocation}
              {...forecastData}
              {...aqiData}
            />
          </section>
        )}
        <section>
          <h2>Public Spaces & Amenities</h2>
          <POILayerControl />
        </section>
        <section>
          <hgroup>
            <h2>Environmental Analysis</h2>
            <p className='hint'>
              Show one overlay at a time
            </p>
          </hgroup>
          <EnvironmentLayerControl />
        </section>
      </div>
    </aside>
  );
};

export default SidePanel;
