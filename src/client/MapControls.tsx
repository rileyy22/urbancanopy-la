import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  type GeolocateResultEvent,
} from 'react-map-gl/maplibre';

import useMapStore from '@/stores/useMapStore';

/**
 * @description MapLibre's built-in map controls.
 * Layer controls live in `LayerControl/` and are
 * rendered in `SidePanel`.
 */
const MapControls = () => {
  const setUserLocation = useMapStore(
    s => s.setUserLocation
  );

  const handleOutOfMaxBounds = () => {
    alert('You are outside the maximum bounds of the map.');
  };

  const handleGeolocate = (e: GeolocateResultEvent) => {
    const { longitude, latitude } = e.coords;
    setUserLocation({ lng: longitude, lat: latitude });
  };

  return (
    <>
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
    </>
  );
};

export default MapControls;
