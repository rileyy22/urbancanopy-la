import type { Coordinates } from '@/types/map.types';

/**
 * @constant
 * @description The initial center of the map - Los Angeles
 */
export const MAP_CENTER: Coordinates = {
  lng: -118.25,
  lat: 34.05,
};

/**
 * @constant
 * @description The map style spec for light mode
 * @see {@link https://openfreemap.org/}
 */
export const MAP_STYLE_LIGHT =
  'https://tiles.openfreemap.org/styles/bright';

/**
 * @constant
 * @description The map style spec for dark mode
 * @see {@link https://openfreemap.org/}
 */
export const MAP_STYLE_DARK =
  'https://tiles.openfreemap.org/styles/dark';

/**
 * @constant
 * @description The initial zoom level of the map
 */
export const MAP_ZOOM = 10;

/**
 * @constant
 * @description The minimum zoom level for 3d buildings to be visible
 */
export const BUILDINGS_MIN_ZOOM = 14;

/**
 * @constant
 * @description The minimum zoom level for transit stops to be visible
 */
export const TRANSIT_STOPS_MIN_ZOOM = 12;
