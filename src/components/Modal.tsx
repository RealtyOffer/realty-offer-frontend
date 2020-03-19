import React, { FunctionComponent } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

import { baseBorderStyle, z1Shadow } from '../styles/mixins';
import { borderRadius, halfSpacer, screenSizes, doubleSpacer } from '../styles/size';

type ModalProps = {
  isOpen: boolean;
  toggleModal: Function;
};

const CloseIcon = styled.span`
  position: absolute;
  top: ${halfSpacer};
  right: ${halfSpacer};
  cursor: pointer;
`;

const Modal: FunctionComponent<ModalProps> = props => (
  <ReactModal
    isOpen={props.isOpen}
    onRequestClose={props.toggleModal as any}
    shouldCloseOnOverlayClick
    shouldCloseOnEsc
    style={{
      content: {
        border: baseBorderStyle,
        boxShadow: z1Shadow,
        borderRadius,
        bottom: 'initial',
        maxWidth: screenSizes.small,
        margin: '0 auto',
        top: doubleSpacer,
        right: doubleSpacer,
        left: doubleSpacer,
      },
      overlay: {
        backgroundColor: 'rgba(0,0,0,.75)',
      },
    }}
  >
    <CloseIcon onClick={props.toggleModal as any}>
      <FaTimes />
    </CloseIcon>
    {props.children}
  </ReactModal>
);

export default Modal;
