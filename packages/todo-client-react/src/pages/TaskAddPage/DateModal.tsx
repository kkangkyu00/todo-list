import React, { useState } from 'react';
import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { Switch, InputLabel } from '@mui/material';
import { AccessTimeFilled as AccessTimeFilledIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { Modal, Calendar } from '@components';

import TimeModal from './TimeModal';
import { ModalWrapper, StyledButtonGroup, ButtonItem, InputWrapper } from './style';

interface DateModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const DateModal: React.FC<DateModalProps> = ({ open = false, onClose, onSubmit }: DateModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<Dayjs>(dayjs().add(30, 'minute'));
  const [timeOpen, setTimeOpen] = useState<boolean>(false);

  const handleOpenTimeModal = () => {
    console.log('####### open time');
    setTimeOpen(true);
  };

  const handleSubmit = () => {
    setTime(dayjs());
    setTimeOpen(false);
    onSubmit?.();
  };

  const handleDateChange = (date: Dayjs | string) => {
    console.log(dayjs(date).format('YYYY-MM-DD'), '#################');
    setSelectedDate(dayjs(date));
  };

  const handleDateToggleClike = (event: React.MouseEvent<HTMLElement>, date: ManipulateType | 'today') => {
    if (date === 'today') {
      setSelectedDate(() => dayjs());
    } else {
      setSelectedDate(() => dayjs().add(1, date));
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} onSubmit={handleSubmit}>
        <ModalWrapper>
          <Calendar date={selectedDate} onChange={handleDateChange} />
          <StyledButtonGroup exclusive onChange={handleDateToggleClike}>
            <ButtonItem value="today">오늘</ButtonItem>
            <ButtonItem value="day">내일</ButtonItem>
            <ButtonItem value="week">다음주</ButtonItem>
            <ButtonItem value="month">다음달</ButtonItem>
          </StyledButtonGroup>

          <div>
            <InputWrapper onClick={handleOpenTimeModal}>
              <InputLabel>
                <AccessTimeFilledIcon />
                <span>시간</span>
              </InputLabel>
              <div className="time">{dayjs(time).format('A h:mm')}</div>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>
                <NotificationsIcon />
                <span>알림</span>
              </InputLabel>
              <Switch />
            </InputWrapper>
          </div>
        </ModalWrapper>
      </Modal>
      <TimeModal open={timeOpen} onClose={() => setTimeOpen(false)} onSubmit={handleSubmit} />
    </>
  );
};

export default DateModal;
