import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';

import { Button, Modal, Heading, Row, Column } from '../../../components';
import { captureConsumerData } from '../../../redux/ducks/consumer';

type UnsavedChangesModalProps = {
  toggleModal: () => void;
  modalIsOpen: boolean;
};

const UnsavedChangesModal: FunctionComponent<UnsavedChangesModalProps> = (props) => {
  const dispatch = useDispatch();
  const clearDataAndNavigate = () => {
    dispatch(captureConsumerData({}));
    navigate('/consumer/start');
  };

  return (
    <Modal isOpen={props.modalIsOpen} toggleModal={props.toggleModal}>
      <Heading styledAs="title">Unsaved Changes</Heading>
      <p>Don&apos;t quit now, you are almost done.</p>
      <p>Are you sure you want to cancel your registration?</p>
      <Row>
        <Column xs={6}>
          <Button type="button" onClick={() => props.toggleModal()} color="primaryOutline" block>
            No
          </Button>
        </Column>
        <Column xs={6}>
          <Button type="button" onClick={() => clearDataAndNavigate()} block>
            Yes
          </Button>
        </Column>
      </Row>
    </Modal>
  );
};

export default UnsavedChangesModal;
