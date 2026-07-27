import { Layer } from 'react-map-gl/maplibre';

import useTheme from '@/client/hooks/useTheme';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const ShadeCoverageLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  const theme = useTheme();

  return (
    <Layer
      id={MAP_LAYER_IDS.shadeCoverage}
      source={MAP_SOURCE_IDS.shadeCoverage}
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
          'interpolate',
          ['exponential', 5],
          ['get', 'shade_score'],
          0.0,
          '#f8f9fc',
          0.3,
          '#eef1f8',
          0.4,
          '#9eaad0',
          0.5,
          '#526189',
          0.6,
          '#2a3650',
          1.0,
          '#1b2030',
        ],
        'fill-opacity': 0.6,
      }}
    />
  );
};

export default ShadeCoverageLayer;
