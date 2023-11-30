import classnames from 'classnames';
import { ChatMenuTab } from '../../../type/conversation';
import ChatsIcon from '../../@icon/ChatsIcon';
import ContactsIcon from '../../@icon/ContactsIcon';
// import DisputesIcon from '../@icon/DisputesIcon';
import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
  setActiveChatMenuTab,
  toggleIsShowAddContact,
} from '../../../redux/layout';
import { useDispatch, useSelector } from '../../../redux';

export default function MenuTabs() {
  const dispatch = useDispatch();
  const { activeChatMenuTab } = useSelector(state => state.layout);
  const navigate = useNavigate();

  const menus = Object.values(ChatMenuTab);

  const displayIcon = (menu: ChatMenuTab) => {
    switch (menu) {
      case ChatMenuTab.Chats: {
        return <ChatsIcon />;
      }
      // case ChatMenuTab.Disputes: {
      //   return <DisputesIcon />;
      // }
      case ChatMenuTab.Contacts: {
        return <ContactsIcon />;
      }
    }
  };

  const onClickTab = (menu: ChatMenuTab) => {
    dispatch(toggleIsShowAddContact(false));
    dispatch(setActiveChatMenuTab(menu));
    navigate(`/${menu}`);
  };

  return (
    <nav className="flex flex-row justify-around border-b-[1px] px-2">
      {menus.map(m => (
        <div
          key={m}
          onClick={() => onClickTab(m)}
          className={classnames(
            'flex justify-center items-center',
            'w-1/3',
            'text-sm font-medium',
            'cursor-pointer',
            'text-gray-400 hover:text-gray-600',
            'focus:outline-none',
            'py-3',
            {
              'text-gray-600 border-b-[1px] border-b-primary-400':
                activeChatMenuTab === m,
            }
          )}>
          {displayIcon(m)}
          <span className="ml-1">{capitalize(m)}</span>
        </div>
      ))}
    </nav>
  );
}
