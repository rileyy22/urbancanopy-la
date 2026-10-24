import EnvironmentLayerControl from '@/client/LayerControl/EnvironmentLayerControl';
import POILayerControl from '@/client/LayerControl/POILayerControl';

import './LayerControl.scss';

const LayerControl = () => {
  return (
    <div className='LayerControl'>
      <POILayerControl />
      <EnvironmentLayerControl />
    </div>
  );
};

export default LayerControl;
