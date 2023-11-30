import { ChangeEvent, useState } from 'react';
import { Label, Radio, TextInput, Textarea, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { errorFormat } from '../../../../helper/error-format';
import { requestConversationApi } from '../../../../rest-api/conversation';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import sleep from '../../../../helper/sleep';
import { CreateContactBody } from '../../../../type/contact';
import { createContactApi } from '../../../../rest-api/contact';
import { ChatMenuTab } from '../../../../type/conversation';
import { useDispatch } from '../../../../redux';
import { toggleIsShowAddContact } from '../../../../redux/layout';

const validationSchema = yup.object({
  address: yup.string().required('Address is required'),
  reason: yup.mixed().required('Reason is required'),
  description: yup.mixed().required('Description is required'),
});

export default function AddContactForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik<CreateContactBody>({
    initialValues: {
      address: '',
      reason: '',
      description: '',
    },
    validationSchema,
    onSubmit: () => {},
  });

  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('reason', e.target.value);
  };

  const handleSendChatRequest = async () => {
    try {
      formik.handleSubmit();
      if (!isEmpty(formik.errors)) {
        return null;
      }
      setSubmitting(true);
      await createContactApi(formik.values);
      const convesation = await requestConversationApi([formik.values.address]);
      if (!isEmpty(convesation)) {
        await sleep(500);
        dispatch(toggleIsShowAddContact(false));
        navigate(`/${ChatMenuTab.Chats}/${convesation.id}`);
      }
    } catch (error) {
      toast.error(errorFormat(error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddContact = async () => {
    try {
      formik.handleSubmit();
      if (!isEmpty(formik.errors)) {
        return null;
      }
      const contact = await createContactApi(formik.values);
      if (!isEmpty(contact)) {
        await sleep(500);
        dispatch(toggleIsShowAddContact(false));
        navigate(`/${ChatMenuTab.Contacts}/${contact.id}`);
      }
      setSubmitting(true);
    } catch (error) {
      toast.error(errorFormat(error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="m-auto">
        <div className="flex flex-col justify-center items-center p-3">
          <div className="flex justify-center items-center pb-7 pt-3">
            <img src="/svg/search-user.svg" alt="" />
          </div>
          <h2 className="text-center text-4xl font-semibold text-muted-light mb-2">
            Add contact from wallet address
          </h2>
          <span className="text-center font-normal text-muted-light mb-4">
            You can add contact with his or her wallet address, and he or she
            must accept before starting conversation
          </span>

          <fieldset
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            id="radio">
            <div className="flex items-start gap-2">
              <Radio
                id="business-purpose"
                name="add-contact"
                value="BusinessPurpose"
                className="mt-1 cursor-pointer"
                onChange={handleReasonChange}
                onBlur={formik.handleBlur}
              />
              <div className="flex items-start flex-col">
                <Label
                  htmlFor="business-purpose"
                  className="leading-none text-sm font-medium text-gray-900">
                  Business purpose
                </Label>
                <Label
                  htmlFor="business-purpose"
                  className="text-xs font-normal text-gray-500">
                  Contact for business
                </Label>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Radio
                id="making-friend"
                name="add-contact"
                value="MakingFriend"
                className="mt-1 cursor-pointer"
                onChange={handleReasonChange}
                onBlur={formik.handleBlur}
              />
              <div className="flex items-start flex-col">
                <Label
                  htmlFor="making-friend"
                  className="leading-none text-sm font-medium text-gray-900">
                  Making friend
                </Label>
                <Label
                  htmlFor="making-friend"
                  className="text-xs font-normal text-gray-500">
                  Want to be a friend with
                </Label>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Radio
                id="ask-for-help"
                name="add-contact"
                value="AskForHelp"
                className="mt-1 cursor-pointer"
                onChange={handleReasonChange}
                onBlur={formik.handleBlur}
              />
              <div className="flex items-start flex-col">
                <Label
                  htmlFor="ask-for-help"
                  className="leading-none text-sm font-medium text-gray-900">
                  Ask for help
                </Label>
                <Label
                  htmlFor="ask-for-help"
                  className="text-xs font-normal text-gray-500">
                  You need his/ her help
                </Label>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Radio
                id="other"
                name="add-contact"
                value="Other"
                className="mt-1 cursor-pointer"
                onChange={handleReasonChange}
                onBlur={formik.handleBlur}
              />
              <div className="flex items-start flex-col">
                <Label
                  htmlFor="other"
                  className="leading-none text-sm font-medium text-gray-900">
                  Other
                </Label>
                <Label
                  htmlFor="other"
                  className="text-xs font-normal text-gray-500">
                  The other purpose
                </Label>
              </div>
            </div>
          </fieldset>

          {formik.errors.reason && (
            <div className="text-red-500 text-xs text-right w-full mt-1">
              {formik.errors.reason}
            </div>
          )}

          <div className="p-3 mt-3 w-full" style={{ maxWidth: '496px' }}>
            <TextInput
              className="w-full bg-gray-50 border-gray-300"
              placeholder="Enter wallet address "
              sizing="md"
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.address && (
              <div className="text-red-500 text-xs text-right w-full mt-1">
                {formik.errors.address}
              </div>
            )}
          </div>

          <div
            className="p-3 w-full relative"
            style={{ maxWidth: '496px', position: 'relative' }}>
            {!formik.values.description && (
              <div style={{ position: 'absolute', top: '24px', left: '22px' }}>
                <BiEditAlt className="text-gray-500" />
              </div>
            )}
            <Textarea
              placeholder="      Short note to receiver"
              style={{ height: '218px', padding: '10px' }}
              className="resize-none bg-gray-50 border border-gray-300"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && (
              <div className="text-red-500 text-xs text-right w-full mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>
          <div className="p-3 w-full justify-center flex gap-4 flex-wrap">
            <Button
              color="primary"
              outline
              disabled={submitting}
              onClick={handleAddContact}>
              <span className="text-primary-700 group-enabled:group-hover:text-white">
                Just add to my contact
              </span>
            </Button>
            <Button
              color="primary"
              disabled={submitting}
              onClick={handleSendChatRequest}>
              <PiPaperPlaneTiltBold className="me-2" />
              Send a chat request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
