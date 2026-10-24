import CodePurpleSvg from '@meteocons/svg-static/flat/code-purple.svg';
import PollenWeedSvg from '@meteocons/svg-static/flat/pollen-weed.svg';

import { getWeatherCode } from '@/client/LocationInsights/getWeatherCode';
import Spinner from '@/client/Spinner';
import { MAP_CENTER } from '@/constants/MAP';
import type { Coordinates } from '@/types/map.types';
import type {
  WeatherAQIProperties,
  WeatherForecastProperties,
} from '@/types/weather.types';

import './LocationInsights.scss';

type LocationInsightsProps = WeatherForecastProperties
  & WeatherAQIProperties & {
    isLoading: boolean;
    userLocation: Coordinates;
  };

const LocationInsights = ({
  isLoading,
  userLocation,
  apparentTemperature,
  temperature,
  uvIndex,
  weatherCode,
  aqi,
}: LocationInsightsProps) => {
  const { Icon: WeatherIcon, label: weatherDesc } =
    getWeatherCode(weatherCode);

  if (isLoading) {
    return (
      <div className='LocationInsights'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='LocationInsights'>
      <div className='temperature-summary'>
        <WeatherIcon className='weather-icon' />
        <b className='temp heavy'>
          {Math.round(temperature)}°F
        </b>
        <span>
          Feels like{' '}
          <b className='heavy'>
            {Math.round(apparentTemperature)}°F
          </b>
        </span>
        <span>{weatherDesc}</span>
      </div>
      <div className='weather-metadata'>
        <div className='heat-risk'>
          <PollenWeedSvg />
          <span>AQI</span>
          <b className='heavy'>{aqi}</b>
        </div>
        <div className='uv-index'>
          <CodePurpleSvg />
          <span>UV Index</span>
          <b className='heavy'>{uvIndex}</b>
        </div>
      </div>
      <div className='current-location'>
        <div className='pulsing-dot' />
        <span className='desc'>
          {(
            userLocation.lng === MAP_CENTER.lng
            && userLocation.lat === MAP_CENTER.lat
          ) ?
            'Los Angeles, CA'
          : 'Your location'}
        </span>
        <span className='coord'>
          {`${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}`}
        </span>
      </div>
    </div>
  );
};

export default LocationInsights;
