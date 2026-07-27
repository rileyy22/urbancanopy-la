import { Layer } from 'react-map-gl/maplibre';

import useTheme from '@/client/hooks/useTheme';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const TreeDensityLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  const theme = useTheme();

  return (
    <Layer
      id={MAP_LAYER_IDS.treeDensity}
      source={MAP_SOURCE_IDS.treeDensity}
      beforeId={
        theme === 'dark' ? 'place_other' : 'label_other' // see basemap style spec
      }
      type='fill'
      filter={[
        'any',
        ['==', ['geometry-type'], 'Polygon'],
        ['==', ['geometry-type'], 'MultiPolygon'],
      ]}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
      }}
      paint={{
        'fill-color': [
          'step',
          ['get', 'tree_count'],
          '#f7fcf5',
          167,
          '#c7e9c0',
          280,
          '#74c476',
          379,
          '#31a354',
          519,
          '#006d2c',
          800,
          '#00441b',
        ],
        'fill-opacity': 0.6,
      }}
    />
  );
};

export default TreeDensityLayer;
