import type { FC } from 'react';
import { Navbar } from 'flowbite-react';
import { HiMenu, HiX } from 'react-icons/hi';
import isSmallScreen from '../../helper/is-small-screen';
import ConnectWalletButton from './ConnectWalletButton';
import UserDropdown from './UserDropdown';
import NotificationDropdown from './NotificationDropdown';
import AppDrawerDropdown from './AppDrawerDropdown';
import { isEmpty } from 'lodash';
import { useAccount, useNetwork } from 'wagmi';
import { useDispatch, useSelector } from '../../redux';
import { toggleIsOpenSidebar } from '../../redux/layout';
import { useNavigate } from 'react-router-dom';

const AppNavbar: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpenSidebar } = useSelector(state => state.layout);
  const { user } = useSelector(state => state.account);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const showNavbarItem = !isEmpty(user) && address && !chain?.unsupported;

  const toggleSidebar = () => {
    dispatch(toggleIsOpenSidebar(!isOpenSidebar));
  };

  return (
    <Navbar fluid className="z-50">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between pl-1">
          <div className="flex items-center">
            <Navbar.Brand onClick={() => navigate('/')}>
              <img alt="" src="/svg/logo.svg" className="mr-3 h-6 sm:h-8" />
            </Navbar.Brand>
            {showNavbarItem && (
              <>
                <button
                  onClick={() => toggleSidebar()}
                  className="mr-3 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:inline">
                  <span className="sr-only">Toggle sidebar</span>
                  {isOpenSidebar && isSmallScreen() ? (
                    <HiX className="h-6 w-6" />
                  ) : (
                    <HiMenu className="h-6 w-6" />
                  )}
                </button>

                <form className="hidden md:block ml-2">
                  <div className="relative w-96">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <img
                        alt=""
                        src="/svg/search-outline.svg"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="sidebar-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="flex items-center lg:gap-3">
            {showNavbarItem && (
              <div className="flex items-center">
                <NotificationDropdown />
                <AppDrawerDropdown />
                <UserDropdown />
              </div>
            )}
            <div className="hidden lg:block">
              <ConnectWalletButton />
              {/* {address && <LensLoginButton address={address} />} */}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
