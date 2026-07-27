import IconSvg from '@/app/icon.svg';

import './SiteLogo.scss';

const SiteLogo = () => {
  return (
    <div className='SiteLogo'>
      <IconSvg className='logo' />
      <hgroup>
        <h1>
          UrbanCanopy <span className='city'>LA</span>
        </h1>
        <p className='description'>Urban trekking. Cooler journeys.</p>
      </hgroup>
    </div>
  );
};

export default SiteLogo;
