import { create } from 'zustand';
import { LAYERS, type LayerId } from '@/constants/LAYERS';
import { MAP_CENTER } from '@/constants/MAP';
import {
  SOURCES,
  type SourceId,
} from '@/constants/SOURCES';
import type { Coordinates } from '@/types/map.types';

type VisibleLayers = Record<LayerId, boolean>;
type LoadedSources = Record<SourceId, boolean>;

type MapStore = {
  loadedSources: LoadedSources;
  visibleLayers: VisibleLayers;
  userLocation: Coordinates;
  setLoadedSource: (
    id: SourceId,
    isLoaded: boolean
  ) => void;
  setVisibleLayer: (
    id: LayerId,
    isVisible: boolean
  ) => void;
  setUserLocation: (location: Coordinates) => void;
};

const DEFAULT_LOADED_SOURCES = Object.fromEntries(
  SOURCES.map(source => [source.id, false])
) as LoadedSources;

const DEFAULT_VISIBLE_LAYERS = Object.fromEntries(
  LAYERS.map(layer => [layer.id, layer.isVisibleByDefault])
) as VisibleLayers;

/**
 * @description Zustand store for managing map state, e.g. visible layers
 * and the user's geolocated position
 */
const useMapStore = create<MapStore>(set => ({
  loadedSources: DEFAULT_LOADED_SOURCES,
  visibleLayers: DEFAULT_VISIBLE_LAYERS,
  userLocation: MAP_CENTER,
  setLoadedSource: (id, isLoaded) =>
    set(state => ({
      loadedSources: {
        ...state.loadedSources,
        [id]: isLoaded,
      },
    })),
  setVisibleLayer: (id, isVisible) =>
    set(state => ({
      visibleLayers: {
        ...state.visibleLayers,
        [id]: isVisible,
      },
    })),
  setUserLocation: location =>
    set({ userLocation: location }),
}));

export default useMapStore;
