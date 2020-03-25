import React, { FunctionComponent } from 'react';
import { navigate } from 'gatsby';

import { Button, Modal, Heading, Row, Column } from '../../../components';

type UnsavedChangesModalProps = {
  toggleModal: Function;
  modalIsOpen: boolean;
  captureConsumerData: Function;
};

const UnsavedChangesModal: FunctionComponent<UnsavedChangesModalProps> = (props) => {
  const clearDataAndNavigate = () => {
    props.captureConsumerData({});
    navigate('/consumer');
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
