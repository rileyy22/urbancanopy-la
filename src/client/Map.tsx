'use client';

import { omProtocol } from '@openmeteo/weather-map-layer';
import maplibregl from 'maplibre-gl';
import { useRef } from 'react';
import {
  Map as MapLibreMap,
  type MapRef,
  type MapSourceDataEvent,
} from 'react-map-gl/maplibre';

import TooltipManager from '@/client/TooltipManager';
import useTheme from '@/client/hooks/useTheme';
import BuildingsLayer from '@/client/layers/BuildingsLayer';
import HillshadeLayer from '@/client/layers/HillshadeLayer';
import MapControls from '@/client/MapControls';
import { LAYERS } from '@/constants/LAYERS';
import {
  SOURCES,
  type SourceId,
} from '@/constants/SOURCES';
import {
  MAP_CENTER,
  MAP_STYLE_LIGHT,
  MAP_STYLE_DARK,
  MAP_ZOOM,
} from '@/constants/MAP';
import useMapStore from '@/stores/useMapStore';

maplibregl.addProtocol('om', omProtocol); // implemented in `TemperatureSource`

const Map = () => {
  const mapRef = useRef<MapRef>(null);
  const theme = useTheme();

  const visibleLayers = useMapStore(s => s.visibleLayers);

  const setLoadedSource = useMapStore(
    s => s.setLoadedSource
  );

  const handleMapLoad = () => {
    const map = mapRef.current?.getMap();

    if (!map) {
      return;
    }

    // update the `loadedSources` state for any sources that
    // load before the 'sourcedata' event attaches
    const sourceIds = Object.keys(
      map.getStyle().sources
    ) as SourceId[];

    sourceIds.forEach(id => {
      const isTracked = SOURCES.map(s => s.id).includes(id);
      if (map.isSourceLoaded(id) && isTracked) {
        setLoadedSource(id, true);
      }
    });

    const onSourceData = (e: MapSourceDataEvent) => {
      if (e.sourceId && e.isSourceLoaded) {
        setLoadedSource(e.sourceId as SourceId, true);
      }
    };
    map.on('sourcedata', onSourceData);
  };

  return (
    <MapLibreMap
      ref={mapRef}
      mapStyle={
        theme === 'dark' ? MAP_STYLE_DARK : MAP_STYLE_LIGHT
      }
      initialViewState={{
        zoom: MAP_ZOOM,
        longitude: MAP_CENTER.lng,
        latitude: MAP_CENTER.lat,
      }}
      maxPitch={60}
      dragRotate
      touchPitch
      onLoad={handleMapLoad}
    >
      <MapControls />
      <HillshadeLayer />
      <BuildingsLayer />
      {SOURCES.map(({ component: SourceComponent, id }) => (
        <SourceComponent key={id} />
      ))}
      {LAYERS.map(({ component: LayerComponent, id }) => (
        <LayerComponent
          key={id}
          isLayerVisible={visibleLayers[id]}
        />
      ))}
      <TooltipManager />
    </MapLibreMap>
  );
};

export default Map;
