import { Button, Modal } from 'flowbite-react';
import { Dispatch, SetStateAction } from 'react';
import { PiWarningBold } from 'react-icons/pi';
type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function DisputeModal({ openModal, setOpenModal }: Props) {
  const confirmDispute = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      size={'md'}>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <div className="flex justify-center w-full text-2xl mb-4 mt-[-26px]">
          <PiWarningBold className="text-[#f05252] " />
        </div>
        <div className="overflow-hidden flex flex-col justify-center gap-4 w-full  items-center px-6">
          <div className="self-stretch flex flex-col items-start">
            <div
              id="NextFridayShouldB"
              className="text-center font-bold leading-[24px] text-[#f05252]">
              Are you sure to send a dispute request ?
            </div>
            <div
              id="NextFridayShouldB1"
              className="text-center text-xs leading-[18px] text-[#9ca3af] w-full">
              If you are not sure about the dispute is, please read our document
              before sending a dispute request
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-center gap-6 w-full mt-[-20px]">
          <Button color="failure" onClick={() => confirmDispute()}>
            Yes, I'm sure
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            No, cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
