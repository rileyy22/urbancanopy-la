import * as RadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';

import {
  ENVIRONMENT_LAYERS,
  type EnvironmentLayerId,
} from '@/constants/ENVIRONMENT_LAYERS';
import useMapStore from '@/stores/useMapStore';

import './EnvironmentLayerControl.scss';

const NONE = {
  id: 'none',
  label: 'None',
  icon: undefined,
  sourceId: [], // has no source, so always counts as loaded
} as const;

type EnvironmentLayerOption =
  EnvironmentLayerId | typeof NONE.id;

const EnvironmentLayerControl = () => {
  const loadedSources = useMapStore(s => s.loadedSources);
  const visibleLayers = useMapStore(s => s.visibleLayers);

  const setVisibleLayer = useMapStore(
    s => s.setVisibleLayer
  );

  const selectedLayer: EnvironmentLayerOption =
    ENVIRONMENT_LAYERS.find(
      layer => visibleLayers[layer.id]
    )?.id ?? NONE.id;

  const handleValueChange = (
    value: EnvironmentLayerOption
  ) => {
    ENVIRONMENT_LAYERS.forEach(layer =>
      setVisibleLayer(layer.id, layer.id === value)
    );
  };

  return (
    <div className='EnvironmentLayerControl'>
      <RadioGroup.Root
        aria-label='Environmental Analysis'
        value={selectedLayer}
        onValueChange={handleValueChange}
      >
        {[NONE, ...ENVIRONMENT_LAYERS].map(
          ({ icon: Icon, id, label, sourceId }) => (
            <div
              key={id}
              className={classNames('item', id, {
                loaded: [sourceId]
                  .flat()
                  .every(id => loadedSources[id]),
              })}
            >
              <label className='left' htmlFor={`r_${id}`}>
                {Icon && <Icon className='icon' />}
                <span>{label}</span>
              </label>
              <RadioGroup.Item
                className='radio-btn'
                value={id}
                id={`r_${id}`}
              >
                <RadioGroup.Indicator className='indicator' />
              </RadioGroup.Item>
            </div>
          )
        )}
      </RadioGroup.Root>
    </div>
  );
};

export default EnvironmentLayerControl;
