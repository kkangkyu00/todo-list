import React, { ReactNode } from 'react';
import { Dialog, DialogProps, DialogActions, Button } from '@mui/material';
import styled from 'styled-components';

interface ModalProps extends DialogProps {
  footer?: ReactNode | ReactNode[];
  onClose?: () => void;
  onSubmit?: () => void;
}

const StyledModalContainer = styled(Dialog)`
  .MuiDialog-paper {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 32px 24px;
  }
`;

const DialogContent = styled.div`
  overflow-y: scroll;
`;

const StyledDialogActions = styled(DialogActions)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 16px);
  background: #fff;
`;

const Modal = ({ children, footer, open, onClose, onSubmit, ...props }: ModalProps) => {
  return (
    <StyledModalContainer open={open} onClose={onClose} {...props}>
      <>
        <DialogContent>{children}</DialogContent>
        {footer ? (
          <StyledDialogActions>{footer}</StyledDialogActions>
        ) : (
          <StyledDialogActions>
            <Button onClick={() => onClose?.()}>취소</Button>
            <Button onClick={() => onSubmit?.()}>확인</Button>
          </StyledDialogActions>
        )}
      </>
    </StyledModalContainer>
  );
};

export default Modal;
