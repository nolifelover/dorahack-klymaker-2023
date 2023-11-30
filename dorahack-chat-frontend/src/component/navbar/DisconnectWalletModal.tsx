import { Button, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import { useDisconnect } from 'wagmi';
import { useDispatch } from '../../redux';
import { disconnectWallet } from '../../redux/account';

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function DisconnectWalletModal({
  openModal,
  setOpenModal,
}: Props) {
  const dispatch = useDispatch();
  const { disconnect } = useDisconnect();

  const onDisconnect = () => {
    disconnect();
    dispatch(disconnectWallet());
    setOpenModal(false);
  };

  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      size={'sm'}>
      <Modal.Header>Disconnect wallet</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Do you want to disconnect your wallet ?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={() => onDisconnect()}>
          Disconnect
        </Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Not now
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
