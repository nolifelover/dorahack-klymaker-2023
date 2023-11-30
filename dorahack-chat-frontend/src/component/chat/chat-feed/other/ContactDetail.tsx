import CopyIcon from '../../../@icon/CopyIcon';
import { Button } from 'flowbite-react';
import { isEmpty } from 'lodash';
import PlaceholderAvatar from '../../../@share/PlaceholderAvatar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Contact } from '../../../../type/contact';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { errorFormat } from '../../../../helper/error-format';
import { requestConversationApi } from '../../../../rest-api/conversation';
import { useNavigate } from 'react-router-dom';
import { ChatMenuTab } from '../../../../type/conversation';
import sleep from '../../../../helper/sleep';

type Props = {
  selectedContact: Contact;
};

export default function ContactDetail({ selectedContact }: Props) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  const startConversation = async () => {
    try {
      setChecking(true);
      const convesation = await requestConversationApi([
        selectedContact.address,
      ]);
      if (!isEmpty(convesation)) {
        await sleep(500);
        navigate(`/${ChatMenuTab.Chats}/${convesation.id}`);
      }
    } catch (error) {
      toast.error(errorFormat(error).message);
    } finally {
      setChecking(false);
    }

    if (isEmpty(selectedContact)) {
      return;
    }
  };

  if (isEmpty(selectedContact)) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <div className="items-center flex flex-col">
          <div className="items-start self-stretch flex flex-col">
            <div className="items-center self-stretch flex flex-col px-5">
              <PlaceholderAvatar
                publicAddress={selectedContact.address}
                size={128}
              />
              <div className="text-black text-2xl font-semibold leading-[150%] mt-1">
                Roberta Casas
              </div>
              <div className="items-start flex gap-2 mt-1">
                <div className="text-black text-base leading-[150%] max-w-[388px] self-stretch grow shrink-0 basis-auto mr-1">
                  {selectedContact.address}
                </div>
                <CopyToClipboard text={selectedContact.address}>
                  <button>
                    <CopyIcon className={'w-[18px] cursor-pointer'} />
                  </button>
                </CopyToClipboard>
              </div>
              {/* <div className="text-gray-500 text-sm leading-[150%] mt-1">
                Last seen {lastSeen}
              </div> */}
            </div>
            {/* <div className="justify-center items-start self-center flex  max-w-full gap-2 mt-4 px-5">
              <ToggleSwitch
                checked={notificationEnabled}
                onChange={checked => changeNotificationEnabled(checked)}
              />
              <div className="text-gray-900 text-sm leading-[150%]">
                Mute notifications
              </div>
            </div> */}
          </div>
          {/* <div className="  items-start   flex gap-5 mt-5 px-5">
            <TextInput
              type={'text'}
              placeholder={'Alias name'}
              className={'w-[339px]'}
            />
            <Button
              color="primary"
              className={
                ' text-white text-sm font-medium leading-[150%] self-stretch justify-center items-center bg-blue-700 w-[55px] max-w-full px-3 py-2 rounded-lg'
              }
              size={'xs'}
              onClick={() => saveAliasName()}>
              Save
            </Button>
          </div> */}
          <div className="justify-center items-start self-center flex  max-w-full gap-4 mt-5 px-5">
            <Button
              color="primary"
              className={
                ' text-white text-sm font-medium   self-stretch justify-center items-center bg-blue-700   max-w-full  rounded-lg'
              }
              size={'sm'}
              disabled={checking}
              onClick={() => startConversation()}>
              Start a conversation
            </Button>

            {/* {blocked ? (
              <Button
                color="failure"
                outline
                className={
                  ' text-sm font-medium  self-stretch justify-center items-center    max-w-full  rounded-lg'
                }
                size={'sm'}
                onClick={() => setBlockUser(false)}>
                Unblock this user
              </Button>
            ) : (
              <Button
                color="failure"
                className={
                  ' text-white text-sm font-medium   self-stretch justify-center items-center    max-w-full   rounded-lg'
                }
                size={'sm'}
                onClick={() => setBlockUser(true)}>
                Block this user
              </Button>
            )}

            <Button
              color="failure"
              className={
                ' text-white text-sm font-medium leading-[150%] self-stretch justify-center items-center bg-red-700    max-w-full  rounded-lg'
              }
              size={'sm'}
              onClick={() => reportUser()}>
              Report this user
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
