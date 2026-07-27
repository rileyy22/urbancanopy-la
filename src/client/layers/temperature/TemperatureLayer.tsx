import { Layer } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TemperatureLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  return (
    <>
      <Layer
        id={MAP_LAYER_IDS.temperature}
        source={MAP_SOURCE_IDS.temperature}
        type='raster'
        layout={{
          visibility: isLayerVisible ? 'visible' : 'none',
        }}
        paint={{
          'raster-opacity': 0.5,
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.temperatureLabels}
        source='temperature-labels-source'
        source-layer='grid'
        type='symbol'
        layout={{
          visibility: isLayerVisible ? 'visible' : 'none',
          'text-font': ['Noto Sans Regular'],
          'text-field': [
            'to-string',
            [
              'round',
              ['+', ['*', ['get', 'value'], 1.8], 32], // convert c to f
            ],
          ],
          'text-allow-overlap': true,
          'text-size': 12,
        }}
        paint={{
          'text-color': '#000',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
        }}
      />
    </>
  );
};

export default TemperatureLayer;
