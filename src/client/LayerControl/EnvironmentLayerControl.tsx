import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Switch from '@radix-ui/react-switch';
import classNames from 'classnames';
import { useState } from 'react';

import {
  DEFAULT_VISIBLE_ENVIRONMENT_LAYER,
  ENVIRONMENT_LAYERS,
  type EnvironmentLayerId,
} from '@/constants/ENVIRONMENT_LAYERS';
import useMapStore from '@/stores/useMapStore';

import './EnvironmentLayerControl.scss';

const EnvironmentLayerControl = () => {
  const loadedSources = useMapStore(s => s.loadedSources);

  const setVisibleLayer = useMapStore(
    s => s.setVisibleLayer
  );

  const [isControlEnabled, setIsControlEnabled] =
    useState<boolean>(false);

  const [selectedLayer, setSelectedLayer] =
    useState<EnvironmentLayerId>(
      DEFAULT_VISIBLE_ENVIRONMENT_LAYER
    );

  const handleCheckedChange = () => {
    ENVIRONMENT_LAYERS.forEach(layer =>
      setVisibleLayer(
        layer.id,
        isControlEnabled ? false : (
          layer.id === selectedLayer
        )
      )
    );
    setIsControlEnabled(prev => !prev);
  };

  const handleValueChange = (value: EnvironmentLayerId) => {
    setSelectedLayer(value);
    ENVIRONMENT_LAYERS.forEach(layer =>
      setVisibleLayer(layer.id, layer.id === value)
    );
  };

  return (
    <div className='EnvironmentLayerControl'>
      <div className='header'>
        <h2>Environmental Analysis</h2>
        <Switch.Root
          checked={isControlEnabled}
          onCheckedChange={handleCheckedChange}
          className='switch'
        >
          <Switch.Thumb className='thumb' />
        </Switch.Root>
      </div>
      <RadioGroup.Root
        className='radio-group'
        disabled={!isControlEnabled}
        value={selectedLayer}
        onValueChange={handleValueChange}
      >
        {ENVIRONMENT_LAYERS.map(
          ({ icon: Icon, id, label, sourceId }, idx) => (
            <div
              key={id}
              className={classNames('item', {
                loaded: [sourceId]
                  .flat()
                  .every(id => loadedSources[id]),
              })}
            >
              <label
                className='radio-label left'
                htmlFor={`r_${idx}`}
              >
                <Icon className='icon' />
                <span>{label}</span>
              </label>
              <RadioGroup.Item
                className='radio-btn'
                value={id}
                id={`r_${idx}`}
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
