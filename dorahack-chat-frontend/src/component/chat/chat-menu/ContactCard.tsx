import { useParams, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import trimAddress from '../../../helper/trim-address';
import { Contact } from '../../../type/contact';
import PlaceholderAvatar from '../../@share/PlaceholderAvatar';
import { toggleIsShowAddContact } from '../../../redux/layout';
import { useDispatch, useSelector } from '../../../redux';

type Props = {
  contact: Contact;
};

export default function ContactCard({ contact }: Props) {
  const navigate = useNavigate();
  const { id: contactIdParam } = useParams();
  const dispatch = useDispatch();
  const { activeChatMenuTab } = useSelector(state => state.layout);

  // const onlineIndicator = () => {
  //   return contact?.online ? (
  //     <span className="top-0 -right-1 absolute w-[12px] h-[12px] bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
  //   ) : (
  //     <></>
  //   );
  // };

  const onClickCard = (contact: Contact) => {
    dispatch(toggleIsShowAddContact(false));
    navigate(`/${activeChatMenuTab}/${contact.id}`);
  };

  return (
    <div
      onClick={() => onClickCard(contact)}
      className={classnames(
        'flex pt-2 pb-1 px-3 items-center overflow-hidden relative cursor-pointer hover:bg-gray-100 rounded',
        {
          'bg-gray-100': contactIdParam === contact.id,
        }
      )}>
      <div className="relative flex justify-center w-[36px] h-[36px]">
        <PlaceholderAvatar publicAddress={contact.address} />
        {/* {onlineIndicator()} */}
      </div>

      <div className="font-normal w-full pl-2 text-sm">
        {trimAddress(contact.address)}
      </div>
    </div>
  );
}
