import { useState } from 'react';
import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  type GeolocateResultEvent,
} from 'react-map-gl/maplibre';

import LayerControl from '@/client/LayerControl';
import LocationInsights from '@/client/LocationInsights';
import {
  useWeatherForecast,
  useWeatherAQI,
} from '@/client/hooks/useWeatherData';
import { MAP_CENTER } from '@/constants/MAP';
import type { Coordinates } from '@/types/map.types';

import './MapControls.scss';

const MapControls = () => {
  const [userLocation, setUserLocation] =
    useState<Coordinates>(MAP_CENTER);

  const { data: forecastData, error: forecastError } =
    useWeatherForecast(userLocation);

  const { data: aqiData, error: aqiError } =
    useWeatherAQI(userLocation);

  const handleOutOfMaxBounds = () => {
    alert('You are outside the maximum bounds of the map.');
  };

  const handleGeolocate = (e: GeolocateResultEvent) => {
    const { longitude, latitude } = e.coords;
    setUserLocation({ lng: longitude, lat: latitude });
  };

  return (
    <div className='MapControls'>
      <LayerControl />
      <LocationInsights
        isError={forecastError || aqiError}
        isLoading={!forecastData || !aqiData}
        userLocation={userLocation}
        {...forecastData}
        {...aqiData}
      />
      <GeolocateControl
        position='top-right'
        positionOptions={{ enableHighAccuracy: true }}
        onOutOfMaxBounds={handleOutOfMaxBounds}
        onGeolocate={handleGeolocate}
      />
      <NavigationControl
        position='top-right'
        showZoom
        showCompass
        visualizePitch
        visualizeRoll
      />
      <ScaleControl
        position='bottom-right'
        unit='imperial'
      />
    </div>
  );
};

export default MapControls;
