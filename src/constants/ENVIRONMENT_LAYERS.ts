import HexagonGraySvg from '@/assets/hexagonGray.svg';
import HexagonGreenSvg from '@/assets/hexagonGreen.svg';
import TemperatureRasterSvg from '@/assets/temperatureRaster.svg';
import ShadeCoverageLayer from '@/client/layers/shadeCoverage/ShadeCoverageLayer';
import TreeDensityLayer from '@/client/layers/treeDensity/TreeDensityLayer';
import TemperatureLayer from '@/client/layers/temperature/TemperatureLayer';
import { MAP_SOURCE_IDS } from '@/constants/MAP_SOURCE_IDS';

/**
 * @constant
 * @description Environment map layer configurations.
 * Not visible by default.
 */
export const ENVIRONMENT_LAYERS = [
  {
    id: 'treeDensity',
    label: 'Tree Density',
    icon: HexagonGreenSvg,
    component: TreeDensityLayer,
    sourceId: MAP_SOURCE_IDS.treeDensity,
    isVisibleByDefault: false,
  },
  {
    id: 'shadeCoverage',
    label: 'Shade Coverage',
    icon: HexagonGraySvg,
    component: ShadeCoverageLayer,
    sourceId: MAP_SOURCE_IDS.shadeCoverage,
    isVisibleByDefault: false,
  },
  {
    id: 'temperature',
    label: 'Temperature',
    icon: TemperatureRasterSvg,
    component: TemperatureLayer,
    sourceId: MAP_SOURCE_IDS.temperature,
    isVisibleByDefault: false,
  },
] as const;

export type EnvironmentLayerId =
  (typeof ENVIRONMENT_LAYERS)[number]['id'];
