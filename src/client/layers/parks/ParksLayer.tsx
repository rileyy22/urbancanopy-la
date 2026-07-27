import { Layer } from 'react-map-gl/maplibre';

import useTheme from '@/client/hooks/useTheme';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const ParksLayer = ({
  isLayerVisible,
}: {
  isLayerVisible: boolean;
}) => {
  const theme = useTheme();

  return (
    <Layer
      id={MAP_LAYER_IDS.parks}
      source={MAP_SOURCE_IDS.parks}
      type='fill'
      beforeId={
        theme === 'dark' ? 'place_other' : 'label_other' // see basemap style spec
      }
      filter={[
        'any',
        ['==', ['geometry-type'], 'Polygon'],
        ['==', ['geometry-type'], 'MultiPolygon'],
        ['==', ['geometry-type'], 'LineString'],
      ]}
      layout={{
        visibility: isLayerVisible ? 'visible' : 'none',
      }}
      paint={{
        'fill-color': '#3e8e5a',
        'fill-opacity': 0.4,
      }}
    />
  );
};

export default ParksLayer;
