import React from 'react';
import { motion, Reorder, useAnimate, useDragControls, useMotionValue } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
// import { Divider } from '@mui/material';
import styled from 'styled-components';

const TaskCardWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const SwipeContainer = styled(motion.div)`
  z-index: 10;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 62px;
  background: #fff;
`;

const SwipeContent = styled(Reorder.Item)`
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 8px 8px 8px 12px;
  border-top: 1px solid #ededed;
  border-radius: 4px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.12);

  li {
    height: 100%;
  }

  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 4px;
    height: 100%;
    background: #5267fb;
  }
`;

const Meta = styled.div`
  .card-meta-title {
    padding-bottom: 4px;
    color: #3c3d48;
    font-size: 14px;
    font-weight: 700;
  }
  .card-meta-desc {
    padding-bottom: 6px;
    color: #3c3d48;
    font-size: 12px;
  }
  .card-meta-date {
    border-top: 1px solid #ecedf0;
    padding-top: 6px;
    color: #a0a0b6;
    font-size: 12px;
    font-weight: 700;
  }
`;

const DelBox = styled.div`
  z-index: 5;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  text-align: end;
  background: #ededed;
  //border: 1px solid #ededed;
  border: none;
  border-radius: 4px;
`;

const DelButton = styled(motion.button)`
  width: 80px;
  //height: 50%;
  height: 100%;
  border: none;
`;

interface TaskCardProps {
  idx?: number;
  name?: string;
  desc?: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}

const TaskCard = ({ idx, name, desc, startDate, endDate }: TaskCardProps) => {
  const [animateRef, animate] = useAnimate();
  const reorderDragControls = useDragControls();
  const motionX = useMotionValue(0);

  const handleTaskClick = () => {
    console.log('##### handleTaskClick', idx);
  };

  // const handleTaskPutClick = () => {
  //   console.log('##### handleTaskPutClick', idx);
  // };

  const handleTaskDeleteClick = () => {
    console.log('##### handleTaskDeleteClick', idx);
  };

  return (
    <TaskCardWrapper>
      <SwipeContainer
        ref={animateRef}
        drag="x"
        dragElastic={{ left: 0.1, right: 0 }}
        dragConstraints={{ left: -80, right: 0 }}
        onDragEnd={() => {
          const isOverThreshold = motionX.get() < -80 / 2;
          animate(animateRef.current, { x: isOverThreshold ? -80 : 0 });
        }}
        style={{ x: motionX }}
        onClick={handleTaskClick}
      >
        <SwipeContent value={idx} dragControls={reorderDragControls} dragListener={false}>
          <Meta>
            {name && <div className="card-meta-title">{name}</div>}
            {desc && <div className="card-meta-desc">{desc}</div>}
            {startDate && endDate && (
              <div className="card-meta-date">
                {startDate && endDate && `${dayjs(startDate)?.format('MM DD')} ~ ${dayjs(endDate)?.format('MM DD')}`}
              </div>
            )}
          </Meta>
        </SwipeContent>
      </SwipeContainer>
      <DelBox>
        {/* <DelButton onClick={handleTaskPutClick}> */}
        {/*  <DriveFileRenameOutlineIcon /> */}
        {/* </DelButton> */}
        {/* <Divider /> */}
        <DelButton onClick={handleTaskDeleteClick}>
          <DeleteIcon />
        </DelButton>
      </DelBox>
    </TaskCardWrapper>
  );
};

export default React.memo(TaskCard);
