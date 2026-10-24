import * as Switch from '@radix-ui/react-switch';
import classNames from 'classnames';

import { POI_LAYERS } from '@/constants/POI_LAYERS';
import useMapStore from '@/stores/useMapStore';

import './POILayerControl.scss';

const POILayerControl = () => {
  const loadedSources = useMapStore(s => s.loadedSources);
  const visibleLayers = useMapStore(s => s.visibleLayers);

  const setVisibleLayer = useMapStore(
    s => s.setVisibleLayer
  );

  return (
    <div className='POILayerControl'>
      <h2>Public Spaces & Amenities</h2>
      <div className='LayerControlList'>
        {POI_LAYERS.map(
          ({ icon: Icon, id, label, sourceId }) => (
            <div
              key={id}
              className={classNames('item', {
                loaded: [sourceId]
                  .flat()
                  .every(id => loadedSources[id]),
              })}
            >
              <label className='left' htmlFor={`s_${id}`}>
                <Icon className='icon' />
                <span>{label}</span>
              </label>
              <Switch.Root
                id={`s_${id}`}
                className='switch'
                checked={visibleLayers[id]}
                onCheckedChange={() =>
                  setVisibleLayer(id, !visibleLayers[id])
                }
              >
                <Switch.Thumb className='thumb' />
              </Switch.Root>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default POILayerControl;
