import { Source } from 'react-map-gl/maplibre';

import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

const OPEN_METEO_TEMPERATURE_TILE_URL = `https://openmeteo.s3.amazonaws.com/data_spatial/dwd_icon/latest.json?time_step=current_time_1H&variable=temperature_2m`;

const TemperatureSource = () => {
  return (
    <>
      <Source
        id={MAP_SOURCE_IDS.temperature}
        type='raster'
        url={`om://${OPEN_METEO_TEMPERATURE_TILE_URL}`}
      />
      <Source
        id='temperature-labels-source'
        type='vector'
        url={`om://${OPEN_METEO_TEMPERATURE_TILE_URL}&grid=true`}
      />
    </>
  );
};

export default TemperatureSource;
