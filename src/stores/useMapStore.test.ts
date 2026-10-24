import { beforeEach, describe, expect, it } from 'vitest';

import { LAYERS, type LayerId } from '@/constants/LAYERS';
import { MAP_CENTER } from '@/constants/MAP';
import useMapStore from '@/stores/useMapStore';

describe('useMapStore', () => {
  beforeEach(() => {
    useMapStore.setState({
      visibleLayers: Object.fromEntries(
        LAYERS.map(layer => [
          layer.id,
          layer.isVisibleByDefault,
        ])
      ) as Record<LayerId, boolean>,
      userLocation: MAP_CENTER,
    });
  });

  it('initializes with layer default visibility', () => {
    expect(useMapStore.getState().visibleLayers).toEqual(
      Object.fromEntries(
        LAYERS.map(layer => [
          layer.id,
          layer.isVisibleByDefault,
        ])
      )
    );
  });

  it('correctly sets a layer visibility', () => {
    const store = useMapStore.getState();
    const initial = store.visibleLayers.parks;
    store.setVisibleLayer('parks', !initial);

    expect(useMapStore.getState().visibleLayers.parks).toBe(
      !initial
    );
  });

  it('only updates the targeted layer', () => {
    const before = useMapStore.getState().visibleLayers;
    useMapStore.getState().setVisibleLayer('parks', false);
    const after = useMapStore.getState().visibleLayers;

    (
      Object.entries(before) as [LayerId, boolean][]
    ).forEach(([layerId, isVisible]) => {
      if (layerId !== 'parks') {
        expect(after[layerId]).toBe(isVisible);
      }
    });
  });

  it('creates a new visibleLayers object when updating', () => {
    const before = useMapStore.getState().visibleLayers;
    useMapStore.getState().setVisibleLayer('parks', false);
    const after = useMapStore.getState().visibleLayers;
    expect(after).not.toBe(before);
  });

  it('initializes the user location to the map center', () => {
    expect(useMapStore.getState().userLocation).toEqual(
      MAP_CENTER
    );
  });

  it('correctly sets the user location', () => {
    const location = { lng: -118.4, lat: 34.1 };
    useMapStore.getState().setUserLocation(location);

    expect(useMapStore.getState().userLocation).toEqual(
      location
    );
  });
});
