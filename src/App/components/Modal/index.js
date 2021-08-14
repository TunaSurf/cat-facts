import React from 'react';
import ReactModal from 'react-modal';

import { useModal } from '../../../shared/context/modalContext';
import * as MODAL from '../../../shared/constants/modal';
import VerifyModal from './Verify';
import SuccessModal from './Success';

ReactModal.setAppElement('#root');

const CUSTOM_STYLES = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const MODAL_COMPONENTS = {
  [MODAL.VERIFY]: VerifyModal,
  [MODAL.SUCCESS]: SuccessModal,
  /* other modals */
};

export default function Modal() {
  const { modalType, modalProps, dispatch } = useModal();

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  function closeModal() {
    dispatch({ type: MODAL.HIDE });
  }

  return (
    <ReactModal
      isOpen={!!modalType}
      onRequestClose={closeModal}
      style={CUSTOM_STYLES}
      contentLabel="Example Modal"
    >
      <button onClick={closeModal} type="button">
        Close
      </button>
      <SpecificModal {...modalProps} />
    </ReactModal>
  );
}
