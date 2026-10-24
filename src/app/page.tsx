import Map from '@/client/Map';
import SidePanel from '@/client/SidePanel';

import './page.scss';

const Home = () => {
  return (
    <div className='Home'>
      <SidePanel />
      <main className='map-container'>
        <Map />
      </main>
    </div>
  );
};

export default Home;
