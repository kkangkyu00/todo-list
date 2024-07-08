import React, { useEffect, useState } from 'react';
import { motion, Reorder, useAnimate, useDragControls, useMotionValue } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';

const TaskCardWrapper = styled.div`
  position: relative;
`;

const SwipeContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SwipeContent = styled(Reorder.Item)`
  position: relative;
  overflow: hidden;
  padding: 8px 8px 8px 12px;
  border-top: 1px solid #ededed;
  border-radius: 4px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.12);

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

const DelButton = styled(motion.button)`
  position: absolute;
  top: 0;
  right: 0;
`;

interface TaskCardProps {
  idx: number;
  name?: string;
  desc?: string;
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
}

const TaskCard = ({ idx, name, desc, startDate, endDate }: TaskCardProps): React.JSX.Element => {
  const [animateRef, animate] = useAnimate();
  const reorderDragControls = useDragControls();
  const motionX = useMotionValue(0);

  const [isDeleteShow, setIsDeleteShow] = useState(false);

  const deleteAnimateState = isDeleteShow ? 'appear' : 'disappear';

  useEffect(() => {
    motionX.on('change', (v) => {
      const isOverThreshold = v < -80 / 2;
      setIsDeleteShow(isOverThreshold);
    });
  }, [motionX]);

  const handleItemDeleteClick = () => {
    console.log('##### item delete idx', idx);
  };

  return (
    <TaskCardWrapper>
      <SwipeContainer
        ref={animateRef}
        drag="x"
        dragElastic={0.1}
        dragConstraints={{ left: -54, right: 0 }}
        onDragEnd={() => {
          const isOverThreshold = motionX.get() < -80 / 2;
          animate(animateRef.current, { x: isOverThreshold ? -80 : 0 });
        }}
        style={{ x: motionX }}
      >
        <SwipeContent value={idx} dragControls={reorderDragControls} dragListener={false}>
          <Meta>
            {name && <div className="card-meta-title">{name}</div>}
            {desc && <div className="card-meta-desc">{desc}</div>}
            <div className="card-meta-date">
              {endDate
                ? `${dayjs(startDate)?.format('MM DD')} ~ ${dayjs(endDate)?.format('MM DD')}`
                : `${dayjs(startDate)?.format('MM DD ⋅ a hh:mm')}`}
            </div>
          </Meta>
        </SwipeContent>
      </SwipeContainer>
      <DelButton
        initial="disappear"
        animate={deleteAnimateState}
        variants={{
          appear: { opacity: 1 },
          disappear: { opacity: 0 }
        }}
        onClick={handleItemDeleteClick}
      >
        삭제
      </DelButton>
    </TaskCardWrapper>
  );
};

export default React.memo(TaskCard);
