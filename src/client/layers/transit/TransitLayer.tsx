import { Layer } from 'react-map-gl/maplibre';

import useTheme from '@/client/hooks/useTheme';
import { TRANSIT_STOPS_MIN_ZOOM } from '@/constants/MAP';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TransitLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  const theme = useTheme();

  return (
    <>
      <Layer
        id={MAP_LAYER_IDS.transitRoutes}
        source={MAP_SOURCE_IDS.transitRoutes}
        type='line'
        beforeId={
          theme === 'dark' ? 'place_other' : 'label_other' // see basemap style spec
        }
        filter={['==', ['geometry-type'], 'LineString']}
        layout={{
          visibility: isLayerVisible ? 'visible' : 'none',
          'line-cap': 'round',
          'line-join': 'round',
        }}
        paint={{
          'line-color': [
            'case',
            ['has', 'route_color'],
            ['concat', '#', ['get', 'route_color']],
            '#5b6b7c',
          ],
          'line-width': [
            'case',
            ['==', ['get', 'route_type'], 3],
            1,
            3,
          ],
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.transitStops}
        source={MAP_SOURCE_IDS.transitStops}
        type='circle'
        beforeId={
          theme === 'dark' ? 'place_city' : 'label_city' // see basemap style spec
        }
        minzoom={TRANSIT_STOPS_MIN_ZOOM}
        filter={[
          'all',
          ['==', ['geometry-type'], 'Point'],
          [
            '!',
            [
              'in',
              ['get', 'route_type'],
              ['literal', [0, 1]],
            ],
          ],
        ]}
        layout={{
          visibility: isLayerVisible ? 'visible' : 'none',
        }}
        paint={{
          'circle-radius': 3,
          'circle-color': '#5b6b7c',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#000',
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.transitMetroStops}
        source={MAP_SOURCE_IDS.transitStops}
        type='symbol'
        beforeId={
          theme === 'dark' ? 'place_city' : 'label_city' // see basemap style spec
        }
        filter={[
          'all',
          ['==', ['geometry-type'], 'Point'],
          [
            'in',
            ['get', 'route_type'],
            ['literal', [0, 1]],
          ],
        ]}
        layout={{
          visibility: isLayerVisible ? 'visible' : 'none',
          'icon-image': 'metro-stop-icon',
          'icon-size': 0.2,
          'icon-allow-overlap': true,
        }}
      />
    </>
  );
};

export default TransitLayer;
