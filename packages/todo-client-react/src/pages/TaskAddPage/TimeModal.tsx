import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Modal, TimePicker } from '@components';
import { ModalWrapper, StyledButtonGroup, ButtonItem, TimePickerWrapper } from './style';

interface TimeModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (date: Dayjs) => void;
}

const TimeModal = ({ open = false, onClose, onSubmit }: TimeModalProps) => {
  const [selectedTime, setSelectedTime] = useState<Dayjs>(dayjs());

  const handleSubmit = () => {
    onSubmit?.(selectedTime);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTimeChange = (time: Dayjs) => {
    setSelectedTime(time);
  };

  return (
    <Modal hideBackdrop open={open} onClose={onClose} onSubmit={handleSubmit}>
      <ModalWrapper>
        <TimePickerWrapper>
          <TimePicker />
        </TimePickerWrapper>
        <div>
          <StyledButtonGroup exclusive>
            <ButtonItem value={8}>08:00 오전</ButtonItem>
            <ButtonItem value={12}>12:00 오후</ButtonItem>
            <ButtonItem value={13}>01:00 오후</ButtonItem>
            <ButtonItem value={15}>03:00 오후</ButtonItem>
            <ButtonItem value={18}>06:00 오후</ButtonItem>
            <ButtonItem value={21}>09:00 오후</ButtonItem>
            <ButtonItem value={23}>11:00 오후</ButtonItem>
          </StyledButtonGroup>
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default TimeModal;
