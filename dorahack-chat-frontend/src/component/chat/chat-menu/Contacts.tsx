import EmptyContact from './EmptyContact';
import ContactCard from './ContactCard';
import ContactsSkeleton from '../../@skeleton/ContactsSkeleton';
import { Contact } from '../../../type/contact';
import { useDispatch } from '../../../redux';
import { toggleIsShowAddContact } from '../../../redux/layout';

type Props = {
  contacts: Contact[];
  loading: boolean;
};

export default function Contacts({ contacts, loading }: Props) {
  const dispatch = useDispatch();

  if (loading) {
    return <ContactsSkeleton />;
  }

  return (
    <>
      <div className="px-2">
        <div className="flex items-center justify-between text-gray-500 text-base font-normal pb-1 px-1">
          <div>Contacts</div>
          <div
            className="cursor-pointer hover:text-gray-600"
            onClick={() => dispatch(toggleIsShowAddContact(true))}>
            +
          </div>
        </div>

        {!contacts.length && <EmptyContact />}
        {contacts.map(cont => (
          <ContactCard key={cont.id} contact={cont} />
        ))}
      </div>
    </>
  );
}
