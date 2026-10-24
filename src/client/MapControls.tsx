import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
  type GeolocateResultEvent,
} from 'react-map-gl/maplibre';

import LayerControl from '@/client/LayerControl';
import useMapStore from '@/stores/useMapStore';

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
    <div className='MapControls'>
      <LayerControl />
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
