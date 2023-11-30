import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import FullScreenLoader from '../component/@share/FullScreenLoader';
import { useSelector } from '../redux';

export default function AppLayout() {
  const { isShowLoader } = useSelector(state => state.layout);

  return (
    <>
      <Navbar />
      <div className="flex items-start pt-16 h-screen">
        <Outlet />
      </div>
      {isShowLoader && <FullScreenLoader />}
    </>
  );
}
